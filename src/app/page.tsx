import { Footer, Header } from "@/components";
import { Configuration, FAQ, Hero, Shades } from "@/ui";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Shades />
      <Configuration />
      <FAQ />
      <Footer />
    </main>
  );
}
