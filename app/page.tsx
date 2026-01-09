import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Links from "@/components/Links";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

export default function Home() {
  const { live, songs } = content;

  return (
    <main className="min-h-screen font-sans selection:bg-primary/30">
      <Hero />
      <About />

      {/* Recommended Live Stream Section */}
      <VideoSection
        title={live.title}
        subtitle={live.subtitle}
        items={live.items}
        bgColor="bg-gray-50/50"
        color="accent"
      />

      {/* Recommended Songs Section */}
      <VideoSection
        title={songs.title}
        subtitle={songs.subtitle}
        items={songs.items}
        bgColor="bg-white"
        color="primary"
      />

      <Links />
      <Footer />
    </main>
  );
}
