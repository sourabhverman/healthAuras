import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// Gaussian-bump heartbeat: lub at phase 0, smaller dub at phase 0.32  (70 bpm)
function heartbeat(t: number): number {
  const period = 60 / 70;
  const phase  = (t % period) / period;
  const lub = Math.exp(-Math.pow((phase - 0.0) * 18, 2))
            + Math.exp(-Math.pow((phase - 1.0) * 18, 2));
  const dub = Math.exp(-Math.pow((phase - 0.32) * 24, 2)) * 0.58;
  return Math.min(lub + dub, 1);
}

const Heart = () => {
  const groupRef   = useRef<THREE.Group>(null);
  const innerGlow  = useRef<THREE.Mesh>(null);
  const outerGlow  = useRef<THREE.Mesh>(null);
  const aortaRef   = useRef<THREE.Mesh>(null);
  const nodeMeshes = useRef<THREE.Mesh[]>([]);

  // Heart surface nodes via parametric equation
  const heartNodes = useMemo(() => {
    const nodes: { pos: [number, number, number]; zone: number }[] = [];
    for (let l = 0; l < 30; l++) {
      const v = (l / 30) * Math.PI;
      for (let p = 0; p < 26; p++) {
        const u  = (p / 26) * Math.PI * 2;
        const sc = 0.086;
        const x  =  sc * 16 * Math.pow(Math.sin(u), 3) * Math.sin(v);
        const y  =  sc * (13 * Math.cos(u) - 5 * Math.cos(2 * u)
                        - 2  * Math.cos(3 * u) - Math.cos(4 * u)) * Math.sin(v);
        const z  =  sc * 16 * Math.pow(Math.sin(u), 3) * Math.cos(v) * 0.42;
        if (Math.random() > 0.32) {
          const zone = y > 0.50 ? 2 : (x > 0 ? 0 : 1);
          nodes.push({ pos: [x, y, z], zone });
        }
      }
    }
    return nodes;
  }, []);

  // Coronary vessel network (denser)
  const vessels = useMemo(() => {
    const lines: THREE.Line[] = [];
    for (let i = 0; i < heartNodes.length; i++) {
      for (let j = i + 1; j < heartNodes.length; j++) {
        const d = Math.hypot(
          heartNodes[i].pos[0] - heartNodes[j].pos[0],
          heartNodes[i].pos[1] - heartNodes[j].pos[1],
          heartNodes[i].pos[2] - heartNodes[j].pos[2]
        );
        if (d < 0.20 && Math.random() > 0.74) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...heartNodes[i].pos),
            new THREE.Vector3(...heartNodes[j].pos),
          ]);
          lines.push(new THREE.Line(geo,
            new THREE.LineBasicMaterial({ color: "#fdba74", transparent: true, opacity: 0.12 })
          ));
        }
      }
    }
    return lines;
  }, [heartNodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const b = heartbeat(t);

    groupRef.current.rotation.y = t * 0.11;

    // Systolic squeeze: compress X/Z, elongate Y
    groupRef.current.scale.set(1 - b * 0.058, 1 + b * 0.032, 1 - b * 0.054);

    if (innerGlow.current) {
      (innerGlow.current.material as THREE.MeshStandardMaterial).opacity = 0.05 + b * 0.30;
      innerGlow.current.scale.setScalar(1.22 + b * 0.48);
    }
    if (outerGlow.current) {
      (outerGlow.current.material as THREE.MeshStandardMaterial).opacity = 0.02 + b * 0.12;
      outerGlow.current.scale.setScalar(1.72 + b * 0.58);
    }
    if (aortaRef.current) {
      (aortaRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.55 + b * 1.3;
    }

    nodeMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const node = heartNodes[i];
      // Zone-specific pulse timing: LV fires first, then RV, then atria
      const phaseOffset = node.zone === 0 ? 0 : node.zone === 1 ? 0.06 : -0.12;
      const intensity = Math.sin((t + phaseOffset) * 1.4 + i * 0.09);
      mat.emissiveIntensity = 0.42 + b * 1.35 + intensity * 0.08;
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.12, 0]}>
      {heartNodes.map((n, i) => {
        const col  = n.zone === 0 ? "#f97316" : n.zone === 1 ? "#fb923c" : "#fed7aa";
        const ecol = n.zone === 0 ? "#ea580c" : n.zone === 1 ? "#f97316" : "#fb923c";
        return (
          <mesh key={i} position={n.pos}
            ref={(el) => { if (el) nodeMeshes.current[i] = el; }}>
            <sphereGeometry args={[0.034, 8, 8]} />
            <meshStandardMaterial
              color={col} emissive={ecol}
              emissiveIntensity={0.45} transparent opacity={0.80}
              roughness={0.26} metalness={0.20}
            />
          </mesh>
        );
      })}

      {/* Aortic arch */}
      <mesh ref={aortaRef} position={[0.11, 1.15, 0]} rotation={[0, 0, -0.28]}>
        <cylinderGeometry args={[0.068, 0.125, 0.50, 14]} />
        <meshStandardMaterial color="#fb923c" emissive="#fb923c"
          emissiveIntensity={0.62} transparent opacity={0.56} roughness={0.38} />
      </mesh>

      {/* Pulmonary trunk */}
      <mesh position={[-0.16, 1.02, 0.08]} rotation={[0.18, 0, 0.42]}>
        <cylinderGeometry args={[0.048, 0.082, 0.40, 12]} />
        <meshStandardMaterial color="#fdba74" emissive="#fdba74"
          emissiveIntensity={0.52} transparent opacity={0.48} roughness={0.38} />
      </mesh>

      {vessels.map((v, i) => <primitive key={`v-${i}`} object={v} />)}

      {/* Inner glow */}
      <mesh ref={innerGlow} position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.80, 16, 16]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316"
          emissiveIntensity={1} transparent opacity={0.05}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {/* Outer halo */}
      <mesh ref={outerGlow} position={[0, 0.06, 0]}>
        <sphereGeometry args={[1.10, 16, 16]} />
        <meshStandardMaterial color="#ea580c" emissive="#ea580c"
          emissiveIntensity={1} transparent opacity={0.02}
          side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </group>
  );
};

const ClientsScene = () => (
  <div className="w-full h-[300px]">
    <Canvas
      camera={{ position: [0, 0.2, 4], fov: 44 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.06} />
        <pointLight position={[3, 3, 3]}   intensity={1.5} color="#f97316" />
        <pointLight position={[-3, 1, -3]} intensity={0.65} color="#fb923c" />
        <pointLight position={[0, -3, 2]}  intensity={0.35} color="#ea580c" />
        <pointLight position={[2, 0, 4]}   intensity={0.30} color="#fed7aa" />
        <Heart />
      </Suspense>
    </Canvas>
  </div>
);

export default ClientsScene;
