"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./SimilarColleges.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CollegeApiResponse {
  id: number;
  name: string;
  slug: string;
  clgLogo?: {
    url: string;
  };
  special_categories: {
    idd: string;
  }[];
  location?: string;
  rating?: {
    overallRating: number;
    reviewName: string;
  };
}

interface College {
  id: number;
  name: string;
  slug: string;
  logo: string;
  ranking: string;
  fees: string;
  duration: string;
  location: string;
  rating: number;
  reviews: string;
}

const SimilarColleges: React.FC = () => {
  const router = useRouter();
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "";
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch colleges from API
  const fetchColleges = useCallback(async () => {
    try {
      const res = await fetch(
        `${api_url}/api/colleges-and-univercities?populate=*`
      );
      const json = await res.json();

      const apiColleges: CollegeApiResponse[] = json?.data || [];

      const topUniversities: College[] = apiColleges
        .filter((college) =>
          college.special_categories?.some(
            (cat) => cat.idd === "top-medical-collage"
          )
        )
        .map((college, index) => ({
          id: college.id,
          name: college.name || "Unknown College",
          slug: college.slug,
          logo: college.clgLogo?.url
            ? college.clgLogo.url.startsWith("http")
              ? college.clgLogo.url
              : `${api_url}${college.clgLogo.url}`
            : `${asset_url}assets/img/colleges/aiims_bhopal.jpg`,
          ranking: `#${index + 1} in Medical`,
          fees: "₹7,000 per year",
          duration: "5.5 Years MBBS",
          location: college.location || "Not Available",
          rating: college.rating?.overallRating || 4.5, // FIXED: pick numeric field
          reviews: college.rating?.reviewName || "No reviews", // FIXED: pick text field
        }));

      setColleges(topUniversities);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setIsLoading(false);
    }
  }, [api_url, asset_url]);

  useEffect(() => {
    fetchColleges();
  }, []);

  // Render stars for ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="star full">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ☆
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <section id="top-medical-collage" className="similar-colleges-section">
      <div className="similar-colleges-container">
        <div className="similar-colleges-header">
          <h2 className="similar-colleges-title-1">
            Explore{" "}
            <span className="similar-colleges-title-2">Medical Colleges</span>{" "}
            Similar
            <br /> to Your Last Search
          </h2>
          <p className="similar-colleges-subtitle">
            Based on your recent activity, you might be interested in these
            institutions
          </p>
        </div>

        {isLoading ? (
          <p className="loading-text">Loading colleges...</p>
        ) : colleges.length === 0 ? (
          <p className="no-data-text">No colleges found</p>
        ) : (
          <div className="college-cards-grid">
            {colleges.map((college) => (
              <div key={college.id} className="college-card">
                <div className="college-image-wrapper">
                  <Image
                    src={college.logo}
                    alt={college.name}
                    className="college-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="college-content">
                  <h3 className="college-name">{college.name}</h3>
                  <p className="college-location">{college.location}</p>
                  <div className="college-rating">
                    <div className="stars">{renderStars(college.rating)}</div>
                    <span className="rating-number">{college.rating}</span>
                    <span className="review-count">({college.reviews})</span>
                  </div>
                  <button
                    className="view-details-btn"
                    onClick={() => router.push(`/colleges/${college.slug}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SimilarColleges;
