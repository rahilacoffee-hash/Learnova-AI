import DemoCard from "./DemoCard";
import GradientHeading from "./GradientHeading";
import Terminal from "./Terminal";


export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <GradientHeading />

            <p className="mt-6 max-w-xl text-lg text-zinc-400">
              Turn lectures into summaries, flashcards,
              and quizzes instantly using AI-powered learning.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
                Get Started
              </button>

              <button className="rounded-xl border border-white/20 px-6 py-3 transition hover:bg-white/10">
                Watch Demo
              </button>
            </div>

            <div className="mt-12">
             <DemoCard />
            </div>
          </div>

          {/* Right Side */}
            <Terminal />
         
        </div>
      </div>
    </section>
  );
}