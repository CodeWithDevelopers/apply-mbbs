"use client";

import React from "react";
import { Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface SpecialCategory {
  id: number;
  documentId: string;
  calegory: string;
  idd: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  locale?: string | null;
}

interface SpecialCategoriesProps {
  special_categories: SpecialCategory[];
}

const SpecialCategoriesSlider: React.FC<SpecialCategoriesProps> = ({
  special_categories,
}) => {
  if (!special_categories || special_categories.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No special categories available
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ marginTop: "40px" }}>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#5c3a00]">
        Special Categories
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {special_categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Card
              hoverable
              className="p-6 shadow-lg rounded-2xl border border-gray-200 bg-white text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {category.calegory}
              </h3>
              <p className="text-gray-500 text-sm mt-2">{category.idd}</p>
              <button className="mt-4 px-4 py-2 bg-[#5c3a00] hover:bg-[#7a4d00] text-white rounded-xl shadow-md transition">
                View More →
              </button>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialCategoriesSlider;
