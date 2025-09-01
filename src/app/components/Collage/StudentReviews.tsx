"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCheckCircle } from "react-icons/fa";
import "../../../style/collages/student-reviews.css";

type StudentReview = {
  id: number;
  studentName: string;
  message: string;
  verified: boolean;
};

interface StudentReviewsProps {
  reviews: StudentReview[];
}

const StudentReviews: React.FC<StudentReviewsProps> = ({ reviews }) => {
  return (
    <div className="sr-banner">
      <div className="sr-container">
        <h2 className="sr-heading-h2">
          Student <span className="sr-highlight">Reviews</span>
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="sr-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="sr-card">
                <p className="sr-review-text">“{review.message}”</p>
                <div className="sr-review-info">
                  <span className="sr-student-name">{review.studentName}</span>
                  {review.verified && (
                    <span className="sr-verified">
                      <FaCheckCircle className="sr-icon" /> Verified
                    </span>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StudentReviews;
