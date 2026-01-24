import { motion } from "framer-motion";
import { FaUniversity } from "react-icons/fa";

const AboutMe = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #0d0d0d, #000)",
        color: "white",
        padding: "3rem 1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "left",
          marginTop: "1rem",
          lineHeight: 1.8,
          background: "rgba(255,255,255,0.04)",
          padding: "3rem 3.5rem",
          borderRadius: "18px",
          boxShadow: "0 0 25px rgba(0,255,200,0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            fontSize: "1.9rem",
            marginBottom: "1.2rem",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          About Me
        </h2>

        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)" }}>
          Hi, I’m <strong>Shreya Bhatt</strong> — an aspiring{" "}
          <strong>MERN Stack Developer</strong> driven by a passion for developing
          efficient, scalable, and impactful web applications.
        </p>

        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)" }}>
          Beyond development, I enjoy crafting intuitive user experiences that
          balance <strong>visual clarity</strong> with{" "}
          <strong>technical precision</strong>.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ marginTop: "3rem" }}
        >
          <h3
            style={{
              fontSize: "1.6rem",
              marginBottom: "1.5rem",
              background:
                "linear-gradient(90deg, var(--accent), var(--accent-2))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Education
          </h3>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "14px",
              padding: "1.5rem 2rem",
              display: "flex",
              gap: "1.2rem",
            }}
          >
            <FaUniversity size={40} color="var(--accent)" />
            <div>
              <h4 style={{ color: "var(--accent)" }}>
                B.Tech in CSE (Artificial Intelligence)
              </h4>
              <p>Banasthali Vidyapith — Rajasthan</p>
              <p>2022 – 2026</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
