'use client';

import { useEffect, useRef, useState } from 'react';

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedStep({ number, title, text, index }: { number: number; title: string; text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex gap-4 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-40px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.12}s`,
      }}
    >
      <div
        className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold"
        style={{
          transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.12 + 0.1}s`,
        }}
      >
        {number}
      </div>
      <div>
        <h3 className="font-bold text-[#2C1810] mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export default function InformatiePage() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1
        className="text-center text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-12"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Over Chocolade
      </h1>

      {/* Soorten Chocola */}
      <AnimatedSection className="mb-16">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Soorten Chocolade
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Er zijn 3 verschillende soorten <em>chocolade</em>. Elke soort heeft zijn eigen unieke smaak en bereidingswijze.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { emoji: '🟤', naam: 'Pure Chocolade', tekst: 'Bevat minstens 35% cacao. Hoe hoger het cacaopercentage, hoe intenser en bitterder de smaak. Pure chocolade bevat geen of weinig melk en is favoriet bij echte chocoladekenners.' },
            { emoji: '🟠', naam: 'Melkchocolade', tekst: 'Gemaakt met cacaoboter, suiker en melkpoeder. Zachter en zoeter van smaak dan pure chocolade. Dit is de meest populaire chocoladesoort ter wereld.' },
            { emoji: '⚪', naam: 'Witte Chocolade', tekst: "Bevat cacaoboter maar geen cacaopoeder. Daardoor is de kleur wit en de smaak romig en zoet. Technisch gezien is het geen 'echte' chocolade, maar het is wel heerlijk!" },
          ].map((soort, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-[#FDF2E9] rounded-lg p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-4xl mb-3">{soort.emoji}</div>
                <h3 className="text-lg font-bold text-[#2C1810] mb-2">{soort.naam}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{soort.tekst}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* Hoe wordt chocola gemaakt */}
      <AnimatedSection className="mb-16">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Hoe Wordt Chocolade Gemaakt?
        </h2>

        <div className="space-y-6">
          <AnimatedStep index={0} number={1} title="Cacaobonen oogsten" text="De cacaovruchten worden met de hand geoogst van de cacaoboom. Elke vrucht bevat 20-50 cacaobonen omgeven door een wit, zoet vruchtvlees." />
          <AnimatedStep index={1} number={2} title="Fermenteren" text="De bonen worden 5-7 dagen gefermenteerd. Hierbij verdwijnt het vruchtvlees en ontstaan de eerste chocolade-aroma's." />
          <AnimatedStep index={2} number={3} title="Drogen en roosteren" text="De bonen worden gedroogd in de zon en daarna geroosterd op ongeveer 120°C. Het roosteren geeft chocolade zijn typische aroma." />
          <AnimatedStep index={3} number={4} title="Malen en mengen" text="De geroosterde bonen worden fijngemalen tot cacaomassa. Deze wordt gemengd met cacaoboter, suiker en eventueel melkpoeder." />
          <AnimatedStep index={4} number={5} title="Concheren" text="De chocolademassa wordt urenlang (soms tot 72 uur!) verwarmd en geroerd. Dit maakt de chocolade glad en zacht — het geheim van smeltende chocolade." />
        </div>
      </AnimatedSection>

      {/* YouTube Video */}
      <AnimatedSection className="mb-16">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Bekijk: Hoe Chocolade Wordt Gemaakt
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ibjUpk9Iagk"
            title="How Chocolate Is Made"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </AnimatedSection>

      {/* Handige websites */}
      <AnimatedSection>
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Handige Websites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { url: 'https://www.chocolademakers.nl/', naam: 'Chocolademakers', tekst: 'Ambachtelijke chocolade uit Amsterdam' },
            { url: 'https://www.callebaut.com/nl-NL', naam: 'Callebaut', tekst: 'Belgische chocolade sinds 1911' },
            { url: 'https://www.cacaolab.nl/', naam: 'CacaoLab', tekst: 'Bean-to-bar chocolademaker' },
            { url: 'https://schooltv.nl/video-item/chocola-hoe-wordt-chocola-gemaakt', naam: 'SchoolTV - Chocola', tekst: 'Hoe wordt chocola gemaakt?' },
          ].map((site, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="block bg-[#FDF2E9] rounded-lg p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-[#2C1810] mb-1">{site.naam}</h3>
                <p className="text-sm text-gray-600">{site.tekst}</p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
