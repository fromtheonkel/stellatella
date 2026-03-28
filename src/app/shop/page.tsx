import Link from 'next/link';
import { sql } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ categorie?: string }> }) {
  const params = await searchParams;
  const categorie = params.categorie || '';

  let producten;
  if (categorie) {
    producten = await sql`SELECT * FROM st_producten WHERE categorie = ${categorie} ORDER BY naam`;
  } else {
    producten = await sql`SELECT * FROM st_producten ORDER BY naam`;
  }

  const categorien = ['Bonbons', 'Repen', 'Dozen'];

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-center text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-10">
        Onze Chocolade
      </h1>

      {/* Categorie filter */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        <Link
          href="/shop"
          className={`px-5 py-2 rounded-full border-2 border-[#8B4513] text-sm uppercase tracking-wider transition-colors ${
            !categorie ? 'bg-[#8B4513] text-white' : 'text-[#8B4513] hover:bg-[#8B4513] hover:text-white'
          }`}
        >
          Alles
        </Link>
        {categorien.map((cat) => (
          <Link
            key={cat}
            href={`/shop?categorie=${cat}`}
            className={`px-5 py-2 rounded-full border-2 border-[#8B4513] text-sm uppercase tracking-wider transition-colors ${
              categorie === cat ? 'bg-[#8B4513] text-white' : 'text-[#8B4513] hover:bg-[#8B4513] hover:text-white'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {producten.length === 0 ? (
          <p className="col-span-full text-center text-gray-400">Geen producten gevonden.</p>
        ) : (
          producten.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              naam={p.naam}
              prijs={p.prijs}
              categorie={p.categorie}
              afbeelding={p.afbeelding}
            />
          ))
        )}
      </div>
    </div>
  );
}
