import Banner from "@/components/homePage/Banner";
import PopularCategories from "@/components/homePage/PopularCategories";
import TopCreator from "@/components/homePage/TopCreator";
import TrendingIdeas from "@/components/homePage/TrendingIdeas";
import Image from "next/image";

export const metadata = {
  title: "IdeaVault",
  description: "This is a modern Idea sharing platform",
};

export default function Home() {
  return (
    <div className="space-y-15">
      <Banner></Banner>
      <TrendingIdeas></TrendingIdeas>
      <TopCreator></TopCreator>
      <PopularCategories></PopularCategories>
    </div>
  );
}
