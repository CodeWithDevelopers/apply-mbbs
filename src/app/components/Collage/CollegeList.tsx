"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import "../../../style/collages/collage-list.css";

// Define type for college data
interface College {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  address: string;
  rating: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

interface Props {
  colleges: College[];
}

const CollegesList: React.FC<Props> = ({ colleges }) => {
  return (
    <div className="college-banner">
      <div className="banner-overlay"></div>
      <div className="container">
        <h2 className="heading-h2">
          Top <span className="highlight">Colleges & Universities</span>
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {colleges.map((college) => (
            <SwiperSlide key={college.id}>
              <div className="box-section">
                <div className="college-card">
                  <h3 className="heading-h3">
                    <Link href={`/colleges/${college.slug}`}>
                      {college.name}
                    </Link>
                  </h3>
                  <p className="address">{college.address}</p>
                  <p className="rating">⭐ {college.rating} / 10</p>
                  <p className="description">{college.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollegesList;
