"use client";

import React from 'react';
import './RecommendedSearches.css';

const RecommendedSearches = () => {
  const searches = [
    {
      id: 1,
      title: "MBBS Admission Process Updated Guidelines",
      link: "/guidelines"
    },
    {
      id: 2,
      title: "Top Government Colleges Across India",
      link: "/top-colleges"
    },
    {
      id: 3,
      title: "AIQ vs State Quota Seat Comparison",
      link: "/quota-comparison"
    },
    {
      id: 4,
      title: "Private Medical Colleges With Fee Structure",
      link: "/fee-structure"
    },
    {
      id: 5,
      title: "NEET Cut-off Trends Year-wise Data",
      link: "/cutoff-trends"
    },
    {
      id: 6,
      title: "State-wise Counseling Important Dates",
      link: "/counseling-dates"
    },
    {
      id: 7,
      title: "Hostel & Campus Life For MBBS Students",
      link: "/campus-life"
    },
    {
      id: 8,
      title: "MBBS Abroad vs India Pros & Cons",
      link: "/abroad-comparison"
    }
  ];

  return (
    <section className="recommended-searches-section">
      <div className="recommended-searches-container">
        <div className="recommended-header">
          <h2 className="recommended-title">
            <span className="title-black">Recommended</span>{" "}
            <span className="title-gradient">Medical Searches</span>
          </h2>
          <button className="explore-more-btn">
            Explore More
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

        <div className="search-cards-grid">
          {searches.map((search) => (
            <a 
              key={search.id} 
              href={search.link}
              className="search-card"
            >
              <span className="search-text">{search.title}</span>
              <span className="arrow-icon">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M9 18L15 12L9 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedSearches; 