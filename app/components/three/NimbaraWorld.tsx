"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import FloatingIsland from "./scene/FloatingIsland";
import CloudLayer from "./scene/CloudLayer";
import CityBuildings from "./scene/CityBuildings";
import ParticleField from "./scene/ParticleField";
import GoldenHourLighting from "./lighting/GoldenHourLighting";
import AtmosphericFog from "./environment/AtmosphericFog";
import CameraController from "./camera/CameraController";
import { useNimbaraStore } from "@/app/store/nimbaraStore";

interface NimbaraWorldProps {
  scrollY: number;
}

function SceneFallback() {
  return null;
}

export default function NimbaraWorld({ scrollY }: NimbaraWorldProps) {
  const deviceCapability = useNimbaraStore((s) => s.deviceCapability);
  const reducedMotion = useNimbaraStore((s) => s.reducedMotion);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Low capability or reduced motion → do not mount canvas at all
  if (deviceCapability === "low" || reducedMotion) {
    return null;
  }

  const dpr: [number, number] =
    deviceCapability === "medium" ? [1, 1.5] : [1, 2];

  return (
    <div
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={dpr}
        camera={{
          position: [0, 2.5, 9],
          fov: 55,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: deviceCapability === "high",
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={<SceneFallback />}>
          <AtmosphericFog />
          <GoldenHourLighting />
          <FloatingIsland />
          <CityBuildings capability={deviceCapability} />
          <CloudLayer capability={deviceCapability} />
          <ParticleField capability={deviceCapability} />
          <CameraController scrollY={scrollY} />
        </Suspense>
      </Canvas>
    </div>
  );
}