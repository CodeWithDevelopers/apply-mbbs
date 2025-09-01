"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Course {
  id: number;
  documentId: string;
  name: string;
  rating: string;
  totalTutionFee: string;
}

interface CoursesListProps {
  courses: Course[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  return (
    <div
      className="container mx-auto px-4 py-10"
      style={{ marginTop: "80px", marginBottom: "120px" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 heading-h2">
        Available <span className="text-blue-600">Courses</span>
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <div className="box-section my-4">
              {/* Course Info */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 heading-h3">
                  {course.name}
                </h3>
                <p className="text-yellow-500 font-medium mb-1">
                  ⭐ Rating: {course.rating}/10
                </p>
                <p className="text-gray-700 font-medium">
                  💰 Tuition Fee: ₹
                  {Number(course.totalTutionFee).toLocaleString("en-IN")}
                </p>
              </div>

              {/* Button */}
              {/* <div className="mt-6">
                <Link
                  href={`/courses/${course.documentId}`}
                  className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  View Details →
                </Link>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoursesList;
