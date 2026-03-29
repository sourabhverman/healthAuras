import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const HeartbeatWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const points = 200;
    const positions = new Float32Array(points * 3);
    const width = 10;

    for (let i = 0; i < points; i++) {
      const t = i / points;
      positions[i * 3] = t * width - width / 2;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!geometry) return;
    const pos = geometry.attributes.position;
    const t = state.clock.elapsedTime;
    const points = pos.count;

    for (let i = 0; i < points; i++) {
      const x = pos.getX(i);
      const normalizedX = (x + 5) / 10;

      // ECG-style heartbeat pattern
      const phase = (normalizedX * 4 + t * 1.5) % 1;
      let y = 0;

      if (phase > 0.35 && phase < 0.4) y = -0.3;
      else if (phase > 0.4 && phase < 0.45) y = 1.2;
      else if (phase > 0.45 && phase < 0.5) y = -0.5;
      else if (phase > 0.5 && phase < 0.55) y = 0.3;
      else y = Math.sin(phase * Math.PI * 2) * 0.02;

      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  const glowSpheres = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 8; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  return (
    <group>
      <primitive
        object={
          new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: "#34d399", linewidth: 2 })
          )
        }
      />
      {/* Pulse glow points along the wave */}
      {glowSpheres.map((i) => (
        <PulsePoint key={i} index={i} />
      ))}
    </group>
  );
};

const PulsePoint = ({ index }: { index: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const x = ((index / 8) * 10 - 5 + t * 1.5) % 10 - 5;
    const phase = ((x + 5) / 10 * 4) % 1;
    let y = 0;
    if (phase > 0.4 && phase < 0.45) y = 1.2;
    else if (phase > 0.45 && phase < 0.5) y = -0.5;
    ref.current.position.set(x, y, 0);
    const scale = 0.8 + Math.sin(t * 3 + index) * 0.3;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1.5} transparent opacity={0.7} />
    </mesh>
  );
};

const ClientsScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#34d399" />
        <pointLight position={[-5, 0, 3]} intensity={0.3} color="#06b6d4" />
        <HeartbeatWave />
      </Suspense>
    </Canvas>
  </div>
);

export default ClientsScene;
