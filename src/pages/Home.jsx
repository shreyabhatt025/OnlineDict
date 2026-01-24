import { motion } from "framer-motion"
import "../CSS/Home.css"
import "../index.css"

// Assets (recommended: move these into src/assets/)
import photo from "../assets/photo.jpg"
import githubLogo from "../assets/github.png"
import linkedinLogo from "../assets/linkedin.png"
import gmailLogo from "../assets/gmail.png"

const professions = [
  "MERN Stack Developer",
  "Frontend Developer",
  "Tech Explorer",
]

const quickLinks = [
  { img: githubLogo, title: "GitHub", link: "https://github.com/shreyabhatt025" },
  { img: linkedinLogo, title: "LinkedIn", link: "https://www.linkedin.com/in/kunj-desai-07717b293/" },
  { img: gmailLogo, title: "Email", link: "mailto:bhattshreya024@gmail.com" },
]

const Home = () => {
  return (
    <section className="home-section">
      {/* Typing Effect Styles */}
      <style>
        {`
          @keyframes typing { from { width: 0; } to { width: 100%; } }
          @keyframes blink { 50% { border-color: transparent; } }
        `}
      </style>

      {/* Top Section */}
      <div className="home-top">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="photo-container"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="photo-ring"
          />

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="photo-frame"
          >
            <motion.img
              src={photo}
              alt="Shreya Bhatt"
              className="profile-photo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="home-info"
        >
          <h1 className="home-title">
            Hi, I’m{" "}
            <motion.span
              className="home-name"
              animate={{ backgroundPositionX: ["0%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              Shreya Bhatt
            </motion.span>
          </h1>

          <p className="typing-effect">
            MERN Stack Developer | Frontend Developer | Tech Explorer
          </p>

          {/* Profession Tags */}
          <motion.div className="profession-tags">
            {professions.map((role, i) => (
              <motion.div
                key={i}
                className="profession-tag"
                whileHover={{
                  scale: 1.05,
                  background:
                    "linear-gradient(90deg,var(--accent),var(--accent-2))",
                }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {role}
              </motion.div>
            ))}
          </motion.div>

          {/* Info Cards */}
          <motion.div className="info-cards">
            {[
              { label: "📍 Location", value: "Tonk, Rajasthan, India" },
              { label: "💼 Expertise", value: "Frontend, Problem Solving" },
              { label: "📧 Contact", value: "bhattshreya024@gmail.com" },
            ].map((info, i) => (
              <motion.div
                key={i}
                className="info-card"
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <strong>{info.label}</strong>
                <p>{info.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Links */}
      <motion.div className="quick-links">
        <h2 className="quick-links-title">Connect with me</h2>
        <div className="quick-links-list">
          {quickLinks.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="quick-link-img"
                whileHover={{
                  filter:
                    "drop-shadow(0 0 15px var(--accent)) brightness(1.2)",
                }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Home
