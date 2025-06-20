'use client';
import React, { useState } from 'react';

export default function UploadPage() {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    console.log('CSV uploaded:', file);
    // add logic if needed
  };

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 sm:px-10 py-10">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Upload CSV & Template</h1>
      </header>

      {/* Upload Sections */}
      <section className="space-y-6 max-w-xl mx-auto">
        {/* CSV Upload */}
        <div>
          <label htmlFor="csv" className="block font-medium mb-1">
            CSV File
          </label>
          <input
            type="file"
            id="csv"
            accept=".csv"
            onChange={handleCSVUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Template Upload */}
        <div>
          <label htmlFor="template" className="block font-medium mb-1">
            Template Image
          </label>
          <input
            type="file"
            id="template"
            accept="image/*"
            onChange={handleTemplateUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </section>

      {/* Preview */}
      <section className="mt-10 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Template Preview</h2>
        <div className="border border-gray-300 rounded-md p-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Template Preview"
              className="w-full max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-gray-500 text-sm">No template uploaded</p>
          )}
        </div>
      </section>

      {/* Button */}
      <div className="flex justify-end mt-10">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 text-sm font-medium">
          Next
        </button>
      </div>
    </div>
  );
}
