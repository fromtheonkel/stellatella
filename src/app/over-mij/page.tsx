'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const fotos = [
  { src: '/over-mij/foto1.jpeg', titel: '' },
  { src: '/over-mij/foto2.jpeg', titel: '' },
];

function AnimatedCard({ src, titel, index }: { src: string; titel: string; index: number }) {
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
      className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      <div className="relative aspect-[3/4] w-full">
        <Image src={src} alt={titel || `Foto ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {titel && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm font-medium">{titel}</p>
        </div>
      )}
    </div>
  );
}

export default function OverMijPage() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Intro sectie */}
      <div
        className="text-center mb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-[5px] text-[#2C1810] mb-6">
          Over Mij
        </h1>
        <div className="w-20 h-0.5 bg-[#D4956A] mx-auto mb-6" />
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-gray-600 text-lg leading-relaxed">
            Hoi! Ik ben <strong className="text-[#2C1810]">Stella van den Enk</strong>, leerling in klas <strong className="text-[#2C1810]">5 Havo 2</strong>.
          </p>
          <p className="text-gray-500 leading-relaxed">
            Naast dat ik dol ben op chocolade ben ik ook graag bezig met fotografie en fotobewerking.
            Zie hieronder een paar voorbeelden van bewerkte foto&apos;s.
          </p>
        </div>
      </div>

      {/* Foto galerij */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {fotos.map((foto, i) => (
          <AnimatedCard key={i} src={foto.src} titel={foto.titel} index={i} />
        ))}
      </div>

      {/* Decoratief element */}
      <div
        className="text-center mt-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}
      >
        <p className="text-[#D4956A] text-sm uppercase tracking-[3px]">Stella van den Enk</p>
        <p className="text-gray-400 text-xs mt-1">Fotografie &amp; Bewerking</p>
      </div>
    </div>
  );
}
