import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      {/* Post-scroll content */}
      <section className="relative z-10 py-32 px-6 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Crafting Digital Experiences
          </h2>
          <p className="text-body text-muted-foreground text-lg leading-relaxed">
            We build premium, performance-driven digital products that leave lasting impressions. 
            Every pixel, every interaction — designed with purpose.
          </p>
          <div className="mt-10 h-px w-24 mx-auto bg-primary/40" />
        </div>
      </section>
    </main>
  );
};

export default Index;
