import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

const Brain = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create brain shape with two hemispheres and surface folds
  const { leftNodes, rightNodes, folds, synapses } = useMemo(() => {
    const left: [number, number, number][] = [];
    const right: [number, number, number][] = [];
    const f: { pos: [number, number, number]; scale: number }[] = [];
    const s: { start: [number, number, number]; end: [number, number, number] }[] = [];

    // Generate hemisphere nodes
    for (let i = 0; i < 120; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.2 + Math.random() * 0.15;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.85;
      const z = r * Math.sin(phi) * Math.sin(theta);

      if (x > 0.05) {
        left.push([x + 0.15, y, z]);
      } else if (x < -0.05) {
        right.push([x - 0.15, y, z]);
      }
    }

    // Surface folds (sulci)
    for (let i = 0; i < 30; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.25;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.85;
      const z = r * Math.sin(phi) * Math.sin(theta);
      const side = x > 0 ? 0.15 : -0.15;
      f.push({ pos: [x + side, y, z], scale: 0.08 + Math.random() * 0.06 });
    }

    // Synaptic connections (internal lines)
    const allNodes = [...left, ...right];
    for (let i = 0; i < 40; i++) {
      const a = Math.floor(Math.random() * allNodes.length);
      const b = Math.floor(Math.random() * allNodes.length);
      if (a !== b) {
        s.push({ start: allNodes[a], end: allNodes[b] });
      }
    }

    return { leftNodes: left, rightNodes: right, folds: f, synapses: s };
  }, []);

  const synapseLines = useMemo(() => {
    return synapses.map((syn) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...syn.start),
        new THREE.Vector3(...syn.end),
      ]);
      return new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.08 })
      );
    });
  }, [synapses]);

  const pulseRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;

    // Pulse synaptic nodes
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.elapsedTime;
      const s = 1 + Math.sin(t * 2 + i * 0.8) * 0.3;
      mesh.scale.setScalar(s);
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 3 + i) * 0.5;
    });
  });

  const allNodes = [...leftNodes, ...rightNodes];

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Brain hemispheres */}
      {allNodes.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) pulseRefs.current[i] = el; }}
          position={pos}
        >
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Surface folds */}
      {folds.map((fold, i) => (
        <mesh key={`f-${i}`} position={fold.pos}>
          <sphereGeometry args={[fold.scale, 6, 6]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Central fissure */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 2.2, 8]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1} transparent opacity={0.3} />
      </mesh>

      {/* Brain stem */}
      <mesh position={[0, -1.1, 0.2]}>
        <cylinderGeometry args={[0.12, 0.08, 0.6, 12]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>

      {/* Synapse lines */}
      {synapseLines.map((line, i) => (
        <primitive key={`s-${i}`} object={line} />
      ))}
    </group>
  );
};

const AboutScene = () => (
  <div className="w-full h-[300px]">
    <Canvas camera={{ position: [0, 0.5, 3.5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 3]} intensity={0.8} color="#34d399" />
        <pointLight position={[-3, -1, -3]} intensity={0.4} color="#06b6d4" />
        <Brain />
      </Suspense>
    </Canvas>
  </div>
);

export default AboutScene;
