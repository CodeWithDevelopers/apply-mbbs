"use client";

import React from 'react';
import './DiscoverColleges.css';
import Image from 'next/image';

declare const process: {
    env: {
        NEXT_PUBLIC_ASSET_URL?: string;
    };
};

const DiscoverColleges = () => {
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || 'https://applymbbs.in';

  // Helper function to get full image URL
  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Ensure asset_url ends with a slash if it doesn't already
    const baseUrl = asset_url.endsWith('/') ? asset_url : `${asset_url}/`;
    // Remove leading slash from imagePath if it exists
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${baseUrl}${cleanImagePath}`;
  };

  const colleges = [
    {
      id: 1,
      name: "National Institute Of Mental Health & Neuro Sciences (NIMHANS)",
      image: getFullImageUrl("assets/img/img-1.jpg"),
      rating: 5,
      reviews: 78,
      specialties: ["Health", "Neuroscience"],
      enrolled: "1,200+ Enrolled"
    },
    {
      id: 2,
      name: "Jawaharlal Institute of Postgraduate Medical Education and Research",
      image: getFullImageUrl("assets/img/img-2.jpg"),
      rating: 5,
      reviews: 65,
      specialties: ["Education", "Research"],
      enrolled: "950+ Enrolled"
    },
    {
      id: 3,
      name: "Sanjay Gandhi Postgraduate Institute of Medical Sciences",
      image: getFullImageUrl("assets/img/img-3.jpg"),
      rating: 5,
      reviews: 48,
      specialties: ["Medical", "Research"],
      enrolled: "1,800+ Enrolled"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star">★</span>
    ));
  };

  return (
    <section className="discover-colleges-section">
      <div className="discover-colleges-container">
        <div className="discover-header">
          <h2 className="discover-title">
            <span className="title-black">Discover</span>{" "}
            <span className="title-gradient">Top-Rated</span>{" "}
            <span className="title-black">Colleges</span>
          </h2>
          <button className="view-all-btn">
            View All Colleges
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13.5 19L20.5 12L13.5 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="discover-grid">
          {colleges.map((college) => (
            <div key={college.id} className="discover-card">
              <div className="college-image-wrapper">
                <Image 
                  src={college.image} 
                  alt={college.name}
                  className="college-image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="college-content">
                <div className="rating-row">
                  <div className="stars">
                    {renderStars(college.rating)}
                  </div>
                  <span className="reviews">({college.reviews} Reviews)</span>
                </div>
                <h3 className="college-title">{college.name}</h3>
                <div className="college-details">
                  <div className="specialties">
                    <span className="icon">📚</span>
                    {college.specialties.join(", ")}
                  </div>
                  <div className="enrolled">
                    <span className="icon">👥</span>
                    {college.enrolled}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverColleges; 