"use client";

import React from "react";
import { Collapse } from "antd";
  import type { CollapseProps } from "antd";
  import "../../../style/collages/qna-accordion.css";

interface QnaItem {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
}

interface QnaAccordionProps {
  qnas: QnaItem[];
}

const QnaAccordion: React.FC<QnaAccordionProps> = ({ qnas }) => {
  const items: CollapseProps["items"] = qnas.map((qna) => ({
    key: qna.id,
    label: <span className="qna-heading-h3">{qna.question}</span>,
    children: <p className="qna-answer-text">{qna.answer}</p>,
  }));

  return (
    <div className="qna-banner">
      <div className="qna-container">
        <h2 className="qna-heading-h2">
          Frequently Asked <span className="qna-highlight">Questions</span>
        </h2>
        <Collapse
          items={items}
          accordion
          bordered={false}
          className="qna-faq-collapse"
        />
      </div>
    </div>
  );
};

export default QnaAccordion;
