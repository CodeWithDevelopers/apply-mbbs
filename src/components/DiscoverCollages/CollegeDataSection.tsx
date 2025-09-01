"use client";

import { Dispatch, SetStateAction, RefObject } from "react";
import { useRouter } from "next/navigation";

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

interface Filters {
  location: string;
  totalFees: string;
  rating: string;
  ownership: string;
  specialization: string;
  exams: string;
  name: string;
}

interface CollegeDataSectionProps {
  filteredColleges: College[];
  visibleColleges: College[];
  loading: boolean;
  lastCollegeRef: RefObject<HTMLDivElement | null>;
  filters: Filters;
  handleFilterChange: (filterType: string, value: string) => void;
  asset_url: string;
}

const CollegeDataSection = ({
  filteredColleges,
  visibleColleges,
  loading,
  lastCollegeRef,
  filters,
  handleFilterChange,
  asset_url,
}: CollegeDataSectionProps) => {
  const router = useRouter();

  const handleCollegeClick = (collegeName: string) => {
    router.push(`/colleges/${collegeName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div className="data-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search a college within this ranking"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
      </div>
      {visibleColleges.map((college: College, index) => (
        <div
          key={index}
          style={{ cursor: "pointer" }}
          className="college-card"
          ref={index === visibleColleges.length - 1 ? lastCollegeRef : null}
          onClick={() => handleCollegeClick(college.name)}
        >
          <div className="college-info">
            <div className="college-cell logo-cell">
              <img
                src={`${asset_url}/${college.logo}`}
                alt={college.name}
                className="college-logo"
              />
            </div>
            <div>
              <h3>{college.name}</h3>
              {/* {college.nirdRank && (
                <p>NIRF '24 (All India): {college.nirdRank}</p>
              )} */}
              {/* {college.indiaToday && college.theWeek && (
                <p>
                  India Today {college.indiaToday} • The Week {college.theWeek}
                </p>
              )} */}
              <p>{college.rating}</p>
              <p>Fees: {college.fees}</p>
              {college.salary && <p>Salary: {college.salary}</p>}
              {college.location && <p>{college.location}</p>}
            </div>
          </div>
          <div className="actions">
            <button className="compare-btn">Compare</button>
            <button className="brochure-btn">Brochure</button>
          </div>
        </div>
      ))}
      {loading && (
        <div className="enhanced-loader">
          <div className="spinner"></div>
          <p>Loading more colleges...</p>
        </div>
      )}
    </div>
  );
};

export default CollegeDataSection;
