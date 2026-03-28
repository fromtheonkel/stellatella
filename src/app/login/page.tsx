import Link from 'next/link';
import { loginAction } from '@/lib/actions';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="bg-white rounded-lg shadow-md p-10">
        <h2 className="text-center text-2xl font-light uppercase tracking-[3px] text-[#2C1810] mb-8">
          Inloggen
        </h2>

        {error && (
          <div className="bg-red-50 text-red-800 border border-red-200 rounded px-4 py-3 mb-6 text-sm">
            {error === 'user' ? 'Gebruiker niet gevonden.' : 'Onjuist wachtwoord.'}
          </div>
        )}

        <form action={loginAction}>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">Gebruikersnaam</label>
            <input type="text" name="gebruikersnaam" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded focus:border-[#8B4513] focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">Wachtwoord</label>
            <input type="password" name="wachtwoord" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded focus:border-[#8B4513] focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-[#8B4513] text-white py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors mt-2">
            Inloggen
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Nog geen account? <Link href="/registreer" className="text-[#D4956A] font-semibold">Registreer hier</Link>
        </p>
      </div>
    </div>
  );
}
