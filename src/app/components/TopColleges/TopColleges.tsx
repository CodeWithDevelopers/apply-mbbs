"use client";

import React, { useState } from 'react';
import './TopColleges.css';
import Image from 'next/image';

const TopColleges = () => {
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || '';
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const colleges = [
    {
      id: 1,
      name: "People's College of Medical Sciences & Research Centre",
      image: `${asset_url}/assets/img/img-1.jpg`,
      rating: 5,
      reviews: 208,
      location: "Bhopal"
    },
    {
      id: 2,
      name: "Index Medical College, Indore",
      image: `${asset_url}/assets/img/img-1.jpg`,
      rating: 5,
      reviews: 206,
      location: "Indore"
    },
    {
      id: 3,
      name: "LN Medical College, Bhopal",
      image: `${asset_url}/assets/img/img-1.jpg`,
      rating: 5,
      reviews: 204,
      location: "Bhopal"
    },
    {
      id: 4,
      name: "Amaltas Medical College, Dewas",
      image: `${asset_url}/assets/img/img-1.jpg`,
      rating: 5,
      reviews: 201,
      location: "Dewas"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star">★</span>
    ));
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="top-colleges-section">
      <div className="top-colleges-container">
        <div className="top-colleges-header">
          <h2 className="top-colleges-title">
            <span className="title-black">Top</span>{" "}
            <span className="title-gradient">Medical Colleges</span>{" "}
            <span className="title-black">in India by Rank</span>
          </h2>
          <div className="scroll-indicator">
            {colleges.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="colleges-grid">
          {colleges.map((college) => (
            <div key={college.id} className="college-card">
              <div className="college-image-container">
                <Image 
                  src={college.image} 
                  alt={college.name}
                  className="college-image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="college-info">
                <h3 className="college-name">{college.name}</h3>
                <div className="college-rating">
                  <div className="stars">
                    {renderStars(college.rating)}
                  </div>
                  <span className="review-count">({college.reviews} Reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopColleges; 