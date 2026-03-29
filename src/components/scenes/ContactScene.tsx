import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const SignalRipples = () => {
  const ringsRef = useRef<THREE.Mesh[]>([]);

  const ringCount = 5;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      const phase = (t * 0.4 + i * 0.2) % 1;
      const scale = 0.5 + phase * 3;
      ring.scale.set(scale, scale, scale);
      (ring.material as THREE.MeshStandardMaterial).opacity = (1 - phase) * 0.4;
    });
  });

  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      {Array.from({ length: ringCount }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringsRef.current[i] = el; }}
          position={[0, 0, 0]}
        >
          <torusGeometry args={[1, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={1}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Center pulse */}
      <CenterPulse />
    </group>
  );
};

const CenterPulse = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2} />
    </mesh>
  );
};

const ContactScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#34d399" />
        <pointLight position={[-3, 2, -3]} intensity={0.3} color="#06b6d4" />
        <SignalRipples />
      </Suspense>
    </Canvas>
  </div>
);

export default ContactScene;
