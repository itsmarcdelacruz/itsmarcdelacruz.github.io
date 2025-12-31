import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import lsMarketImg from "../../assets/images/LS Market.png";
import portfolioImg from "../../assets/images/Portfolio Website.png";
import defaultProjectImg from "../../assets/images/default-project.png";

const isValidLink = (url) =>
  typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

const mainProjects = [
  {
    title: "LS Marketplace - FiveM Marketplace (Video Game)",
    description:
      "LS Marketplace is a roleplay-focused web marketplace for GTA V FiveM, simulating a player-driven underground economy through structured listings, approvals, and reputation-based access. It’s built with React 18 + TypeScript, Vite, Tailwind CSS (shadcn/Radix UI), and powered by Supabase (Postgres, Auth, RLS), then deployed as a SPA on Vercel.",
    src: "rock.jpg",
    link: lsMarketImg,
    color: "#5196fd",
    githubLink: "#",
    liveLink: "https://lsmarket.vercel.app/",
  },
  {
    title: "A sleek portfolio built with React and Tailwind CSS ",
    description:
      "A sleek portfolio built with React and Tailwind CSS to showcase your skills, projects, and experience in a modern design.",
    src: "tree.jpg",
    link: portfolioImg,
    color: "#8f89ff",
    githubLink: "#",
    liveLink: "https://mdelacruz.dev/",
  },
];

const smallProjects = [
  {
    title: "Software Developer Portfolio",
    description:
      "A Vercel-like developer portfolio template built with TypeScript and SvelteKit.",
    link: defaultProjectImg,
    color: "#f97316",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Arduino Arcade",
    description:
      "Arduino kit recreation of a Mario 1:1 level with C++ control over servo motor timing and basic physics.",
    link: defaultProjectImg,
    color: "#22c55e",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Donut Delivery",
    description:
      "Exploring optimization algorithms like Traveling Salesperson and Knapsack for delivery routing.",
    link: defaultProjectImg,
    color: "#a855f7",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Database Query Language",
    description:
      "Worked with hash tables and composed data structures to manage large datasets.",
    link: defaultProjectImg,
    color: "#38bdf8",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Star Wars Battles",
    description:
      "Used priority queues and templated containers with inheritance and interface programming.",
    link: defaultProjectImg,
    color: "#eab308",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "2D and 3D Environments and Puzzles",
    description:
      "Implemented BFS and DFS for graph search and route tracing in game-like environments.",
    link: defaultProjectImg,
    color: "#06b6d4",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Machine Learning",
    description:
      "Built a classifier with recursion and BSTs to categorize Q&A posts, using CSV ingestion and log-likelihood scoring.",
    link: defaultProjectImg,
    color: "#ef4444",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Euchre",
    description:
      "Programmed the Euchre card game with classes, dynamic memory, readable input interface, and AI opponents.",
    link: defaultProjectImg,
    color: "#f59e0b",
    githubLink: "#",
    liveLink: "#",
  },
  {
    title: "Computer Vision",
    description:
      "Implemented seam-carving content-aware resizing and PPM image processing via command-line tooling.",
    link: defaultProjectImg,
    color: "#6366f1",
    githubLink: "#",
    liveLink: "#",
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Add specific styles for 1366x768 resolution
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px),
             screen and (width: 1367px) and (height: 768px),
             screen and (width: 1368px) and (height: 769px) {
        .project-card {
          scale: 0.85;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);

    // Resolution check function
    const checkResolution = () => {
      const isTargetResolution =
        window.innerWidth >= 1360 &&
        window.innerWidth <= 1370 &&
        window.innerHeight >= 760 &&
        window.innerHeight <= 775;

      if (isTargetResolution) {
        document.documentElement.style.setProperty("--project-scale", "0.85");
        document.documentElement.style.setProperty("--project-margin", "-5vh");
      } else {
        document.documentElement.style.setProperty("--project-scale", "1");
        document.documentElement.style.setProperty("--project-margin", "0");
      }
    };

    checkResolution();
    window.addEventListener("resize", checkResolution);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("resize", checkResolution);
    };
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {/* Large feature projects */}
          {mainProjects.map((project, i) => {
            const targetScale = 1 - (mainProjects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            );
          })}

          {/* Compact grid for smaller projects */}
          <div className="relative z-10 w-full px-6 pb-20 bg-slate-950">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">More Projects</h3>
                <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-blue-500/60 to-purple-500/40" />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {smallProjects.map((project, idx) => (
                  <SmallProjectCard key={project.title} project={project} index={idx} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        {/* Modern split card design */}
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          {/* Image section - full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden">
            <motion.img
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />

            {/* Colored overlay on hover */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />

            {/* Project number */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
              Project {i + 1}
            </div>
          </div>

          {/* Content section - full width on mobile, 45% on desktop */}
          <div className="w-full md:w-[45%] p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 md:w-20 bg-gray-600" />
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-4">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-none max-w-md">
                {description}
              </p>
            </div>

            <div className="mt-4 md:mt-auto pt-4">
              <div className="w-full h-[1px] bg-gray-800 mb-4 md:mb-6" />

              <div className="flex items-center gap-4">
                {/* GitHub Link */}
                {isValidLink(githubLink) && (
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Code
                    </span>
                  </motion.a>
                )}

                {/* Live Link */}
                {isValidLink(liveLink) && (
                  <motion.a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span
                      className="text-xs md:text-sm font-medium"
                      style={{ color }}
                    >
                      Live
                    </span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SmallProjectCard({ project, index }) {
  return (
    <motion.div
      className="group rounded-xl border border-gray-800/60 bg-gradient-to-br from-gray-900 to-gray-900/80 overflow-hidden shadow-lg"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={project.link}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/30" />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 backdrop-blur text-white">
          #{index + 1}
        </span>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <h4 className="text-lg font-semibold text-white">{project.title}</h4>
        </div>
        <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
        <div className="flex items-center gap-4 pt-1">
          {isValidLink(project.githubLink) && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              Code ↗
            </a>
          )}
          {isValidLink(project.liveLink) && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-purple-300 hover:text-purple-200 transition-colors"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

SmallProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    liveLink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// Add PropTypes validation
Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  liveLink: PropTypes.string.isRequired,
};
