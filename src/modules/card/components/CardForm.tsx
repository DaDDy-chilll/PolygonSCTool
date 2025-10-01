import React from "react";
import {
  Upload,
  Hash,
  Building,
  Package,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import type { CardFormData } from "../types";
import { currencies } from "../data";

interface Props {
  formData: CardFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const CardForm: React.FC<Props> = ({
  formData,
  onInputChange,
  onFileChange,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 flex items-center text-2xl font-semibold text-gray-800">
        <FileText className="mr-2 text-blue-600" />
        Card Details
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Collection Name
            </label>
            <input
              type="text"
              name="collectionName"
              value={formData.collectionName}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Enter collection name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Batch Number
            </label>
            <div className="relative">
              <Hash className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., BATCH001"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Issuer Business Name
          </label>
          <div className="relative">
            <Building className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="issuerBusinessName"
              value={formData.issuerBusinessName}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Your business name"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Batch Description
          </label>
          <textarea
            name="batchDescription"
            value={formData.batchDescription}
            onChange={onInputChange}
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Describe this loyalty card collection..."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Number of Cards
            </label>
            <div className="relative">
              <Package className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="noOfCards"
                value={formData.noOfCards}
                onChange={onInputChange}
                min="1"
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Card Name
            </label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., VIP Member Card"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Prefix ID
          </label>
          <input
            type="text"
            name="prefixId"
            value={formData.prefixId}
            onChange={onInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., VIP, GOLD, SILVER"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Issue Date
            </label>
            <div className="relative">
              <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <div className="relative">
              <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="expireDate"
                value={formData.expireDate}
                onChange={onInputChange}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Currency
            </label>
            <select
              name="currencyType"
              value={formData.currencyType}
              onChange={onInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Card Graphic
          </label>
          <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 transition-colors hover:border-gray-400">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="cardGraphic"
                    onChange={onFileChange}
                    accept="image/*"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
        >
           {isSubmitting ? 'Deploying…' : 'Deploy Collection'}
        </button>
      </form>
    </div>
  );
};

export default CardForm;
