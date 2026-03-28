import Link from 'next/link';
import { sql } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const producten = await sql`SELECT * FROM st_producten ORDER BY RANDOM() LIMIT 4`;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2C1810] text-white text-center py-24 px-5">
        <h1 className="text-5xl font-light uppercase tracking-[6px] text-[#D4956A] mb-4">
          Stellatella
        </h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
          Ontdek onze ambachtelijke chocolade collectie. Van pure pralines tot romige truffels — elk stuk is een klein kunstwerk.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/shop" className="bg-[#D4956A] text-white px-8 py-3.5 rounded uppercase tracking-wider hover:bg-[#c07f52] transition-colors">
            Bekijk Shop
          </Link>
          <Link href="/informatie" className="border-2 border-[#D4956A] text-[#D4956A] px-8 py-3.5 rounded uppercase tracking-wider hover:bg-[#D4956A] hover:text-white transition-colors">
            Meer Info
          </Link>
        </div>
      </section>

      {/* Uitgelichte producten */}
      <div className="max-w-6xl mx-auto px-5 py-12">
        <h2 className="text-center text-3xl font-light uppercase tracking-[4px] text-[#2C1810] mb-10">
          Uitgelicht
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {producten.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              naam={p.naam}
              prijs={p.prijs}
              categorie={p.categorie}
              afbeelding={p.afbeelding}
            />
          ))}
        </div>
        <div className="text-center">
          <Link href="/shop" className="bg-[#2C1810] text-white px-8 py-3.5 rounded uppercase tracking-wider hover:bg-[#1a0f0a] transition-colors inline-block">
            Bekijk Alle Chocolade
          </Link>
        </div>
      </div>

      {/* Info sectie */}
      <section className="bg-[#FDF2E9] py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light uppercase tracking-[4px] text-[#2C1810] mb-6">
            Over Chocolade
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Er zijn 3 verschillende soorten chocolade: puur, melk en wit. Elk type heeft zijn eigen unieke smaakprofiel en eigenschappen. Op onze informatiepagina lees je alles over hoe chocolade gemaakt wordt — van cacaoboon tot reep.
          </p>
          <Link href="/informatie" className="text-[#8B4513] font-semibold uppercase tracking-wider hover:text-[#D4956A] transition-colors">
            Lees meer &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
