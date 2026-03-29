import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Heart = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Heart shape using parametric equation
  const heartNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    const layers = 20;
    const pointsPerLayer = 20;

    for (let l = 0; l < layers; l++) {
      const v = (l / layers) * Math.PI;
      for (let p = 0; p < pointsPerLayer; p++) {
        const u = (p / pointsPerLayer) * Math.PI * 2;
        const scale = 0.07;

        // Heart parametric surface
        const x = scale * 16 * Math.pow(Math.sin(u), 3) * Math.sin(v);
        const y = scale * (13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u)) * Math.sin(v);
        const z = scale * 16 * Math.pow(Math.sin(u), 3) * Math.cos(v) * 0.3;

        if (Math.random() > 0.4) {
          nodes.push([x, y, z]);
        }
      }
    }
    return nodes;
  }, []);

  // Arteries/veins
  const vessels = useMemo(() => {
    const lines: THREE.Line[] = [];
    for (let i = 0; i < heartNodes.length; i++) {
      for (let j = i + 1; j < heartNodes.length; j++) {
        const dist = Math.sqrt(
          (heartNodes[i][0] - heartNodes[j][0]) ** 2 +
          (heartNodes[i][1] - heartNodes[j][1]) ** 2 +
          (heartNodes[i][2] - heartNodes[j][2]) ** 2
        );
        if (dist < 0.25 && Math.random() > 0.7) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...heartNodes[i]),
            new THREE.Vector3(...heartNodes[j]),
          ]);
          lines.push(
            new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#f87171", transparent: true, opacity: 0.12 }))
          );
        }
      }
    }
    return lines;
  }, [heartNodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15;

    // Heartbeat scale pulse
    const beat = 1 + Math.pow(Math.sin(t * 2.5), 20) * 0.08;
    groupRef.current.scale.setScalar(beat);
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {heartNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Aorta top */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.5, 12]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>

      {/* Pulse glow */}
      <PulseGlow />

      {vessels.map((v, i) => (
        <primitive key={`v-${i}`} object={v} />
      ))}
    </group>
  );
};

const PulseGlow = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pulse = Math.pow(Math.sin(t * 2.5), 20);
    (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.1 + pulse * 0.2;
    const s = 1.5 + pulse * 0.3;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={[0, 0.3, 0]}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} transparent opacity={0.1} />
    </mesh>
  );
};

const ClientsScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#ef4444" />
        <pointLight position={[-3, -1, -3]} intensity={0.4} color="#f87171" />
        <Heart />
      </Suspense>
    </Canvas>
  </div>
);

export default ClientsScene;
