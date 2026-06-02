import CityNav from "@/app/components/layout/CityNav";
import StarField from "@/app/components/ui/StarField";
import ArrivalGate from "@/app/components/sections/ArrivalGate";
import InnovationDistrict from "@/app/components/sections/InnovationDistrict";
import SkillsGarden from "@/app/components/sections/SkillsGarden";
import GuildHall from "@/app/components/sections/GuildHall";
import TheAcademy from "@/app/components/sections/TheAcademy";
import MemoryLane from "@/app/components/sections/MemoryLane";
import StudioDistrict from "@/app/components/sections/StudioDistrict";
import TheBeacon from "@/app/components/sections/TheBeacon";

export default function Home() {
  return (
    <>
      <StarField />
      <CityNav />
      <main id="main-content" tabIndex={-1}>
        <ArrivalGate />
        <InnovationDistrict />
        <SkillsGarden />
        <GuildHall />
        <TheAcademy />
        <MemoryLane />
        <StudioDistrict />
        <TheBeacon />
      </main>
    </>
  );
}
