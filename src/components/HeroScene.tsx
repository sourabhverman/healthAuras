import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

// Base-pair type: A-T = cyan family, G-C = emerald family (alternating)
const PAIR_COLORS: [string, string][] = [
  ["#34d399", "#22d3ee"],  // A-T: strand1=emerald, strand2=cyan
  ["#10b981", "#06b6d4"],  // G-C: strand1=dark-emerald, strand2=dark-cyan
];

const DNAHelix = () => {
  const helixGroup = useRef<THREE.Group>(null);
  const cloudRef   = useRef<THREE.Points>(null);
  const strand1    = useRef<THREE.Mesh[]>([]);
  const strand2    = useRef<THREE.Mesh[]>([]);
  const bridgeMats = useRef<THREE.LineBasicMaterial[]>([]);

  const STEPS   = 60;
  const RADIUS  = 1.15;
  const HEIGHT  = 9.0;
  const TURNS   = 2.2;   // full twists of the helix

  const { spheres, bridgeGeos, particlePositions } = useMemo(() => {
    const s: { pos1: [number,number,number]; pos2: [number,number,number]; pair: number }[] = [];
    const bg: THREE.BufferGeometry[] = [];

    for (let i = 0; i < STEPS; i++) {
      const t     = i / STEPS;
      const y     = t * HEIGHT - HEIGHT / 2;
      const angle = t * Math.PI * 2 * TURNS;

      const x1 =  Math.cos(angle) * RADIUS;
      const z1 =  Math.sin(angle) * RADIUS;
      const x2 = -Math.cos(angle) * RADIUS;   // opposite strand
      const z2 = -Math.sin(angle) * RADIUS;

      const pair = i % 2;
      s.push({ pos1: [x1, y, z1], pos2: [x2, y, z2], pair });

      // Every 3 steps: a cross-bridge (base pair)
      if (i % 3 === 0) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x1, y, z1),
          new THREE.Vector3(x2, y, z2),
        ]);
        bg.push(geo);
      }
    }

    // Floating particle cloud
    const pCount = 250;
    const pp = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pp[i*3]   = (Math.random() - 0.5) * 7;
      pp[i*3+1] = (Math.random() - 0.5) * 10;
      pp[i*3+2] = (Math.random() - 0.5) * 7;
    }

    return { spheres: s, bridgeGeos: bg, particlePositions: pp };
  }, []);

  const bridgeLines = useMemo(() => {
    return bridgeGeos.map((geo, i) => {
      const mat = new THREE.LineBasicMaterial({ color: "#34d399", transparent: true, opacity: 0.22 });
      bridgeMats.current[i] = mat;
      return new THREE.Line(geo, mat);
    });
  }, [bridgeGeos]);

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    return geo;
  }, [particlePositions]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Helix slow rotation
    if (helixGroup.current) {
      helixGroup.current.rotation.y = t * 0.14;
    }
    // Particle cloud counter-rotate
    if (cloudRef.current) {
      cloudRef.current.rotation.y = -t * 0.04;
    }

    // ── Brightness wave traveling up strand 1 ──
    strand1.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat  = mesh.material as THREE.MeshStandardMaterial;
      const norm = i / STEPS;            // 0→1 along helix height
      // Wave: travels upward, period ~2 s
      const wave = Math.sin(norm * Math.PI * 3.5 - t * 2.2) * 0.5 + 0.5;
      mat.emissiveIntensity = 0.35 + wave * 1.0;
      // Subtle color shift: bright nodes go lighter
      (mat.color as THREE.Color).set(wave > 0.7 ? "#6ee7b7" : "#34d399");
    });

    // ── Brightness wave traveling DOWN strand 2 (opposite direction) ──
    strand2.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat  = mesh.material as THREE.MeshStandardMaterial;
      const norm = i / STEPS;
      const wave = Math.sin(norm * Math.PI * 3.5 + t * 2.2) * 0.5 + 0.5; // reversed
      mat.emissiveIntensity = 0.35 + wave * 1.0;
      (mat.color as THREE.Color).set(wave > 0.7 ? "#67e8f9" : "#22d3ee");
    });

    // ── Bridge opacity pulses with global beat ──
    const bridgePulse = Math.sin(t * 1.6) * 0.5 + 0.5;
    bridgeMats.current.forEach((mat) => {
      if (!mat) return;
      mat.opacity = 0.14 + bridgePulse * 0.18;
    });
  });

  return (
    <>
      <group ref={helixGroup}>
        {spheres.map((sp, i) => {
          const [c1, c2] = PAIR_COLORS[sp.pair];
          return (
            <group key={i}>
              {/* Strand 1 node */}
              <mesh
                position={sp.pos1}
                ref={(el) => { if (el) strand1.current[i] = el; }}
              >
                <sphereGeometry args={[0.09, 14, 14]} />
                <meshStandardMaterial
                  color={c1} emissive={c1}
                  emissiveIntensity={0.5}
                  roughness={0.25} metalness={0.6}
                />
              </mesh>

              {/* Strand 2 node */}
              <mesh
                position={sp.pos2}
                ref={(el) => { if (el) strand2.current[i] = el; }}
              >
                <sphereGeometry args={[0.09, 14, 14]} />
                <meshStandardMaterial
                  color={c2} emissive={c2}
                  emissiveIntensity={0.5}
                  roughness={0.25} metalness={0.6}
                />
              </mesh>
            </group>
          );
        })}

        {/* Backbone: small filler nodes between consecutive strand-1 nodes */}
        {spheres.slice(0, -1).map((sp, i) => {
          const next = spheres[i + 1];
          const mid1: [number,number,number] = [
            (sp.pos1[0] + next.pos1[0]) / 2,
            (sp.pos1[1] + next.pos1[1]) / 2,
            (sp.pos1[2] + next.pos1[2]) / 2,
          ];
          const mid2: [number,number,number] = [
            (sp.pos2[0] + next.pos2[0]) / 2,
            (sp.pos2[1] + next.pos2[1]) / 2,
            (sp.pos2[2] + next.pos2[2]) / 2,
          ];
          return (
            <group key={`bb-${i}`}>
              <mesh position={mid1}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial color="#34d399" emissive="#34d399"
                  emissiveIntensity={0.7} transparent opacity={0.55} />
              </mesh>
              <mesh position={mid2}>
                <sphereGeometry args={[0.035, 8, 8]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee"
                  emissiveIntensity={0.7} transparent opacity={0.55} />
              </mesh>
            </group>
          );
        })}

        {/* Base-pair cross bridges */}
        {bridgeLines.map((line, i) => <primitive key={`br-${i}`} object={line} />)}

        {/* Protein/enzyme markers — larger nodes at key positions */}
        {[0.15, 0.38, 0.61, 0.84].map((frac, i) => {
          const idx  = Math.floor(frac * STEPS);
          const sp   = spheres[idx];
          const mid: [number,number,number] = [
            (sp.pos1[0] + sp.pos2[0]) / 2,
            sp.pos1[1],
            (sp.pos1[2] + sp.pos2[2]) / 2,
          ];
          return (
            <mesh key={`prot-${i}`} position={mid}>
              <sphereGeometry args={[0.17, 12, 12]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#f97316" : "#818cf8"}
                emissive={i % 2 === 0 ? "#f97316" : "#818cf8"}
                emissiveIntensity={0.55}
                transparent opacity={0.60}
                roughness={0.2} metalness={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Floating particle cloud */}
      <points ref={cloudRef} geometry={particleGeo}>
        <pointsMaterial
          color="#34d399" size={0.028}
          transparent opacity={0.38} sizeAttenuation
        />
      </points>
    </>
  );
};

const HeroScene = () => (
  <div className="w-full h-[500px] md:h-[600px]">
    <Canvas camera={{ position: [3, 0, 5.5], fov: 48 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.18} />
        <pointLight position={[5,  5, 5]}   intensity={1.1} color="#34d399" />
        <pointLight position={[-5,-5,-5]}   intensity={0.6} color="#22d3ee" />
        <pointLight position={[0,  0, 5]}   intensity={0.4} color="#10b981" />
        <pointLight position={[2, -3, 2]}   intensity={0.3} color="#f97316" />
        <DNAHelix />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.45} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
