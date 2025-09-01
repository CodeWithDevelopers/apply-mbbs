"use client";
import AdmissionDetails from "@/app/components/Collage/AdmissionDetails";
import BrochureSection from "@/app/components/Collage/BrochureSection";
import CollegeList from "@/app/components/Collage/CollegeList";
import CollegePage from "@/app/components/Collage/CollegePage";
import CoursesList from "@/app/components/Collage/CoursesList";
import InfraStructure from "@/app/components/Collage/InfraStructure";
import LoadingCollege from "@/app/components/Collage/LoadingCollege";
import PlacementSection from "@/app/components/Collage/PlacementSection";
import QnaAccordion from "@/app/components/Collage/QnaAccordion";
import ReviewList from "@/app/components/Collage/ReviewList";
import SimilarColleges from "@/app/components/Collage/SimilarColleges";
import SpecialCategories from "@/app/components/Collage/SpecialCategories";
import StudentReviews from "@/app/components/Collage/StudentReviews";
import { Button } from "antd";
import { useEffect, useState } from "react";
import "./college.css";

interface PageProps {
  params: { slug: string };
}

export default function CollegeDynamicPage({ params }: PageProps) {
  const [college, setCollege] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/colleges-and-univercities`
        );
        const data = await res.json();

        // match college by slug
        const foundCollege = data.data.find(
          (item: any) => item.slug === params.slug
        );

        setCollege(foundCollege || null);
      } catch (error) {
        console.error("Error fetching college:", error);
        setCollege(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [params.slug]);

  if (loading) {
    return <LoadingCollege />;
  }

  if (!college) {
    return (
      <div className="p-6 text-center container">
        {/* Illustration / Icon */}
        {/* <div className="animate-bounce">
        <span className="text-6xl">🚫</span>
      </div> */}

        {/* Title */}
        <h2 className="mt-6 text-3xl font-bold text-gray-800">
          College Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-500 text-center max-w-md">
          The college you’re looking for doesn’t exist or may have been removed.
          Please check the details and try again.
        </p>

        {/* Action Button */}
        <Button href="/" className="p-6">
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <CollegePage {...college} />
      {college.placement && <PlacementSection placement={college.placement} />}
      {college.student_reviews && college.student_reviews.length > 0 && (
        <StudentReviews reviews={college.student_reviews} />
      )}
      {college.similar_college && college.similar_college.length > 0 && (
        <SimilarColleges colleges={college.similar_college} />
      )}
      {college.college_and_universities &&
        college.college_and_universities.length > 0 && (
          <CollegeList colleges={college.college_and_universities} />
        )}
      {/* {college.admissions && college.admissions.length > 0 && (
        <AdmissionDetails admissions={college.admissions} />
      )} */}
      {college.qnas && college.qnas.length > 0 && (
        <QnaAccordion qnas={college.qnas} />
      )}
    </div>
  );
}
