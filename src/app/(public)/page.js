import BrowseHighSection from "@/components/home/BrowseHighSection";
import ExploreCategoriesSection from "@/components/home/ExploreCategoriesSection";
import GenuineReviewSection from "@/components/home/GenuineReviewSection";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HowWorksSection from "@/components/home/HowWorksSection";
import MostPreferredServiceSection from "@/components/home/MostPreferredServiceSection";
import OurFeaturedServiceSection from "@/components/home/OurFeaturedServiceSection";
import OurPopularServiceSection from "@/components/home/OurPopularServiceSection";
import PopularProviderSection from "@/components/home/PopularProviderSection";
import ProviderBanner from "@/components/home/ProviderBanner";

export default function HomePage() {
  return (
    <div className="">
      <HomeHeroSection />
      <ExploreCategoriesSection />
      <OurFeaturedServiceSection />
      <OurPopularServiceSection />
      <HowWorksSection />
      <MostPreferredServiceSection />
      <PopularProviderSection />
      <BrowseHighSection />
      <GenuineReviewSection />
      <ProviderBanner />
    </div>
  );
}
