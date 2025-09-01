"use client";

import { useEffect, useRef, useState } from "react";
import "./discovery-collage.css";
import filtersData from "@/utils/filters.js";
import CollegeDataSection from "@/components/DiscoverCollages/CollegeDataSection";

type FiltersData = {
  [key: string]: {
    label: string;
    options: Array<{ value: string; count: number }>;
  };
};

interface College {
  rank: number;
  name: string;
  nirdRank?: number;
  rating: string;
  fees: string;
  salary?: string;
  indiaToday?: number;
  theWeek?: number;
  location?: string;
  ownership?: string;
  exams: string[];
  logo?: string;
}

const CollegeList = () => {
  const asset_url = process.env.NEXT_PUBLIC_ASSET_URL || "https://applymbbs.in";
  const [filters, setFilters] = useState({
    location: "",
    totalFees: "",
    rating: "",
    ownership: "",
    specialization: "",
    exams: "",
    name: "",
  });

  const colleges: College[] = [
    {
      rank: 22,
      name: "Dr. Ram Manohar Lohia Institute of Medical Sciences",
      nirdRank: 24,
      rating: "4.7 ★★★★☆ (23)",
      fees: "₹ 40,500",
      salary: "₹ 5.41 Lakh",
      indiaToday: 16,
      theWeek: 25,
      location: "Kolkata",
      ownership: "Public / Government",
      exams: ["NEET"],
      logo: "assets/images/logo/AIIMS_logo.png",
    },
    {
      rank: 44,
      name: "Medical College Kolkata",
      nirdRank: 24,
      rating: "4.4 ★★★★☆ (28)",
      fees: "₹ 40,500",
      salary: "₹ 7.10 Lakh",
      indiaToday: 25,
      theWeek: 23,
      location: "Kolkata",
      ownership: "Public / Government",
      exams: ["NEET", "West Bengal NEET"],
      logo: "assets/images/logo/ASMC_logo-1.png",
    },
  ];

  const [visibleColleges, setVisibleColleges] = useState<College[]>(
    colleges.slice(0, 10)
  );
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCollegeRef = useRef<HTMLDivElement>(null);

  // Move getRatingValue function before its usage
  const getRatingValue = (rating: string): number => {
    const match = rating.match(/\d+\.\d+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setVisibleColleges(colleges.slice(0, 10)); // Reset visible colleges when filters change
    setHasMore(true);
  };

  const filteredColleges = colleges.filter((college) => {
    const locationMatch =
      !filters.location ||
      college.location?.includes(filters.location.split(" (")[0]);
    const feesMatch =
      !filters.totalFees ||
      (filters.totalFees === "< 1 Lakh (17)" &&
        college.fees &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) < 100000) ||
      (filters.totalFees === "1 - 2 Lakh (8)" &&
        college.fees &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) >= 100000 &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) < 200000) ||
      (filters.totalFees === "2 - 3 Lakh (3)" &&
        college.fees &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) >= 200000 &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) < 300000) ||
      (filters.totalFees === "3 - 5 Lakh (2)" &&
        college.fees &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) >= 300000 &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) < 500000) ||
      (filters.totalFees === "> 5 Lakh (16)" &&
        college.fees &&
        parseInt(college.fees.replace(/[^0-9]/g, "")) >= 500000);
    const ratingMatch =
      !filters.rating ||
      (filters.rating === "> 4 - 5 Star (32)" &&
        getRatingValue(college.rating) >= 4) ||
      (filters.rating === "> 3 - 4 Star (3)" &&
        getRatingValue(college.rating) >= 3 &&
        getRatingValue(college.rating) < 4) ||
      (filters.rating === "> 2 - 3 Star (1)" &&
        getRatingValue(college.rating) >= 2 &&
        getRatingValue(college.rating) < 3);
    const ownershipMatch =
      !filters.ownership ||
      college.ownership === filters.ownership.split(" (")[0];
    const specializationMatch = !filters.specialization; // Placeholder, expand as needed
    const examsMatch =
      !filters.exams ||
      (college.exams && college.exams.includes(filters.exams.split(" (")[0]));
    const nameMatch =
      !filters.name ||
      college.name.toLowerCase().includes(filters.name.toLowerCase().trim());

    return (
      locationMatch &&
      feesMatch &&
      ratingMatch &&
      ownershipMatch &&
      specializationMatch &&
      examsMatch &&
      nameMatch
    );
  });

  const handleClearAll = () => {
    setFilters({
      location: "",
      totalFees: "",
      rating: "",
      ownership: "",
      specialization: "",
      exams: "",
      name: "",
    });
    setVisibleColleges(filteredColleges.slice(0, 10));
    setHasMore(true);
  };

  useEffect(() => {
    setVisibleColleges(filteredColleges.slice(0, 10));
    setHasMore(filteredColleges.length > 10);
  }, [filters, filteredColleges]);

  useEffect(() => {
    if (loading || !hasMore) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        setTimeout(() => {
          const nextColleges = filteredColleges.slice(
            visibleColleges.length,
            visibleColleges.length + 10
          );
          setVisibleColleges((prev) => [...prev, ...nextColleges]);
          setHasMore(nextColleges.length > 0);
          setLoading(false);
        }, 1000); // Simulate loading delay
      }
    });

    if (lastCollegeRef.current) {
      observerRef.current.observe(lastCollegeRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visibleColleges, hasMore, loading, filteredColleges]);

  return (
    <div style={{ background: "#e2e8f0", padding: "20px" }}>
      <div className="container">
        <div className="cl-college-list-description">
          <h1>
            Top Medical Colleges in India 2025: Rankings, Admissions, Fees, NEET
            Cutoff, Placements
          </h1>
          <p>
            There are almost 40+ top Medical colleges in India. Of these, 30
            colleges are owned by government organizations, and 16 colleges are
            privately owned. NEET is the top entrance exam for admission to top
            10 Medical colleges in India. CMC, MS Ramaiah Medical College,
            Government Medical College, Medical College and S.M.S Medical
            College are the top 5 Medical colleges in India. NEET, Haryana NEET,
            INI CET, KEAM, and Kerala NEET are the popular entrance exams for
            admission to best medical colleges in India.
          </p>
          <div className="cl-latest-update">
            <strong>LATEST UPDATE:</strong>
            <p>
              The NEET SS 2025 exam dates have been announced for admission to
              DM and MCh courses. As per the notification, the exam will be
              conducted on November 7 and 8, 2025.
            </p>
          </div>
        </div>
        <div className="cl-college-list-container">
          {/* Left Filters Section */}
          <div className="cl-filters-section">
            <div className="cl-filters-header">
              <h2>FILTERS</h2>
              <span className="cl-clear-all" onClick={handleClearAll}>
                Clear All
              </span>
            </div>
            {Object.entries(filtersData as FiltersData).map(
              ([filterType, { label, options }]) => (
                <div key={filterType} className="cl-filter-group">
                  <label>{label}</label>
                  {filterType === "location" && (
                    <div className="cl-search-input">
                      <input
                        type="text"
                        placeholder="Search location"
                        value={filters.location}
                        onChange={(e) =>
                          handleFilterChange("location", e.target.value)
                        }
                      />
                      <span className="cl-search-icon">🔍</span>
                    </div>
                  )}
                  <div className="cl-checkbox-group">
                    {options.map(({ value, count }) => (
                      <label key={value}>
                        <input
                          type="checkbox"
                          checked={
                            filters[filterType as keyof typeof filters] ===
                            `${value} (${count})`
                          }
                          onChange={() =>
                            handleFilterChange(
                              filterType,
                              `${value} (${count})`
                            )
                          }
                        />
                        {value} ({count})
                      </label>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Right Data Section */}
          <CollegeDataSection
            visibleColleges={visibleColleges}
            loading={loading}
            lastCollegeRef={lastCollegeRef}
            filters={filters}
            handleFilterChange={handleFilterChange}
            asset_url={asset_url}
          />
        </div>
      </div>
    </div>
  );
};

export default CollegeList;
