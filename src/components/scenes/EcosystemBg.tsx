import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Ecosystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  const { orbits, orbitNodes } = useMemo(() => {
    const o = [1.2, 1.9, 2.6];
    const n: { pos: THREE.Vector3; orbit: number }[] = [];
    o.forEach((r, oi) => {
      const count = 3 + oi;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        n.push({ pos: new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0), orbit: oi });
      }
    });
    return { orbits: o, orbitNodes: n };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
      groupRef.current.rotation.y = t * 0.03;
    }
    ringsRef.current.forEach((r, i) => {
      if (!r) return;
      r.rotation.z = t * (0.08 - i * 0.02);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshStandardMaterial color="#0d9488" emissive="#2dd4bf" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>

      {/* Orbital rings */}
      {orbits.map((r, i) => (
        <mesh key={i} ref={(el) => { if (el) ringsRef.current[i] = el; }} rotation={[Math.PI / 2 + i * 0.3, i * 0.2, 0]}>
          <torusGeometry args={[r, 0.008, 8, 80]} />
          <meshStandardMaterial color="#2dd4bf" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Orbit nodes */}
      {orbitNodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color="#134e4a" emissive="#2dd4bf" emissiveIntensity={0.15} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

const EcosystemBg = () => (
  <div className="absolute inset-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.04} />
        <pointLight position={[3, 3, 4]} intensity={0.15} color="#2dd4bf" />
        <Ecosystem />
      </Suspense>
    </Canvas>
  </div>
);

export default EcosystemBg;
