"use client";

import React from "react";
import Link from "next/link";
import "../../../style/collages/similar-collage.css";

type College = {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  address: string;
  rating: string;
  description: string;
};

interface SimilarCollegesProps {
  colleges: College[];
}

const SimilarColleges: React.FC<SimilarCollegesProps> = ({ colleges }) => {
  if (!colleges || colleges.length === 0) {
    return (
      <div className="sc-container sc-no-colleges">
        <p>No similar colleges available.</p>
      </div>
    );
  }

  return (
    <section className="sc-section">
      <div className="sc-container">
        <h2 className="sc-heading">Similar Colleges</h2>
        <div className="sc-grid">
          {colleges.map((college) => (
            <div key={college.id} className="sc-card">
              <h3 className="sc-name">
                <Link href={`/colleges/${college.slug}`}>{college.name}</Link>
              </h3>
              <p className="sc-rating">⭐ Rating: {college.rating}/5</p>
              <p className="sc-address">{college.address}</p>
              <p className="sc-description">{college.description}</p>
              <div className="sc-details">
                <Link href={`/colleges/${college.slug}`}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarColleges;
