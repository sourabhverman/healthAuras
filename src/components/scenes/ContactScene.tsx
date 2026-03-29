import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Eye = () => {
  const groupRef = useRef<THREE.Group>(null);
  const irisRef = useRef<THREE.Mesh>(null);
  const pupilRef = useRef<THREE.Mesh>(null);

  // Eye surface nodes
  const scleraNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 80; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.0;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.7;
      const z = r * Math.sin(phi) * Math.sin(theta);
      // Only front hemisphere
      if (z > -0.3) {
        nodes.push([x, y, z]);
      }
    }
    return nodes;
  }, []);

  // Blood vessels on sclera
  const vessels = useMemo(() => {
    const lines: THREE.Line[] = [];
    for (let i = 0; i < scleraNodes.length; i++) {
      for (let j = i + 1; j < scleraNodes.length; j++) {
        const dist = Math.sqrt(
          (scleraNodes[i][0] - scleraNodes[j][0]) ** 2 +
          (scleraNodes[i][1] - scleraNodes[j][1]) ** 2 +
          (scleraNodes[i][2] - scleraNodes[j][2]) ** 2
        );
        if (dist < 0.35 && Math.random() > 0.7) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...scleraNodes[i]),
            new THREE.Vector3(...scleraNodes[j]),
          ]);
          lines.push(
            new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#f87171", transparent: true, opacity: 0.08 }))
          );
        }
      }
    }
    return lines;
  }, [scleraNodes]);

  // Iris pattern
  const irisNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.15;
      nodes.push([Math.cos(angle) * r, Math.sin(angle) * r, 1.01]);
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle eye movement (looking around)
    const lookX = Math.sin(t * 0.5) * 0.1;
    const lookY = Math.cos(t * 0.7) * 0.05;
    groupRef.current.rotation.y = lookX;
    groupRef.current.rotation.x = lookY;

    // Pupil dilation
    if (pupilRef.current) {
      const s = 1 + Math.sin(t * 0.3) * 0.15;
      pupilRef.current.scale.setScalar(s);
    }

    // Iris shimmer
    if (irisRef.current) {
      (irisRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Eyeball (sclera) */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f8fafc" transparent opacity={0.15} roughness={0.8} />
      </mesh>

      {/* Sclera detail nodes */}
      {scleraNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshStandardMaterial color="#e2e8f0" emissive="#e2e8f0" emissiveIntensity={0.2} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Iris */}
      <mesh ref={irisRef} position={[0, 0, 0.95]}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Iris detail */}
      {irisNodes.map((pos, i) => (
        <mesh key={`ir-${i}`} position={pos}>
          <sphereGeometry args={[0.015, 4, 4]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Pupil */}
      <mesh ref={pupilRef} position={[0, 0, 1.0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#0f172a" emissive="#000000" side={THREE.DoubleSide} />
      </mesh>

      {/* Pupil highlight */}
      <mesh position={[0.06, 0.06, 1.05]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} side={THREE.DoubleSide} />
      </mesh>

      {/* Vessels */}
      {vessels.map((v, i) => (
        <primitive key={`v-${i}`} object={v} />
      ))}
    </group>
  );
};

const ContactScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[2, 2, 3]} intensity={0.8} color="#34d399" />
        <pointLight position={[-2, -1, 2]} intensity={0.4} color="#06b6d4" />
        <Eye />
      </Suspense>
    </Canvas>
  </div>
);

export default ContactScene;
