"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="not-found-title"
      >
        404
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="not-found-subtext"
      >
        Oops! The page you’re looking for is lost in space.
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="not-found-description"
      >
        It seems you’ve ventured too far into the unknown. Let’s guide you back
        to familiar territory.
      </motion.p>

      {/* Go Back Button */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="not-found-button-container"
      >
        <Link href="/" className="not-found-button">
          ⬅ Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
