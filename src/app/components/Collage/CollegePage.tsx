"use client";

import React from "react";
import "../../../style/collages/collage-page.css";
import Image from "next/image";

interface CollegePageProps {
  name: string;
  address: string;
  rating: string;
  description: string;
}

const CollegePage: React.FC<CollegePageProps> = ({
  name,
  address,
  rating,
  description,
}) => {
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "https://applymbbs.in";

  return (
    <div className="cp-page">
      {/* Banner */}
      <div className="cp-banner">
        <Image
          src={`${asset_url}/assets/img/jipmer-entrance.jpg`}
          alt="College Banner"
          className="cp-banner-image"
        />
        <div className="cp-banner-overlay"></div>
        <div className="cp-logo-container">
          <Image
            src={`${asset_url}/assets/images/logo/AIIMS_logo.png`}
            alt="College Logo"
            className="cp-college-logo"
          />
        </div>
      </div>

      {/* Content */}
      <div className="cp-container">
        <div className="cp-card">
          <h1 className="cp-name">{name}</h1>

          <div className="cp-info">
            <span className="cp-rating">⭐ {rating}/10</span>
            <span className="cp-address">📍 {address}</span>
          </div>

          <div className="cp-divider"></div>

          <div className="cp-description">
            {description.split("\n").map((line, idx) => (
              <p key={idx} className="cp-description-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegePage;
