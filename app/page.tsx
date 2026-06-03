"use client";

import CityNav from "@/app/components/layout/CityNav";
import CityStatusBar from "@/app/components/layout/CityStatusBar";
import CityMap from "@/app/components/layout/CityMap";
import StarField from "@/app/components/ui/StarField";
import SunriseAtmosphere from "@/app/components/ui/SunriseAtmosphere";
import DistrictTransition from "@/app/components/ui/DistrictTransition";
import AchievementToast from "@/app/components/ui/AchievementToast";
import PixelCompanion from "@/app/components/ui/PixelCompanion";
import RecruiterPanel from "@/app/components/ui/RecruiterPanel";
import ArrivalGate from "@/app/components/sections/ArrivalGate";
import InnovationDistrict from "@/app/components/sections/InnovationDistrict";
import SkillsGarden from "@/app/components/sections/SkillsGarden";
import GuildHall from "@/app/components/sections/GuildHall";
import TheAcademy from "@/app/components/sections/TheAcademy";
import VisionTower from "@/app/components/sections/VisionTower";
import StudioDistrict from "@/app/components/sections/StudioDistrict";
import TheBeacon from "@/app/components/sections/TheBeacon";
import { useDeviceCapability } from "@/app/hooks/useDeviceCapability";
import { useScrollProgress } from "@/app/hooks/useScrollProgress";
import { useAchievements } from "@/app/hooks/useAchievements";

function NimbaraInitializer() {
  useDeviceCapability();
  useScrollProgress();
  useAchievements();
  return null;
}

export default function Home() {
  return (
    <>
      <NimbaraInitializer />

      <StarField />
      <SunriseAtmosphere />
      <CityStatusBar />
      <CityNav />
      <CityMap />
      <PixelCompanion />
      <AchievementToast />
      <RecruiterPanel />

      <main id="main-content" tabIndex={-1} style={{ paddingTop: 28 }}>
        <ArrivalGate />

        <DistrictTransition
          fromDistrict="Arrival Gate"
          toDistrict="Innovation District"
          variant="mist"
        />
        <InnovationDistrict />

        <DistrictTransition
          fromDistrict="Innovation District"
          toDistrict="Skills Garden"
          variant="horizon"
        />
        <SkillsGarden />

        <DistrictTransition
          fromDistrict="Skills Garden"
          toDistrict="Guild Hall"
          variant="arch"
        />
        <GuildHall />

        <DistrictTransition
          fromDistrict="Guild Hall"
          toDistrict="The Academy"
          variant="mist"
        />
        <TheAcademy />

        <DistrictTransition
          fromDistrict="The Academy"
          toDistrict="The Vision Tower"
          variant="canal"
        />
        <VisionTower />

        <DistrictTransition
          fromDistrict="The Vision Tower"
          toDistrict="Studio District"
          variant="horizon"
        />
        <StudioDistrict />

        <DistrictTransition
          fromDistrict="Studio District"
          toDistrict="The Beacon"
          variant="mist"
        />
        <TheBeacon />
      </main>
    </>
  );
}