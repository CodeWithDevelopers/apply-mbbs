"use client";

import React from "react";

interface InfraStructureProps {
  description: string;
}

const InfraStructure: React.FC<InfraStructureProps> = ({ description }) => {
  return (
    <div
      className="container mx-auto px-4 py-10"
      style={{ marginTop: "80px", marginBottom: "120px" }}
    >
      <div className=" rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 heading-h2">
          🏥 Infrastructure Overview
        </h2>

        {/* Split description into paragraphs */}
        <div className="space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
          {description.split("\n").map((line, idx) => {
            // If it's a heading (with emoji or numbered list), style differently
            if (/^[0-9]+\./.test(line.trim())) {
              return (
                <p key={idx} className="font-medium text-gray-900 ml-4">
                  {line}
                </p>
              );
            }
            if (
              line.startsWith("🏥") ||
              line.startsWith("🏨") ||
              line.startsWith("🌿") ||
              line.startsWith("🔬") ||
              line.startsWith("🏆")
            ) {
              return (
                <h3
                  key={idx}
                  className="text-2xl font-semibold text-[#5c3a00] mt-6 mb-2 heading-h3"
                >
                  {line}
                </h3>
              );
            }
            if (line.trim() === "") {
              return <br key={idx} />;
            }
            return <p key={idx}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default InfraStructure;
