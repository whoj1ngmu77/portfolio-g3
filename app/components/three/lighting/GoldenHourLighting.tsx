"use client";

export default function GoldenHourLighting() {
  return (
    <>
      {/* Sky ambient — cool lavender */}
      <ambientLight color={0xc4b0e8} intensity={0.4} />

      {/* Sun — warm peach directional from upper right */}
      <directionalLight
        color={0xf2a97e}
        intensity={1.2}
        position={[8, 6, 4]}
        castShadow={false}
      />

      {/* City window glow — brass point lights */}
      <pointLight
        color={0xd4a843}
        intensity={0.9}
        position={[1.5, 0.8, 0]}
        distance={6}
        decay={2}
      />
      <pointLight
        color={0xd4a843}
        intensity={0.7}
        position={[-1.5, 0.5, -1]}
        distance={5}
        decay={2}
      />
      <pointLight
        color={0xff8c42}
        intensity={0.5}
        position={[0, -0.5, 2]}
        distance={4}
        decay={2}
      />

      {/* Sky / ground hemisphere */}
      <hemisphereLight
        args={[0x2d1b69, 0xd4a843, 0.35]}
      />
    </>
  );
}