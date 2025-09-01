"use client";

import React from 'react';
import Image from 'next/image';
import './Features.css';

const features = [
  {
    id: 1,
    tag: "APPLY",
    heading: "Apply With One Form",
    text: "One platform to apply to 2000+ esteemed colleges",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2196F3" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#2196F3" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#gradient1)"/>
        <path d="M32 24H16M24 16V32" stroke="#2196F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "var(--feature-blue)"
  },
  {
    id: 2,
    tag: "TRACK",
    heading: "Track applications in one place",
    text: "Take our free career compass personality quiz and get top career options for you",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#673AB7" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#673AB7" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#gradient2)"/>
        <path d="M32 20L24 28L16 20" stroke="#673AB7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "var(--feature-purple)"
  },
  {
    id: 3,
    tag: "GET",
    heading: "Get Your Career Match",
    text: "Apply to and manage all college applications through My Profile",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#gradient3)"/>
        <path d="M24 16L32 28H16L24 16Z" stroke="#4CAF50" strokeWidth="2.5" strokeLinejoin="round"/>
      </svg>
    ),
    color: "var(--feature-green)"
  }
];

const Features = () => {
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || 'https://applymbbs.in';

  return (
    <section className="features-section" aria-labelledby="features-title">
      {/* Background Design Elements */}
      <div className="features-bg-elements" aria-hidden="true">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-dots bg-dots-1"></div>
        <div className="bg-dots bg-dots-2"></div>
        <div className="bg-line bg-line-1"></div>
        <div className="bg-line bg-line-2"></div>
        <div className="bg-blur bg-blur-1"></div>
        <div className="bg-blur bg-blur-2"></div>
      </div>

      <div className="features-container">
        <div className="features-header">
          <h2 id="features-title" className="features-title">
            Choosing the <span className="highlight">right college</span> can be confusing
          </h2>
          <p className="features-subtitle">
          We help you find and apply to your ideal medical college.
          </p>
          <div className="header-accent">
            <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
              <path d="M1 5.2C20.5 2.6 63.5 -0.166667 118.5 4.5" stroke="url(#accentGradient)" strokeWidth="2">
                <defs>
                  <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2196F3"/>
                    <stop offset="50%" stopColor="#673AB7"/>
                    <stop offset="100%" stopColor="#4CAF50"/>
                  </linearGradient>
                </defs>
              </path>
            </svg>
          </div>
        </div>

        <div className="process-content">
            <Image 
              src={`${asset_url}/assets/images/process.gif`} 
              alt=""
              className="process-gif"
              width={800}
              height={400}
              priority
            />
            <div className="process-overlay"></div>
          </div>

        <div className="features-grid mt-5">
          {features.map((feature, index) => (
            <article 
              key={feature.id} 
              className="feature-card"
              style={{ '--card-color': feature.color, '--card-delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper" aria-hidden="true">
                  {feature.icon}
                  <div className="icon-blur"></div>
                </div>
                <div className="feature-text">
                  <span className="feature-tag" aria-hidden="true">
                    <span className="tag-dot"></span>
                    {feature.tag}
                  </span>
                  <h3 className="feature-heading">{feature.heading}</h3>
                  <p className="feature-description">{feature.text}</p>
                </div>
              </div>
              <div className="feature-card-bg" aria-hidden="true">
                <div className="card-shape card-shape-1"></div>
                <div className="card-shape card-shape-2"></div>
                <div className="card-shape card-shape-3"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 