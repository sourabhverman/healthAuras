import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const SignalWaves = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      const scale = 1 + ((t * 0.3 + i * 0.25) % 2);
      ring.scale.set(scale, scale, scale);
      (ring.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.4 - ((t * 0.3 + i * 0.25) % 2) * 0.2);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central node - represents the AI receptionist */}
      <mesh>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#0e7490" emissive="#0e7490" emissiveIntensity={0.4} />
      </mesh>
      {/* Signal rings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} ref={(el) => { if (el) ringsRef.current[i] = el; }} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.01, 8, 64]} />
          <meshStandardMaterial color="#2dd4bf" transparent opacity={0.3} />
        </mesh>
      ))}
      {/* Connection dots - patients */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh key={`d-${i}`} position={[Math.cos(angle) * 1.8, Math.sin(angle) * 1.2, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color="#5eead4" emissive="#5eead4" emissiveIntensity={0.2} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

const ReceptionistScene = () => (
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.08} />
        <pointLight position={[2, 2, 3]} intensity={0.3} color="#2dd4bf" />
        <SignalWaves />
      </Suspense>
    </Canvas>
  </div>
);

export default ReceptionistScene;
