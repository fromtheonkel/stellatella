import Link from 'next/link';
import { registreerAction } from '@/lib/actions';

export default function RegistreerPage() {
  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="bg-white rounded-lg shadow-md p-10">
        <h2 className="text-center text-2xl font-light uppercase tracking-[3px] text-[#2C1810] mb-8">
          Registreren
        </h2>

        <form action={registreerAction}>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">Gebruikersnaam</label>
            <input type="text" name="gebruikersnaam" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded focus:border-[#8B4513] focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">E-mail</label>
            <input type="email" name="email" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded focus:border-[#8B4513] focus:outline-none" />
          </div>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1.5">Wachtwoord</label>
            <input type="password" name="wachtwoord" required className="w-full px-4 py-2.5 border-2 border-gray-200 rounded focus:border-[#8B4513] focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-[#8B4513] text-white py-3 rounded uppercase tracking-wider hover:bg-[#6d360f] transition-colors mt-2">
            Registreer
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Al een account? <Link href="/login" className="text-[#D4956A] font-semibold">Log hier in</Link>
        </p>
      </div>
    </div>
  );
}
