"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../style/collages/placement-section.css";

type PlacementProps = {
  placement: {
    id: number;
    documentId: string;
    totalStudent: string;
    totalPlaced: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    medianPackage: string;
    placementRateInPercentage: string;
  };
};

const PlacementSection: React.FC<PlacementProps> = ({ placement }) => {
  const highlights = [
    {
      value: placement.totalStudent,
      label: "Total Students",
      bg: "pl-blue-bg",
      text: "pl-blue-text",
    },
    {
      value: placement.totalPlaced,
      label: "Total Placed",
      bg: "pl-green-bg",
      text: "pl-green-text",
    },
    {
      value: `₹ ${placement.medianPackage}`,
      label: "Median Package",
      bg: "pl-purple-bg",
      text: "pl-purple-text",
    },
    {
      value: `${placement.placementRateInPercentage}%`,
      label: "Placement Rate",
      bg: "pl-yellow-bg",
      text: "pl-yellow-text",
    },
  ];

  return (
    <section className="pl-banner" style={{ marginTop: "40px" }}>
      <div className="pl-container">
        <h2 className="pl-heading-h2">Placement & Career Opportunities</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="pl-swiper"
        >
          {highlights.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`pl-card ${item.bg}`}>
                <p className={`pl-value ${item.text}`}>{item.value}</p>
                <p className="pl-label">{item.label}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pl-description">
          {placement.description.split("\n").map((line, idx) => (
            <p key={idx} className="pl-text">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;
