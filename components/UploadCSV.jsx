"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';

export default function UploadCSV() {
  const [csvData, setCsvData] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState('/placeholder-image.svg'); // Placeholder for now

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setCsvData(results.data);
        // TODO: Optionally update preview image here based on CSV data
      },
    });
  };

  return (
    <div className="w-full max-w-[1280px] h-[800px] flex flex-col bg-white">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
          <span className="font-bold text-lg">Image-Template-Filler</span>
        </div>
        <nav className="flex gap-4 text-sm">
          <a href="#">Home</a>
          <a href="#">Github</a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CSV Editor */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Edit CSV Content</h2>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="border px-4 py-2 rounded"
          />

          <table className="w-full text-left border-collapse border mt-4">
            <thead className="bg-gray-100">
              <tr>
                {csvData[0] &&
                  Object.keys(csvData[0]).map((key, index) => (
                    <th key={index} className="border px-4 py-2">
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="border px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Image Preview */}
        <section>
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="w-[369px] h-[242px] bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url(${previewImageUrl})` }}></div>
          <h3 className="font-semibold">Image Preview</h3>
          <p className="text-gray-600 text-sm">
            This is a preview of the image that will be generated based on the CSV content.
          </p>
        </section>
      </main>
    </div>
  );
}
