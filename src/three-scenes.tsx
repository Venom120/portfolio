import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [query]);
  return matches;
};

/** Generic slow-rotation helper for a ref'd group (per-frame increments). */
const useIdleRotation = (
  ref: React.RefObject<THREE.Object3D>,
  speedY = 0.005,
  speedX = 0
) => {
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += speedY;
    if (speedX) ref.current.rotation.x += speedX;
  });
};

// --- 3D Components (original colors restored) ---

const RotatingRobotHead = () => {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.005;
  });
  return (
    <Float speed={2} floatIntensity={1}>
      <group ref={groupRef} scale={1.5} position={[0, -1, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#61DBFB" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.4, 0.8, 0.7]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.4, 0.8, 0.7]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
        </mesh>
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
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0.4, 0.6]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
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
        <mesh position={[0, 1.15, 0.7]}>
          <coneGeometry args={[0.2, 0.4, 4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[-0.3, -0.2, 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position={[0.3, -0.2, 0.4]}>
          <boxGeometry args={[0.4, 0.1, 0.4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
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

interface SnakeBodyProps {
  path: THREE.Curve<THREE.Vector3>;
  color: string;
}
const SnakeBody = ({ path, color }: SnakeBodyProps) => {
  const geometry = useMemo(() => new THREE.TubeGeometry(path, 100, 0.15, 12, false), [path]);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
    </mesh>
  );
};

const PythonLogo = () => {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current)
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
  });
  const { bluePath, yellowPath, blueHeadPos, yellowHeadPos } = useMemo(() => {
    const bluePoints = [
      new THREE.Vector3(-0.65, 0.5, 0),
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(0.65, 0.5, 0),
      new THREE.Vector3(0.5, -0.3, 0),
    ];
    const yellowPoints = [
      new THREE.Vector3(0.65, -0.5, 0),
      new THREE.Vector3(0, -0.8, 0),
      new THREE.Vector3(-0.65, -0.5, 0),
      new THREE.Vector3(-0.5, 0.3, 0),
    ];
    return {
      bluePath: new THREE.CatmullRomCurve3(bluePoints),
      yellowPath: new THREE.CatmullRomCurve3(yellowPoints),
      blueHeadPos: bluePoints[0],
      yellowHeadPos: yellowPoints[0],
    };
  }, []);
  const headRadius = 0.22;
  const eyeRadius = 0.08;
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <group ref={groupRef} scale={2.5} position={[0, 0, 0]}>
        <group>
          <SnakeBody path={bluePath} color="#3776AB" />
          <mesh position={blueHeadPos}>
            <sphereGeometry args={[headRadius, 32, 32]} />
            <meshStandardMaterial color="#3776AB" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[blueHeadPos.x, blueHeadPos.y + 0.06, headRadius * 0.8]}>
            <sphereGeometry args={[eyeRadius, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
          </mesh>
        </group>
        <group>
          <SnakeBody path={yellowPath} color="#FFD43B" />
          <mesh position={yellowHeadPos}>
            <sphereGeometry args={[headRadius, 32, 32]} />
            <meshStandardMaterial color="#FFD43B" metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[yellowHeadPos.x, yellowHeadPos.y - 0.06, headRadius * 0.8]}>
            <sphereGeometry args={[eyeRadius, 16, 16]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const GEAR_TEETH = 8;
const AutomationGear = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useIdleRotation(meshRef, 0.01, 0.005);
  const teeth = useMemo(
    () =>
      Array.from({ length: GEAR_TEETH }, (_, i) => {
        const angle = (i * Math.PI) / 4;
        return {
          position: [Math.sin(angle) * 0.9, Math.cos(angle) * 0.9, 0] as [
            number,
            number,
            number
          ],
          rotationZ: i * Math.PI / 4,
        };
      }),
    []
  );
  return (
    <Float speed={2} floatIntensity={1}>
      <mesh ref={meshRef} scale={2} position={[0, 0.05, 0]}>
        <torusGeometry args={[0.8, 0.2, 16, 100]} />
        <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
        </mesh>
        {teeth.map((tooth, i) => (
          <mesh key={i} position={tooth.position} rotation-z={tooth.rotationZ}>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial color="#d1d1e0" metalness={0.7} roughness={0.5} />
          </mesh>
        ))}
      </mesh>
    </Float>
  );
};

interface ParticleData {
  time: number;
  factor: number;
  speed: number;
  x: number;
  y: number;
  z: number;
}

const Particle = ({ time, factor, speed, x, y, z }: ParticleData) => {
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
      <meshStandardMaterial color="#61DBFB" emissive="white" emissiveIntensity={0.2} />
    </mesh>
  );
};

const WebDevDataFlow = () => {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: 200 }, () => ({
      time: Math.random() * 100,
      factor: 20 + Math.random() * 100,
      speed: 0.01 + Math.random() / 200,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10,
    }));
  }, []);
  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
      <Text color="white" fontSize={0.8} position={[0, 3, 0]}>
        API
      </Text>
      <Text color="white" fontSize={0.8} position={[4, -3, 0]}>
        Client
      </Text>
      <Text color="white" fontSize={0.8} position={[-4, -3, 0]}>
        Server
      </Text>
    </group>
  );
};

interface AwsNode {
  position: [number, number, number];
  text: string;
}
const AWS_NODES: AwsNode[] = [
  { position: [0, 0, 0], text: "EC2" },
  { position: [3, 1, 0], text: "S3" },
  { position: [-3, -1, 0], text: "Lambda" },
  { position: [1, -2, 1], text: "RDS" },
  { position: [-1, 2, -1], text: "VPC" },
];
const AwsCloud = () => (
  <group>
    {AWS_NODES.map((node, i) => (
      <Float key={i} speed={3} floatIntensity={0.5}>
        <Sphere position={node.position} args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#FF9900" metalness={0.7} roughness={0.3} />
        </Sphere>
        <Text
          color="white"
          fontSize={0.4}
          position={[node.position[0], node.position[1] + 0.7, node.position[2]]}
        >
          {node.text}
        </Text>
      </Float>
    ))}
  </group>
);

// Shared stage for skill-card canvases: consistent lighting + framing.
const Stage = ({ children }: { children: React.ReactNode }) => (
  <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 5, 5]} intensity={1} />
    <Suspense fallback={null}>{children}</Suspense>
  </Canvas>
);

const SkillCanvas = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-52 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent">
    <Stage>{children}</Stage>
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent/90">
    {children}
  </span>
);

export {
  useMediaQuery,
  RotatingRobotHead,
  PythonLogo,
  LinuxPenguin,
  WebDevDataFlow,
  AwsCloud,
  AutomationGear,
  SkillCanvas,
  Badge,
};
