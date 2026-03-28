import Link from 'next/link';
import { sql } from '@/lib/db';
import { getCart } from '@/lib/cart';
import { updateCartAction, removeFromCartAction } from '@/lib/actions';

export default async function WinkelwagenPage() {
  const cart = await getCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-12 text-center">
        <h1 className="text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-8">Winkelwagen</h1>
        <p className="text-gray-400 text-lg mb-6">Je winkelwagen is leeg.</p>
        <Link href="/shop" className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors inline-block">
          Ga winkelen
        </Link>
      </div>
    );
  }

  // Fetch product details
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
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-center text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-10">
        Winkelwagen
      </h1>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-[#2C1810] text-white">
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Product</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Prijs</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Aantal</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Subtotaal</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id} className="border-b border-gray-200 hover:bg-[#FDF2E9]">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#FDF2E9] rounded flex items-center justify-center text-xl">🍫</div>
                  <span className="font-medium">{item.product.naam}</span>
                </div>
              </td>
              <td className="py-4 px-4">&euro; {parseFloat(item.product.prijs).toFixed(2).replace('.', ',')}</td>
              <td className="py-4 px-4">
                <form action={updateCartAction} className="flex gap-1">
                  <input type="hidden" name="productId" value={item.product.id} />
                  <input
                    type="number"
                    name="aantal"
                    defaultValue={item.aantal}
                    min={1}
                    max={10}
                    className="w-16 px-2 py-1 border-2 border-gray-300 rounded text-center text-sm"
                  />
                  <button type="submit" className="bg-[#2C1810] text-white px-2 py-1 rounded text-sm">&#10003;</button>
                </form>
              </td>
              <td className="py-4 px-4 font-semibold">&euro; {item.subtotaal.toFixed(2).replace('.', ',')}</td>
              <td className="py-4 px-4">
                <form action={removeFromCartAction}>
                  <input type="hidden" name="productId" value={item.product.id} />
                  <button type="submit" className="bg-red-600 text-white px-2 py-1 rounded text-sm">&#10005;</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right border-t-2 border-[#2C1810] pt-5 mb-6">
        <span className="text-gray-500 text-lg">Totaal: </span>
        <span className="text-2xl font-bold text-[#2C1810] ml-4">&euro; {totaal.toFixed(2).replace('.', ',')}</span>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/shop" className="text-[#8B4513] hover:text-[#D4956A] transition-colors">
          &larr; Verder winkelen
        </Link>
        <Link href="/afrekenen" className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors">
          Afrekenen
        </Link>
      </div>
    </div>
  );
}
