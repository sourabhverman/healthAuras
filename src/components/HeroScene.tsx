import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const { spheres, connections, particles } = useMemo(() => {
    const s: { pos: [number, number, number]; color: string }[] = [];
    const c: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const steps = 40;
    const radius = 1.2;
    const height = 8;

    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const y = t * height - height / 2;
      const angle = t * Math.PI * 4;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      s.push({ pos: [x1, y, z1], color: "#34d399" });
      s.push({ pos: [x2, y, z2], color: "#06b6d4" });

      if (i % 3 === 0) {
        c.push({ start: [x1, y, z1], end: [x2, y, z2] });
      }
    }

    // Floating particles
    const pCount = 200;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 8;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    return { spheres: s, connections: c, particles: pPositions };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
    }
  });

  const connectionGeometries = useMemo(() => {
    return connections.map((c) => {
      const points = [new THREE.Vector3(...c.start), new THREE.Vector3(...c.end)];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [connections]);

  const particleGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  return (
    <>
      <group ref={groupRef}>
        {spheres.map((s, i) => (
          <mesh key={i} position={s.pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.5}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        ))}
        {connectionGeometries.map((geo, i) => (
          <line key={`c-${i}`} geometry={geo}>
            <lineBasicMaterial color="#34d399" transparent opacity={0.3} />
          </line>
        ))}
        {/* Glow tube along each strand */}
        {spheres.filter((_, i) => i % 2 === 0).map((s, i, arr) => {
          if (i === arr.length - 1) return null;
          const next = arr[i + 1];
          const mid: [number, number, number] = [
            (s.pos[0] + next.pos[0]) / 2,
            (s.pos[1] + next.pos[1]) / 2,
            (s.pos[2] + next.pos[2]) / 2,
          ];
          return (
            <mesh key={`g-${i}`} position={mid}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1} transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial color="#34d399" size={0.03} transparent opacity={0.4} sizeAttenuation />
      </points>
    </>
  );
};

const HeroScene = () => (
  <div className="w-full h-[500px] md:h-[600px]">
    <Canvas camera={{ position: [3, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#34d399" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06b6d4" />
        <pointLight position={[0, 0, 5]} intensity={0.3} color="#10b981" />
        <DNAHelix />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
