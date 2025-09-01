const filtersData = {
  location: {
    label: "Location",
    options: [
      { value: "Delhi/NCR", count: 8 },
      { value: "Chennai", count: 4 },
      { value: "Bangalore", count: 3 },
      { value: "Kolkata", count: 2 },
      { value: "Pune", count: 2 },
      { value: "Hyderabad", count: 1 }
    ]
  },
  totalFees: {
    label: "Total Fees",
    options: [
      { value: "< 1 Lakh", count: 17 },
      { value: "1 - 2 Lakh", count: 8 },
      { value: "2 - 3 Lakh", count: 3 },
      { value: "3 - 5 Lakh", count: 2 },
      { value: "> 5 Lakh", count: 16 }
    ]
  },
  rating: {
    label: "Rating",
    options: [
      { value: "> 2 - 3 Star", count: 1 },
      { value: "> 3 - 4 Star", count: 3 },
      { value: "> 4 - 5 Star", count: 32 }
    ]
  },
  ownership: {
    label: "Ownership",
    options: [
      { value: "Public / Government", count: 31 },
      { value: "Private", count: 16 }
    ]
  },
  specialization: {
    label: "Specialization",
    options: [
      { value: "Clinical Embryology", count: 1 },
      { value: "Operation Theatre Technology", count: 1 },
      { value: "Perfusion Technology", count: 1 },
      { value: "Public Health", count: 1 },
      { value: "Unani", count: 1 },
      { value: "Cardiology", count: 1 }
    ]
  },
  exams: {
    label: "Exams Accepted",
    options: [
      { value: "NEET", count: 32 },
      { value: "Tamil Nadu NEET", count: 3 },
      { value: "NEET PG", count: 2 },
      { value: "West Bengal NEET", count: 2 },
      { value: "Punjab NEET", count: 2 },
      { value: "CBSE 12th", count: 2 }
    ]
  }
};

export default filtersData;
