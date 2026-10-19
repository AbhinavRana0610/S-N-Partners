"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { STRIKE_EVENT } from "@/lib/events";

// A judge's gavel built entirely from code (lathe + cylinder geometry), so there is no model file to load.

const GOLD = "#c9a86a";
const HANDLE_END = 2.9; // x of the handle's tip; the strike pivots around this point
const LIFTED = -0.6;
const IDLE = -0.32;

// Small seeded PRNG so the wood grain is identical on every render.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useWoodTexture() {
  return useMemo(() => {
    const random = mulberry32(1997);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#4a2414";
    ctx.fillRect(0, 0, 512, 64);
    // Long, wavy grain lines in lighter and darker tones.
    for (let i = 0; i < 70; i++) {
      const y = random() * 64;
      ctx.strokeStyle = random() > 0.5 ? "rgba(120,62,30,0.45)" : "rgba(30,12,6,0.4)";
      ctx.lineWidth = random() * 2 + 0.5;
      ctx.beginPath();
      for (let x = 0; x <= 512; x += 16) {
        ctx.lineTo(x, y + Math.sin(x / 40 + i) * 2.5);
      }
      ctx.stroke();
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 8;
    return texture;
  }, []);
}

function lathe(profile: [number, number][], segments = 64) {
  return new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    segments,
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t * t;
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);

function GavelRig({ strikeKey }: { strikeKey: number }) {
  const wood = useWoodTexture();
  const pivot = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  // Time since the last strike, accumulated from frame deltas. The canvas clock resets to 0 whenever the
  // frameloop pauses off-screen, so measuring against it made the gavel spin wildly on scrolling back up.
  const elapsed = useRef(0);
  const bob = useRef(0); // never reset, so a strike does not make the float jump
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    elapsed.current = 0; // restart the strike timeline
  }, [strikeKey]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const headGeo = useMemo(
    () =>
      lathe([
        [0, -0.72],
        [0.33, -0.72],
        [0.36, -0.7],
        [0.36, -0.6],
        [0.43, -0.56],
        [0.43, -0.46],
        [0.39, -0.42],
        [0.41, 0],
        [0.39, 0.42],
        [0.43, 0.46],
        [0.43, 0.56],
        [0.36, 0.6],
        [0.36, 0.7],
        [0.33, 0.72],
        [0, 0.72],
      ]),
    [],
  );
  const handleGeo = useMemo(
    () =>
      lathe([
        [0, 0],
        [0.075, 0],
        [0.07, 0.6],
        [0.085, 1.4],
        [0.11, 2.15],
        [0.1, 2.3],
        [0.13, 2.4],
        [0.13, 2.5],
        [0, 2.58],
      ]),
    [],
  );

  const goldMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.22 }),
    [],
  );
  const woodMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: wood,
        roughness: 0.42,
        clearcoat: 0.8,
        clearcoatRoughness: 0.25,
      }),
    [wood],
  );

  useFrame((_, delta) => {
    if (!pivot.current || !tilt.current) return;
    // Cap the step so a long pause (tab hidden, scrolled away) doesn't jump the animation.
    const step = Math.min(delta, 1 / 30);
    elapsed.current += step;
    bob.current += step;
    const t = elapsed.current;

    // Strike timeline: lift, slam onto the block, small rebound, settle into a gentle sway.
    let angle: number;
    if (t < 0.7) angle = THREE.MathUtils.lerp(IDLE, LIFTED, easeOut(t / 0.7));
    else if (t < 0.88) angle = THREE.MathUtils.lerp(LIFTED, 0, easeIn((t - 0.7) / 0.18));
    else if (t < 1.25) angle = -Math.sin(((t - 0.88) / 0.37) * Math.PI) * 0.12;
    else if (t < 2.2) angle = THREE.MathUtils.lerp(0, IDLE, easeOut((t - 1.25) / 0.95));
    else angle = IDLE + Math.sin((t - 2.2) * 1.1) * 0.06;
    pivot.current.rotation.z = angle;

    // Golden shockwave on the sounding block at the moment of impact.
    if (ring.current) {
      const p = clamp01((t - 0.88) / 0.9);
      const visible = t >= 0.88 && p < 1;
      ring.current.visible = visible;
      ring.current.scale.setScalar(0.6 + easeOut(p) * 1.4);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.8;
    }

    // Parallax tilt toward the cursor.
    const k = 1 - Math.pow(0.05, step);
    tilt.current.rotation.y += (0.55 + pointer.current.x * 0.35 - tilt.current.rotation.y) * k;
    tilt.current.rotation.x += (0.06 + pointer.current.y * 0.1 - tilt.current.rotation.x) * k;
    tilt.current.position.y = Math.sin(bob.current * 0.8) * 0.06;
  });

  return (
    <group ref={tilt}>
      <group position={[-0.85, -0.2, 0]}>
        {/* Sounding block */}
        <group position={[0, -0.6, 0]}>
          <mesh material={woodMat}>
            <cylinderGeometry args={[1.05, 1.15, 0.36, 96]} />
          </mesh>
          <mesh material={goldMat} position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.025, 16, 128]} />
          </mesh>
          <mesh ref={ring} position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
            <ringGeometry args={[0.9, 0.96, 96]} />
            <meshBasicMaterial color={GOLD} transparent opacity={0} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Gavel, pivoting around the end of its handle */}
        <group ref={pivot} position={[HANDLE_END, 0, 0]}>
          <group position={[-HANDLE_END, 0, 0]}>
            <mesh geometry={headGeo} material={woodMat} rotation={[Math.PI / 2, 0, 0]} />
            {[-0.51, 0.51].map((z) => (
              <mesh key={z} material={goldMat} position={[0, 0, z]}>
                <torusGeometry args={[0.432, 0.028, 16, 96]} />
              </mesh>
            ))}
            <mesh geometry={handleGeo} material={woodMat} rotation={[0, 0, -Math.PI / 2]} position={[0.32, 0, 0]} />
            <mesh material={goldMat} position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.095, 0.095, 0.12, 48]} />
            </mesh>
            <mesh material={goldMat} position={[2.62, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.112, 0.112, 0.06, 48]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

export default function Gavel3D() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [strikeKey, setStrikeKey] = useState(0);

  useEffect(() => {
    const strike = () => setStrikeKey((k) => k + 1);
    window.addEventListener(STRIKE_EVENT, strike);
    return () => window.removeEventListener(STRIKE_EVENT, strike);
  }, []);

  // Stop rendering frames while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="h-full w-full cursor-pointer"
      onClick={() => setStrikeKey((k) => k + 1)}
      title="Click to call the court to order"
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.2, 9.5], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]} intensity={2.2} />
        <pointLight position={[-4, 2, 3]} intensity={18} color="#e8c98a" />
        <GavelRig strikeKey={strikeKey} />
        <ContactShadows position={[0, -1.0, 0]} opacity={0.55} scale={9} blur={2.6} far={3} />
        {/* Studio reflections built from light panels, so no HDR file has to be downloaded. */}
        <Environment resolution={256}>
          <Lightformer intensity={2} position={[0, 5, -6]} scale={[10, 3, 1]} />
          <Lightformer intensity={1.2} color="#f1d9a6" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer intensity={0.8} position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
