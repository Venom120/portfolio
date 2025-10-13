import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import geonaviImg from './assets/geonavi.png';
import pathfinderImg from './assets/pathfinder.png';
import bgclickerImg from './assets/bgclicker.jpeg';
import scrivenersImg from './assets/scriveners.png';
import faceSurveillanceImg from './assets/faceSurveillance.png';
import whatsappImg from './assets/whatsapp.png';

// Helper function for responsive design
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);
    return matches;
};


// --- 3D Components ---
const RotatingRobotHead = () => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} floatIntensity={1}>
            <group ref={groupRef} scale={1.5} position={[0, -1, 0]}>
                {/* Head base */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1.5, 1.5, 1.5]} />
                    <meshStandardMaterial color="#61DBFB" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.4, 0.8, 0.7]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.4, 0.8, 0.7]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
                </mesh>
                {/* Antenna */}
                <mesh position={[0, 1.5, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
                    <meshStandardMaterial color="#61DBFB" />
                </mesh>
                <mesh position={[0, 1.8, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="orange" emissive="orange" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </Float>
    );
};

const LinuxPenguin = () => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
            groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={2} floatIntensity={0.5}>
            <group ref={groupRef} scale={1.5} position={[0, -1, 0]}>
                {/* Body */}
                <mesh position={[0, 0.5, 0]}>
                    <sphereGeometry args={[0.8, 32, 32]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
                {/* Belly */}
                <mesh position={[0, 0.4, 0.6]}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                {/* Head */}
                <mesh position={[0, 1.3, 0]}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
                {/* Eyes */}
                <mesh position={[-0.25, 1.4, 0.55]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0.25, 1.4, 0.55]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[-0.25, 1.4, 0.6]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[0.25, 1.4, 0.6]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                {/* Beak */}
                <mesh position={[0, 1.15, 0.7]}>
                    <coneGeometry args={[0.2, 0.4, 4]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                {/* Feet */}
                <mesh position={[-0.3, -0.2, 0.4]}>
                    <boxGeometry args={[0.4, 0.1, 0.4]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <mesh position={[0.3, -0.2, 0.4]}>
                    <boxGeometry args={[0.4, 0.1, 0.4]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                {/* Wings */}
                <mesh position={[-0.8, 0.5, 0]} rotation-z={Math.PI / 4}>
                    <boxGeometry args={[0.2, 0.8, 0.1]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
                <mesh position={[0.8, 0.5, 0]} rotation-z={-Math.PI / 4}>
                    <boxGeometry args={[0.2, 0.8, 0.1]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>
            </group>
        </Float>
    );
};

// This interface defines the props for the SnakeBody component
interface SnakeBodyProps {
    path: THREE.Curve<THREE.Vector3>;
    color: string;
}

// A helper component to create the main body of the snake using a tube geometry
const SnakeBody = ({ path, color }: SnakeBodyProps) => {
    return (
        <mesh>
            {/* args: [path, tubularSegments, radius, radialSegments, closed] */}
            <tubeGeometry args={[path, 100, 0.15, 12, false]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
        </mesh>
    );
};

const PythonLogo = () => {
    const groupRef = useRef<THREE.Group>(null!);

    // Animate the logo with a gentle rotation
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
        }
    });

    // useMemo calculates the complex geometry only once for better performance
    const { bluePath, yellowPath, blueHeadPos, yellowHeadPos } = useMemo(() => {
        // --- Blue Snake Path (Top) ---
        // Head starts at top-left, path goes right, down, and hooks left.
        const bluePoints = [
            new THREE.Vector3(-0.65, 0.5, 0),  // 1. Head position (top-left)
            new THREE.Vector3(0, 0.8, 0),     // 2. Apex of the top curve
            new THREE.Vector3(0.65, 0.5, 0),  // 3. Right side of the curve
            new THREE.Vector3(0.5, -0.3, 0), // 4. Tail tucks under
        ];
        const bluePath = new THREE.CatmullRomCurve3(bluePoints);
        const blueHeadPos = bluePoints[0]; // The head is the first point

        // --- Yellow Snake Path (Bottom) ---
        // Head starts at bottom-right, path goes left, up, and hooks right.
        const yellowPoints = [
            new THREE.Vector3(0.65, -0.5, 0),   // 1. Head position (bottom-right)
            new THREE.Vector3(0, -0.8, 0),      // 2. Apex of the bottom curve
            new THREE.Vector3(-0.65, -0.5, 0), // 3. Left side of the curve
            new THREE.Vector3(-0.5, 0.3, 0),  // 4. Tail tucks over
        ];
        const yellowPath = new THREE.CatmullRomCurve3(yellowPoints);
        const yellowHeadPos = yellowPoints[0]; // The head is the first point

        return { bluePath, yellowPath, blueHeadPos, yellowHeadPos };
    }, []);

    const headRadius = 0.22;
    const eyeRadius = 0.08;

    return (
        <Float speed={1.5} floatIntensity={0.5}>
            <group ref={groupRef} scale={2.5} position={[0, 0, 0]}>
                {/* --- Blue Snake --- */}
                <group>
                    <SnakeBody path={bluePath} color="#3776AB" />
                    {/* Head */}
                    <mesh position={blueHeadPos}>
                        <sphereGeometry args={[headRadius, 32, 32]} />
                        <meshStandardMaterial color="#3776AB" metalness={0.6} roughness={0.4} />
                    </mesh>
                    {/* Eye */}
                    <mesh position={[blueHeadPos.x, blueHeadPos.y + 0.06, headRadius * 0.8]}>
                        <sphereGeometry args={[eyeRadius, 16, 16]} />
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
                    </mesh>
                </group>

                {/* --- Yellow Snake --- */}
                <group>
                    <SnakeBody path={yellowPath} color="#FFD43B" />
                    {/* Head */}
                    <mesh position={yellowHeadPos}>
                        <sphereGeometry args={[headRadius, 32, 32]} />
                        <meshStandardMaterial color="#FFD43B" metalness={0.6} roughness={0.4} />
                    </mesh>
                    {/* Eye */}
                    <mesh position={[yellowHeadPos.x, yellowHeadPos.y - 0.06, headRadius * 0.8]}>
                        <sphereGeometry args={[eyeRadius, 16, 16]} />
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
                    </mesh>
                </group>
            </group>
        </Float>
    );
};

const AutomationGear = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;
        }
    });

    return (
        <Float speed={2} floatIntensity={1}>
            <mesh ref={meshRef} scale={2} position={[0, 0.05, 0]}>
                <torusGeometry args={[0.8, 0.2, 16, 100]} />
                <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
                    <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
                </mesh>
                {/* Gear teeth */}
                {[...Array(8)].map((_, i) => (
                    <mesh key={i} position={[Math.sin(i * Math.PI / 4) * 0.9, Math.cos(i * Math.PI / 4) * 0.9, 0]} rotation-z={i * Math.PI / 4}>
                        <boxGeometry args={[0.2, 0.4, 0.2]} />
                        <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
                    </mesh>
                ))}
            </mesh>
        </Float>
    );
};

const WebDevDataFlow = () => {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame(({ clock }) => {
        if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    });

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 200; i++) {
            const time = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push({ time, factor, speed, x, y, z });
        }
        return temp;
    }, []);

    return (
        <group ref={groupRef}>
            {particles.map((particle, i) => (
                <Particle key={i} {...particle} />
            ))}
            <Text color="white" fontSize={0.8} position={[0, 3, 0]}>API</Text>
            <Text color="white" fontSize={0.8} position={[4, -3, 0]}>Client</Text>
            <Text color="white" fontSize={0.8} position={[-4, -3, 0]}>Server</Text>
        </group>
    );
};

const Particle = ({ time, factor, speed, x, y, z }: { time: number, factor: number, speed: number, x: number, y: number, z: number }) => {
    const ref = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime() + time;
        ref.current.position.set(
            x + Math.cos(t) * factor * speed,
            y + Math.sin(t) * factor * speed,
            z + Math.sin(t * 1.5) * factor * speed
        );
    });
    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={Math.random() > 0.5 ? "#61DBFB" : "#4CAF50"} emissive="white" emissiveIntensity={0.2} />
        </mesh>
    );
};

interface AwsNode {
    position: [number, number, number];
    text: string;
}

const AwsCloud = () => {
    const nodes: AwsNode[] = useMemo(() => [
        { position: [0, 0, 0], text: "EC2" },
        { position: [3, 1, 0], text: "S3" },
        { position: [-3, -1, 0], text: "Lambda" },
        { position: [1, -2, 1], text: "RDS" },
        { position: [-1, 2, -1], text: "VPC" },
    ], []);

    return (
        <group>
            {nodes.map((node, i) => (
                <Float key={i} speed={3} floatIntensity={0.5}>
                    <Sphere position={node.position} args={[0.5, 32, 32]}>
                        <meshStandardMaterial color="#FF9900" metalness={0.7} roughness={0.3} />
                    </Sphere>
                    <Text color="white" fontSize={0.4} position={[node.position[0], node.position[1] + 0.7, node.position[2]]}>
                        {node.text}
                    </Text>
                </Float>
            ))}
        </group>
    );
};


// --- UI Components (shadcn/ui inspired) ---

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-gray-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/20 ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`mb-4 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-2xl font-bold text-cyan-400 ${className}`}>{children}</h3>
);

const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`text-gray-300 ${className}`}>{children}</div>
);

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-block bg-cyan-900/50 text-cyan-300 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full border border-cyan-700 ${className}`}>
        {children}
    </span>
);


// --- Sections ---

const HeroSection = () => {
    return (
        <section className="h-screen flex items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                        <RotatingRobotHead />
                    </Suspense>
                </Canvas>
            </div>
            <div className="z-10 bg-black/30 p-8 rounded-lg">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    Yatharth Jain
                </h1>
                <p className="text-xl md:text-2xl text-cyan-300">
                    B.Tech CSE Student | Full-Stack Developer | AI & ML Enthusiast
                </p>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section id="about" className="py-20 px-4 md:px-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
                <Card>
                    <CardContent>
                        <p className="text-lg">
                            I am a final-year B.Tech Computer Science student at Gyan Ganga Institute of Technology and Sciences with a passion for building innovative solutions. My journey in technology has equipped me with a strong foundation in machine learning, cloud computing, and full-stack development. I thrive on tackling complex problems and am always eager to learn and apply new technologies to create impactful applications. I'm currently seeking roles where I can contribute my skills and continue to grow as a software engineer.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

const SkillsSection = () => {
    const skills = [
        { name: 'Python', description: 'Strong proficiency in Python for scripting, automation, and backend development.', component: <PythonLogo /> },
        { name: 'AI / Machine Learning', description: 'Experience with Scikit-learn, TensorFlow, and Keras for building and deploying ML models.', component: <RotatingRobotHead /> },
        { name: 'Web Development', description: 'Full-stack development using FastAPI, React, and MongoDB.', component: <WebDevDataFlow /> },
        { name: 'Cloud & DevOps', description: 'Hands-on with AWS (EC2, S3, Lambda) for deploying and managing applications.', component: <AwsCloud /> },
        { name: 'Linux', description: 'Proficient in Linux environments for development, scripting, and system administration.', component: <LinuxPenguin /> },
        { name: 'Automation', description: 'Experience in automating tasks and workflows using scripting and various tools.', component: <AutomationGear /> },
    ];

    return (
        <section id="skills" className="py-20 px-4 md:px-10">
            <h2 className="text-4xl font-bold text-center text-white mb-12">My Tech Arsenal</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {skills.map(skill => (
                    <Card key={skill.name}>
                        <CardHeader>
                            <CardTitle>{skill.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 mb-4 rounded-lg overflow-hidden bg-black/50 top-20">
                                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                    <ambientLight intensity={0.8} />
                                    <directionalLight position={[5, 5, 5]} />
                                    <Suspense fallback={null}>
                                        {skill.component}
                                    </Suspense>
                                    <OrbitControls enableZoom={false} enablePan={false} />
                                </Canvas>
                            </div>
                            <p>{skill.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

const ProjectsSection = () => {
    const projects = [
        {
            key: 1,
            title: "Geolocation Based Attendance Tracking App",
            link: "https://geonavi.venoms.app",
            description: "A modern replacement for traditional biometric systems, using geofencing and random interval face verification to ensure authentic, on-site employee attendance.",
            tags: ["FastAPI", "TypeScript", "MongoDB", "Geofencing", "Face Verification"],
            img: geonaviImg
        },
        {
            key: 2,
            title: "Pathfinder Game with Q-Learning",
            link: "https://github.com/Venom120/pathfinderML",
            description: "A grid-based game where agents learn to navigate to a goal while avoiding obstacles, implemented using Q-learning reinforcement learning techniques.",
            tags: ["Python", "Pygame", "Reinforcement Learning", "Q-Learning"],
            img: pathfinderImg
        },
        {
            key: 3,
            title: "BG Clicker",
            link: "https://github.com/Venom120/bgclicker",
            description: "A simple Python application with a GUI for performing background mouse clicks and keyboard inputs.",
            tags: ["Python", "Tkinter", "xdotool", "Shell Scripting", "Linux"],
            img: bgclickerImg
        },
        {
            key: 4,
            title: "Scriveners Website",
            link: "https://scriveners.venoms.app",
            description: "A full-stack web application for a literary club, featuring a FastAPI backend, React frontend, and deployed on Oracle Cloud with Nginx and Git hooks for CI/CD.",
            tags: ["Python", "FastAPI", "React", "MongoDB", "Oracle Cloud", "Nginx"],
            img: scrivenersImg
        },
        {
            key: 5,
            title: "CCTV Surveillance System",
            link: "https://github.com/Venom120/MIP",
            description: "A system to assist police in finding missing persons by analyzing CCTV footage. Includes a dashboard for civilians and officers to manage and track FIRs.",
            tags: ["Python", "OpenCV", "MongoDB", "Computer Vision"],
            img: faceSurveillanceImg
        },
        {
            key: 6,
            title: "Google Form to Whatsapp Group",
            link: "https://github.com/Venom120/Number-Whatsapp_grp",
            description: "A Python script to automatically add numbers from google form to any whatsapp group",
            tags: ["Python", "Pydrive", "Selenium", "PyAutoGUI"],
            img: whatsappImg
        },
    ];

    return (
        <section id="projects" className="py-20 px-4 md:px-10">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Projects Showcase</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projects.map(project => (
                    <a href={project.link}>
                        <Card key={project.key}>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                            </CardHeader>
                            <img src={project.img} className='h-64 mb-4 rounded-lg overflow-hidden mx-auto block' alt={project.title}></img>
                            <CardContent>
                                <p className="mb-4">{project.description}</p>
                                <div className="flex flex-wrap">
                                    {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>
        </section>
    );
};

const AchievementsSection = () => {
    const achievements = [
        "Winner of Gyan Ganga Summer of Code 2024.",
        "Attended IDE Bootcamp Phase 3, 2024 by AICTE & MOE at Dehradun.",
        "CodeChef Rating: 1512",
        "CodeForces Rating: 935",
        "LeetCode Rating: 1607"
    ];

    return (
        <section id="achievements" className="py-20 px-4 md:px-10">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Achievements & Milestones</h2>
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            {achievements.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};


const ContactSection = () => {
    return (
        <section id="contact" className="py-20 px-4 md:px-10 text-center">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Get In Touch</h2>
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent>
                        <p className="text-lg mb-8">
                            I'm actively looking for new opportunities and collaborations. Feel free to reach out if you think my skills are a good fit, or if you just want to connect!
                        </p>
                        <div className="flex justify-center items-center space-x-6 text-3xl">
                            <a href="https://www.linkedin.com/in/yatharth-jain-8039b4248/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/Venom120" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="mailto:yatharth3194@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <i className="fas fa-envelope"></i>
                            </a>
                            <a href="https://venoms.app/resources/public/Yatharth_resume.pdf" title="Download Resume" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <i className="fas fa-file-pdf"></i>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)"); // Tailwind's 'md' breakpoint is 768px

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["about", "skills", "projects", "achievements", "contact"];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white">YJ</a>
                {isMobile ? (
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm flex flex-col items-center py-4 space-y-4">
                                {navLinks.map(link => (
                                    <a key={link} href={`#${link}`} onClick={() => setIsMenuOpen(false)} className="capitalize text-gray-300 hover:text-cyan-400 transition-colors text-lg">
                                        {link}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link}`} className="capitalize text-gray-300 hover:text-cyan-400 transition-colors">{link}</a>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}

const Footer = () => {
    return (
        <footer className="py-6 text-center text-gray-400 border-t border-cyan-900/50">
            <p>&copy; {new Date().getFullYear()} Yatharth Jain. Built with React, Three.js & lots of ☕.</p>
        </footer>
    );
};


export default function App() {
    return (
        <div className="bg-gray-900 text-white font-sans leading-normal tracking-tight bg-gradient-to-br from-gray-900 to-black">
            <style>{`
                @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
                html { scroll-behavior: smooth; }
            `}</style>

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

