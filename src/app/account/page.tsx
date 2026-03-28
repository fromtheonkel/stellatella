import Link from 'next/link';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function AccountPage() {
  const session = await requireAuth();

  const bestellingen = await sql`
    SELECT * FROM st_bestellingen
    WHERE gebruiker_id = ${session.gebruikersId}
    ORDER BY datum DESC
  `;

  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-light uppercase tracking-[3px] text-[#2C1810]">Mijn Account</h1>
        <p className="text-gray-500 mt-2">Welkom, {session.gebruikersnaam}!</p>
      </div>

      <h2 className="text-xl font-light uppercase tracking-[2px] text-[#8B4513] mb-6">
        Bestelgeschiedenis
      </h2>

      {bestellingen.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-6">Je hebt nog geen bestellingen geplaatst.</p>
          <Link href="/shop" className="bg-[#8B4513] text-white px-8 py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors inline-block">
            Ga winkelen
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bestellingen.map((bestelling) => (
            <div key={bestelling.id} className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-center">
              <div>
                <strong className="text-[#2C1810]">Bestelling #{bestelling.id}</strong>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(bestelling.datum).toLocaleDateString('nl-NL', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
              <div className="text-xl font-bold text-[#2C1810]">
                &euro; {parseFloat(bestelling.totaal).toFixed(2).replace('.', ',')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
