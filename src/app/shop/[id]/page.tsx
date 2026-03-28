import Link from 'next/link';
import { sql } from '@/lib/db';
import { redirect } from 'next/navigation';
import { addToCartAction } from '@/lib/actions';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await sql`SELECT * FROM st_producten WHERE id = ${parseInt(id)}`;

  if (rows.length === 0) redirect('/shop');
  const product = rows[0];

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Afbeelding */}
        <div className="bg-[#FDF2E9] rounded-lg h-[500px] flex items-center justify-center">
          <span className="text-8xl opacity-25">🍫</span>
        </div>

        {/* Info */}
        <div>
          <div className="text-sm uppercase tracking-wider text-[#D4956A] mb-2">{product.categorie}</div>
          <h1 className="text-3xl font-light uppercase tracking-[2px] text-[#2C1810] mb-3">{product.naam}</h1>
          <div className="text-2xl font-bold text-[#2C1810] mb-5">
            &euro; {parseFloat(product.prijs).toFixed(2).replace('.', ',')}
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">{product.beschrijving}</p>

          <form action={addToCartAction} className="flex gap-3 items-center">
            <input type="hidden" name="productId" value={product.id} />
            <input
              type="number"
              name="aantal"
              defaultValue={1}
              min={1}
              max={10}
              className="w-20 px-3 py-2.5 border-2 border-gray-300 rounded text-center focus:border-[#8B4513] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors"
            >
              Toevoegen aan winkelwagen
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/shop" className="text-[#8B4513] hover:text-[#D4956A] transition-colors">
          &larr; Terug naar shop
        </Link>
      </div>
    </div>
  );
}
