import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  RotatingRobotHead,
  PythonLogo,
  LinuxPenguin,
  WebDevDataFlow,
  AwsCloud,
  AutomationGear,
  useMediaQuery,
  SkillCanvas,
  Badge,
} from "./three-scenes";
import { Reveal } from "./reveal";

import geonaviImg from "@/assets/geonavi.png";
import pathfinderImg from "@/assets/pathfinder.png";
import bgclickerImg from "@/assets/bgclicker.jpeg";
import scrivenersImg from "@/assets/scriveners.png";
import faceSurveillanceImg from "@/assets/faceSurveillance.png";
import whatsappImg from "@/assets/whatsapp.png";

// --- Sections ---

const HeroSection = () => (
  <section className="relative flex min-h-screen items-center overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
    <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
    <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-violet-glow/20 blur-[120px]" />

    <div className="container-x relative z-10 grid items-center gap-10 py-24 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <Reveal>
          <span className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Available for new opportunities
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            Yatharth
            <br />
            <span className="bg-gradient-to-r from-accent via-teal-200 to-violet-glow bg-clip-text text-transparent">
              Jain
            </span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-md text-lg text-gray-400">
            B.Tech CSE student crafting intelligent full-stack products with
            <span className="text-gray-200"> AI/ML</span>,
            <span className="text-gray-200"> cloud</span>, and a love for clean code.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-105 hover:shadow-glow"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent/60 hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120} className="order-1 md:order-2">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 animate-pulse-slow rounded-full bg-accent/10 blur-2xl" />
          <Canvas camera={{ position: [0, 0, 5] }} className="relative">
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <Suspense fallback={null}>
              <RotatingRobotHead />
            </Suspense>
          </Canvas>
        </div>
      </Reveal>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-gray-500">
      <i className="fas fa-chevron-down" />
    </div>
  </section>
);

const AboutSection = () => {
  const stats = [
    { label: "LeetCode", value: "1607" },
    { label: "CodeChef", value: "1512" },
    { label: "Codeforces", value: "935" },
  ];
  return (
    <section id="about" className="relative py-24">
      <div className="container-x">
        <Reveal>
          <span className="section-eyebrow">01 — About</span>
          <h2 className="section-title">Building things that matter</h2>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="glass-card p-8 shadow-card">
              <p className="text-lg leading-relaxed text-gray-300">
                I'm a final-year B.Tech Computer Science student at Gyan Ganga
                Institute of Technology and Sciences with a passion for building
                innovative solutions. My journey in technology has equipped me
                with a strong foundation in machine learning, cloud computing,
                and full-stack development. I thrive on tackling complex problems
                and am always eager to learn and apply new technologies to create
                impactful applications. I'm currently seeking roles where I can
                contribute my skills and continue to grow as a software engineer.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-6 text-center md:text-left">
                  <div className="font-display text-3xl font-bold text-accent">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">{s.label} rating</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skills = [
    { name: "Python", description: "Scripting, automation & backend development.", component: <PythonLogo /> },
    { name: "AI / Machine Learning", description: "Scikit-learn, TensorFlow & Keras for production ML.", component: <RotatingRobotHead /> },
    { name: "Web Development", description: "Full-stack with FastAPI, React & MongoDB.", component: <WebDevDataFlow /> },
    { name: "Cloud & DevOps", description: "AWS (EC2, S3, Lambda) deployment & management.", component: <AwsCloud /> },
    { name: "Linux", description: "Development, scripting & system administration.", component: <LinuxPenguin /> },
    { name: "Automation", description: "Streamlining workflows with scripts & tools.", component: <AutomationGear /> },
  ];
  return (
    <section id="skills" className="relative py-24">
      <div className="container-x">
        <Reveal>
          <span className="section-eyebrow">02 — Tech Arsenal</span>
          <h2 className="section-title">Tools I build with</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 80}>
              <div className="glass-card h-full overflow-hidden p-0 shadow-card">
                <SkillCanvas>{skill.component}</SkillCanvas>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">{skill.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Geolocation Based Attendance Tracking App",
      link: "https://geonavi.venoms.app",
      description:
        "A modern replacement for biometric systems, using geofencing and random interval face verification to ensure authentic on-site attendance.",
      tags: ["FastAPI", "TypeScript", "MongoDB", "Geofencing", "Face Verification"],
      img: geonaviImg,
    },
    {
      title: "Pathfinder Game with Q-Learning",
      link: "https://github.com/Venom120/pathfinderML",
      description:
        "A grid-based game where agents learn to navigate to a goal while avoiding obstacles, using Q-learning reinforcement learning.",
      tags: ["Python", "Pygame", "Reinforcement Learning", "Q-Learning"],
      img: pathfinderImg,
    },
    {
      title: "BG Clicker",
      link: "https://github.com/Venom120/bgclicker",
      description:
        "A Python GUI app for performing background mouse clicks and keyboard inputs.",
      tags: ["Python", "Tkinter", "xdotool", "Shell Scripting", "Linux"],
      img: bgclickerImg,
    },
    {
      title: "Scriveners Website",
      link: "https://scriveners.venoms.app",
      description:
        "A full-stack literary club app with a FastAPI backend, React frontend, deployed on Oracle Cloud with Nginx and Git-hook CI/CD.",
      tags: ["Python", "FastAPI", "React", "MongoDB", "Oracle Cloud", "Nginx"],
      img: scrivenersImg,
    },
    {
      title: "CCTV Surveillance System",
      link: "https://github.com/Venom120/MIP",
      description:
        "Helps police find missing persons via CCTV analysis, with dashboards for civilians and officers to manage FIRs.",
      tags: ["Python", "OpenCV", "MongoDB", "Computer Vision"],
      img: faceSurveillanceImg,
    },
    {
      title: "Google Form to WhatsApp Group",
      link: "https://github.com/Venom120/Number-Whatsapp_grp",
      description: "A Python script to automatically add numbers from a Google Form to any WhatsApp group.",
      tags: ["Python", "Pydrive", "Selenium", "PyAutoGUI"],
      img: whatsappImg,
    },
  ];
  return (
    <section id="projects" className="relative py-24">
      <div className="container-x">
        <Reveal>
          <span className="section-eyebrow">03 — Selected Work</span>
          <h2 className="section-title">Projects showcase</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card block h-full overflow-hidden shadow-card"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  const achievements = [
    { title: "Gyan Ganga Summer of Code 2024", detail: "Winner", icon: "🏆" },
    { title: "IDE Bootcamp Phase 3", detail: "AICTE & MOE, Dehradun 2024", icon: "🚀" },
    { title: "CodeChef", detail: "Rating 1512", icon: "💻" },
    { title: "Codeforces", detail: "Rating 935", icon: "⚡" },
    { title: "LeetCode", detail: "Rating 1607", icon: "🧠" },
  ];
  return (
    <section id="achievements" className="relative py-24">
      <div className="container-x">
        <Reveal>
          <span className="section-eyebrow">04 — Milestones</span>
          <h2 className="section-title">Achievements</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="glass-card mt-10 p-8 shadow-card">
            <ul className="divide-y divide-white/5">
              {achievements.map((item) => (
                <li key={item.title} className="flex items-center gap-4 py-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-sm text-gray-400">{item.detail}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const ContactSection = () => (
  <section id="contact" className="relative py-24">
    <div className="container-x">
      <Reveal>
        <div className="glass-card relative overflow-hidden p-12 text-center shadow-card">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
          <h2 className="section-title relative">Let's build something</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-gray-400">
            I'm actively looking for new opportunities and collaborations. Reach
            out if you think my skills are a good fit — or just to connect.
          </p>
          <div className="relative mt-8 flex justify-center gap-4 text-2xl">
            <a
              href="https://www.linkedin.com/in/yatharth--jain"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow"
            >
              <i className="fab fa-linkedin" />
            </a>
            <a
              href="https://github.com/Venom120"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="mailto:yatharth3194@gmail.com"
              aria-label="Email"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow"
            >
              <i className="fas fa-envelope" />
            </a>
            <a
              href="https://venoms.app/resources/public/yatharth_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-300 transition-all hover:border-accent/60 hover:text-accent hover:shadow-glow"
            >
              <i className="fas fa-file-pdf" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["about", "skills", "projects", "achievements", "contact"];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/5 bg-ink-950/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between py-4">
        <a href="/" className="font-display text-xl font-bold tracking-tight text-white">
          YJ<span className="text-accent">.</span>
        </a>
        {isMobile ? (
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`} />
            </button>
            {isMenuOpen && (
              <div className="absolute left-0 right-0 top-full flex flex-col items-center gap-6 border-b border-white/5 bg-ink-950/95 py-8 backdrop-blur-md">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="capitalize text-gray-300 transition-colors hover:text-accent"
                  >
                    {link}
                  </a>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="group relative capitalize text-sm text-gray-300 transition-colors hover:text-white"
              >
                {link}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-white/5 py-8 text-center text-sm text-gray-500">
    <p>
      © {new Date().getFullYear()} Yatharth Jain. Built with React, Three.js &
      lots of ☕.
    </p>
  </footer>
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950 font-sans text-gray-200 antialiased">
      <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
      `}</style>

      {/* Page-wide ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint [background-size:64px_64px] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
