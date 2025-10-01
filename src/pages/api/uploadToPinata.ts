// pages/api/uploadToPinata.ts
import type { NextApiRequest, NextApiResponse } from "next";
import FormData from "form-data";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { file, metadata } = req.body; // file = base64, metadata = { name, description }

    const base64Data = file.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const formData = new FormData();
    formData.append("file", buffer, "image.png");

    const fileRes = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY!,
        pinata_secret_api_key: process.env.PINATA_API_SECRET!,
      },
    });

    const imageHash = fileRes.data.IpfsHash;
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageHash}`;

    const metadataJson = {
      name: metadata.name,
      description: metadata.description,
      image: imageUrl,
    };

    const metadataRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      metadataJson,
      {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY!,
          pinata_secret_api_key: process.env.PINATA_API_SECRET!,
        },
      }
    );

    const tokenURI = `https://gateway.pinata.cloud/ipfs/${metadataRes.data.IpfsHash}`;

    res.status(200).json({ tokenURI });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
