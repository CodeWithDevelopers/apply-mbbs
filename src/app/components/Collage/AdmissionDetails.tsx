"use client";

import { Button, Card } from "antd";
import React from "react";
import "../../../style/collages/admission-details.css";

interface Admission {
  id: number;
  documentId: string;
  description: string;
  videoLink?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  locale?: string | null;
}

interface AdmissionDetailsProps {
  admissions: Admission[];
}

const AdmissionDetails: React.FC<AdmissionDetailsProps> = ({ admissions }) => {
  if (!admissions || admissions.length === 0) {
    return <p className="ad-no-data">🚫 No admission details available</p>;
  }

  return (
    <div
      className="ad-banner"
      style={{ marginTop: "80px", marginBottom: "120px" }}
    >
      <div className="ad-container">
        <h2 className="ad-heading-h2">
          🎓 Admission <span className="ad-highlight">Details</span>
        </h2>

        <div className="ad-layout">
          {admissions.map((admission) => (
            <Card
              key={admission.id}
              hoverable
              className="ad-card"
              bodyStyle={{ padding: "1.5rem" }}
            >
              <div className="ad-content">
                {admission.description.split("\n").map((line, idx) => (
                  <p key={idx} className="ad-description">
                    {line}
                  </p>
                ))}

                {admission.videoLink && (
                  <div className="ad-video-container">
                    <iframe
                      src={admission.videoLink}
                      title="Admission Video"
                      className="ad-video"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              <div className="ad-footer">
                <Button size="large" className="ad-button">
                  View Details →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetails;
