import React from "react";
import styles from "./AboutPage.module.css";

const AboutPage: React.FC = () => {
  const facultyMembers = [
    {
      name: "Dr. Anil Sharma",
      role: "Dean & Professor of Medicine",
      bio: "Dr. Sharma leads with a vision for medical excellence, with over 20 years of experience in medical education.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Priya Patel",
      role: "Head of Surgery Department",
      bio: "Dr. Patel is a renowned surgeon, dedicated to training future doctors in advanced surgical techniques.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dr. Sanjay Gupta",
      role: "Professor of Biochemistry",
      bio: "Dr. Gupta specializes in medical research, guiding students in cutting-edge biochemical studies.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>About Us</h2>
          <p>
            Learn about our legacy, mission, and the esteemed faculty of Sunrise
            Medical College.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Our Legacy</h2>
          <p>
            Established in 2005, Sunrise Medical College in New Delhi, India, is
            a premier institution dedicated to shaping compassionate and skilled
            medical professionals. Recognized by the Medical Council of India,
            our college has trained over 2,000 doctors who serve globally,
            combining academic rigor with hands-on clinical experience.
          </p>
        </div>

        {/* <div className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            At Sunrise Medical College, we are committed to advancing medical
            education and healthcare delivery. Our mission is to foster a
            learning environment that nurtures clinical excellence, ethical
            practice, and research innovation, preparing students to address
            global health challenges with compassion and expertise.
          </p>
        </div> */}

        <div className={styles.teamSection}>
          <h2>Meet Our Faculty</h2>
          <div className={styles.teamGrid}>
            {facultyMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={styles.teamImage}
                />
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>Join Our Community</h2>
          <p>
            Ready to pursue your MBBS journey with us or have questions about
            admissions?
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
