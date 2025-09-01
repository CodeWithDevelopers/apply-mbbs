"use client";

import React from "react";
import { FaFilePdf } from "react-icons/fa";
// import { Button } from "@/components/ui/button"; // shadcn button (optional)

type BrochureProps = {
  brouture: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    size: number;
    mime: string;
  };
};

const BrochureSection: React.FC<BrochureProps> = ({ brouture }) => {
  if (!brouture) return null;

  return (
    <section className="w-full py-12" style={{marginTop:"40px"}}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          Download Brochure
        </h2>

        {/* Card */}
        <div className="max-w-lg mx-auto bg-gray-50 p-6 rounded-2xl shadow-md text-center">
          <div className="flex flex-col items-center gap-4">
            {/* PDF Icon */}
            <FaFilePdf className="text-red-600 text-6xl" />

            {/* File Info */}
            <h3 className="text-xl font-semibold text-gray-800">
              {brouture.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {(brouture.size / 1024).toFixed(2)} MB · {brouture.mime}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}${brouture.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition"
              >
                View
              </a>
              {/* <a
                href={brouture.url}
                download={brouture.name}
                className="px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
              >
                Download
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureSection;
