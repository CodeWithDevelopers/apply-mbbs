"use client";

import React from "react";
import { Rate } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Review {
  id: number;
  documentId: string;
  overallRating: string;
  reviewName: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div
      className="  mx-auto px-4 py-12"
      style={{ marginTop: "80px", marginBottom: "120px" }}
    >
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center heading-h2 text-gray-900 mb-8">
          <span className="text-blue-600">Reviews</span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="p-6 rounded-xl shadow-sm bg-gray-50 hover:shadow-md transition h-full box-section">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.reviewName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mb-2">
                  <p className="text-gray-700 font-medium">Rating:</p>
                  <Rate disabled defaultValue={parseInt(review.rating)} />
                  <span className="ml-2 text-gray-600 font-semibold">
                    {review.rating}/10
                  </span>
                </div>

                <div>
                  <p className="text-gray-700 font-medium">Overall:</p>
                  <span className="text-lg font-bold text-blue-600">
                    {review.overallRating}/10
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewList;
