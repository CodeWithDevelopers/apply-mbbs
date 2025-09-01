"use client";

import { useState, useEffect } from "react";
import "./LogoSlider.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CollegeApiResponse {
  id: number;
  name: string;
  slug: string;
  clgLogo?: {
    url?: string;
  } | null;
  rating: string;
  special_categories: { idd: string }[];
}

interface University {
  slug: string;
  id: number;
  name: string;
  logo: string;
  ranking: string;
  fees: string;
  duration: string;
}

const UniversityCardSkeleton = () => (
  <div className="university-card skeleton-card">
    <div className="university-logo skeleton-logo">
      <div className="skeleton-pulse" />
    </div>
    <div className="skeleton-text-short skeleton-pulse" />
    <div className="university-details">
      <div className="skeleton-text-full skeleton-pulse" />
      <div className="skeleton-text-full skeleton-pulse" />
    </div>
  </div>
);

const LogoSlider = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [universities, setUniversities] = useState<University[]>([]);

  const itemsPerView = 6;
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "https://applymbbs.in";
  const api_url = process.env.NEXT_PUBLIC_API_URL || "";

  // Fetch colleges from API
  const fetchColleges = async () => {
    try {
      const res = await fetch(`${api_url}/api/colleges-and-univercities`);
      const json = await res.json();

      const colleges: CollegeApiResponse[] = json?.data || [];

      const topUniversities = colleges
        .filter((college) =>
          college.special_categories.some(
            (cat) => cat.idd === "top-program-universities"
          )
        )
        .map((college, index) => ({
          id: college.id,
          name: college.name,
          slug: college.slug,
          logo: college.clgLogo?.url
            ? college.clgLogo.url.startsWith("http")
              ? college.clgLogo.url
              : `${api_url}${college.clgLogo.url}`
            : `${asset_url}assets/img/colleges/aiims_bhopal.jpg`,
          ranking: `#${index + 1} in Medical`,
          fees: "₹7,000 per year",
          duration: "5.5 Years MBBS",
        }));

      setUniversities(topUniversities);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const totalSlides = universities.length;
  const shouldScroll = totalSlides > itemsPerView; // ✅ Only scroll if we have more than itemsPerView

  // Prev & Next buttons
  const handlePrevClick = () => {
    if (!shouldScroll || isAnimating || isLoading) return;
    setIsPaused(true);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNextClick = () => {
    if (!shouldScroll || isAnimating || isLoading) return;
    setIsPaused(true);
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Auto-slide
  useEffect(() => {
    if (!shouldScroll || isPaused || isLoading) return;
    const slideInterval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [shouldScroll, isPaused, isAnimating, isLoading, totalSlides]);

  return (
    <section className="logo-slider-section">
      <div className="logo-slider-container">
        <h2 className="logo-slider-title">Top Program Universities</h2>
        <div
          className="logo-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="slider-nav prev"
            onClick={handlePrevClick}
            disabled={!shouldScroll || isAnimating || isLoading}
          >
            &#8249;
          </button>

          <div className="logo-slider-viewport">
            <div
              className="logo-slider"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
                transition: isAnimating ? "transform 0.5s ease-in-out" : "none",
              }}
            >
              {isLoading
                ? Array(itemsPerView)
                    .fill(null)
                    .map((_, i) => <UniversityCardSkeleton key={i} />)
                : universities.map((u, i) => (
                    <div
                      style={{ cursor: "pointer" }}
                      key={`${u.id}-${i}`}
                      onClick={() => router.push(`/colleges/${u.slug}`)}
                      className="university-card"
                    >
                      <div className="university-logo">
                        <Image
                          src={u.logo}
                          alt={u.name}
                          className="w-24 h-24 object-contain mb-2"
                        />
                      </div>
                      <h3 className="university-name">{u.name}</h3>
                      <div className="university-details">
                        <p className="university-ranking">{u.ranking}</p>
                        <p className="university-fees">{u.fees}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <button
            className="slider-nav next"
            onClick={handleNextClick}
            disabled={!shouldScroll || isAnimating || isLoading}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogoSlider;
