import React from "react";

const steps = [
  {
    id: 1,
    title: "Upload",
    desc: "Upload your study materials in PDF or TXT format.",
  },
  {
    id: 2,
    title: "Analyze",
    desc: "Our AI analyzes the content and understands the key concepts.",
  },
  {
    id: 3,
    title: "Learn & Master",
    desc: "Get summaries, quizzes, and ask questions to master the topic.",
  },
];

const HowItWorks = () => {
  return (
    <section id="howitworks" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#020817]rounded-full blur-3xl -translate-y-1/2" />
      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in ">
           How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
             Get started in
            <span className="font-serif italic font-normal text-white">
              {" "}
              3 
               {" "}
            </span>
              simple steps.
          </h2>
        </div>

        {/* timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* exprience */}
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in delay-300"
              >
                {/* timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background z-10 ">
                  {step.id && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* content */}
                <div
                  className={`pl-8 md:pl-0 ${idx % 2 === 0 ? "md:pr-16 md:text-right" : "md:col-start-2 mb:pl-16"}`}
                >
                  <div
                    className={`glass p-6 rounded-2xl !border !border-primary/30 hover:!border-primary/50 transition-all duration-500`}
                  >
                    <span className="p-4 rounded-full bg-primary text-sm text-muted font-medium">
                      {step.id}
                    </span>
                    <h3 className="text-xl font-smibold mt-2">{step.title}</h3>
                  
                    <p className="text-sm text-muted-foreground mt-4">
                      {step.desc}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
