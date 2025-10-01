import React, { useState } from "react";
import CardForm from "./components/CardForm";
import CardPreview from "./components/CardPreview";
import type { CardFormData } from "./types";
import { readFileAsDataUrl } from "./utils";
import axios from "axios";
import { ethers } from "ethers";
import LoyaltyNFTAbi from "../../nft_abi.json";

const CardModule: React.FC = () => {
  const [formData, setFormData] = useState<CardFormData>({
    collectionName: "",
    batchNumber: "",
    issuerBusinessName: "",
    batchDescription: "",
    noOfCards: 1,
    cardName: "",
    prefixId: "",
    issueDate: "",
    expireDate: "",
    price: 0,
    currencyType: "USD",
    cardGraphic: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, cardGraphic: file }));
      try {
        const dataUrl = await readFileAsDataUrl(file);
        setImagePreview(dataUrl);
      } catch (err) {
        console.error("Failed to read file", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cardGraphic) return;

    try {
      setIsSubmitting(true);
      // 1. Convert image to base64
      const tokenBase64 = await readFileAsDataUrl(formData.cardGraphic);

      // 2. Upload to Pinata
      const pinataRes = await axios.post("/api/uploadToPinata", {
        file: tokenBase64,
        metadata: {
          name: formData.cardName,
          description: formData.batchDescription,
        },
      });

      const tokenURI = pinataRes.data.tokenURI;
      console.log('tokenURI', tokenURI);

      // 3. Connect wallet
      const { ethereum } = window as any;
      if (!ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      // 4. Contract instance
      const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
      const contract = new ethers.Contract(
        contractAddress,
        LoyaltyNFTAbi,
        signer,
      );

      // const collectionIdStr = String(formData.batchNumber || "1").trim();
      // if (!/^\d+$/.test(collectionIdStr)) {
      //   throw new Error("Batch number must be numeric (e.g., 1, 2, 3).");
      // }
      // const collectionId = BigInt(collectionIdStr);
      // console.log('collectionId', collectionId);

      // 5. Mint NFT
      const tx = await contract.mint(
        await signer.getAddress(), // recipient
        formData.batchNumber || "1", // collectionId
        tokenURI, // IPFS metadata
      );

      await tx.wait();
      alert("✅ NFT minted successfully!");

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">
            Loyalty Card Creator
          </h1>
          <p className="text-gray-600">
            Design and deploy your loyalty card collection
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <CardForm
            formData={formData}
            onInputChange={handleInputChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          <CardPreview formData={formData} imagePreview={imagePreview} />
        </div>
      </div>
    </div>
  );
};

export default CardModule;
