import Link from 'next/link';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { getCart } from '@/lib/cart';
import { placeOrderAction } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function AfrekenPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;

  // Success state
  if (params.success) {
    const bestellingId = params.success;
    const rows = await sql`SELECT * FROM st_bestellingen WHERE id = ${parseInt(bestellingId)}`;
    const bestelling = rows[0];

    return (
      <div className="max-w-2xl mx-auto px-5 py-16 text-center">
        <div className="text-6xl text-green-600 mb-4">&#10003;</div>
        <h1 className="text-3xl font-light uppercase tracking-[3px] text-[#2C1810] mb-4">
          Bedankt voor je bestelling!
        </h1>
        {bestelling && (
          <>
            <p className="text-gray-500 mb-2">Bestelling #{bestellingId}</p>
            <p className="text-lg mb-8">Totaal: <strong>&euro; {parseFloat(bestelling.totaal).toFixed(2).replace('.', ',')}</strong></p>
          </>
        )}
        <div className="flex gap-3 justify-center">
          <Link href="/shop" className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors">
            Verder winkelen
          </Link>
          <Link href="/account" className="bg-[#2C1810] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#1a0f0a] transition-colors">
            Mijn bestellingen
          </Link>
        </div>
      </div>
    );
  }

  // Checkout flow
  await requireAuth();
  const cart = await getCart();

  if (cart.length === 0) redirect('/winkelwagen');

  let totaal = 0;
  const items: { product: Record<string, string>; aantal: number; subtotaal: number }[] = [];

  for (const cartItem of cart) {
    const rows = await sql`SELECT * FROM st_producten WHERE id = ${cartItem.productId}`;
    if (rows.length > 0) {
      const product = rows[0];
      const subtotaal = parseFloat(product.prijs) * cartItem.aantal;
      totaal += subtotaal;
      items.push({ product, aantal: cartItem.aantal, subtotaal });
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="text-center text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-10">
        Afrekenen
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-xl font-light uppercase tracking-[2px] text-[#2C1810] mb-6">
          Jouw bestelling
        </h2>

        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between py-3 border-b border-gray-100">
            <span className="text-gray-700">{item.product.naam} &times; {item.aantal}</span>
            <span className="font-semibold text-[#2C1810]">&euro; {item.subtotaal.toFixed(2).replace('.', ',')}</span>
          </div>
        ))}

        <div className="text-right border-t-2 border-[#2C1810] pt-4 mt-4 mb-6">
          <span className="text-gray-500">Totaal: </span>
          <span className="text-2xl font-bold text-[#2C1810] ml-3">&euro; {totaal.toFixed(2).replace('.', ',')}</span>
        </div>

        <div className="flex justify-between items-center">
          <Link href="/winkelwagen" className="text-[#8B4513] hover:text-[#D4956A] transition-colors">
            Terug naar winkelwagen
          </Link>
          <form action={placeOrderAction}>
            <button type="submit" className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors">
              Bestelling Plaatsen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
