import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Learnings from "@/components/Learnings";
import Building from "@/components/Building";
import GithubActivity from "@/components/GithubActivity";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* Pinned hero — the content below rises over it like a shutter. */}
        <Hero />
        <div className="relative z-10 rounded-t-[2rem] bg-washi shadow-[0_-28px_60px_-28px_rgba(28,22,19,0.35)] sm:rounded-t-[2.5rem]">
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Learnings />
          <Building />
          <GithubActivity />
        </div>
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
