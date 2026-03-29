import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { getCartCount } from '@/lib/cart';
import { logoutAction } from '@/lib/actions';

export default async function Header() {
  const session = await getSession();
  const cartCount = await getCartCount();

  return (
    <header className="bg-[#2C1810] sticky top-0 z-50 shadow-lg">
      {/* Top row: logo + auth */}
      <div className="max-w-6xl mx-auto px-5 pt-3 pb-2 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Image src="/logo.png" alt="Stellatella" width={40} height={40} className="rounded-full" />
          <span className="text-[#D4956A] text-lg sm:text-2xl font-bold tracking-widest uppercase">Stellatella</span>
        </Link>

        <div className="flex gap-3 items-center">
          {session ? (
            <>
              <span className="text-[#D4956A] text-xs sm:text-sm hidden sm:inline">Welkom, {session.gebruikersnaam}</span>
              <Link href="/account" className="text-white text-xs sm:text-sm hover:text-[#D4956A] transition-colors">
                Account
              </Link>
              <form action={logoutAction}>
                <button className="bg-[#D4956A] text-white px-3 py-1.5 rounded text-xs uppercase tracking-wider hover:bg-[#c07f52] transition-colors">
                  Uitloggen
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white text-xs sm:text-sm hover:text-[#D4956A] transition-colors">
                Login
              </Link>
              <Link href="/registreer" className="bg-[#D4956A] text-white px-3 py-1.5 rounded text-xs uppercase tracking-wider hover:bg-[#c07f52] transition-colors">
                Registreer
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Bottom row: navigation */}
      <nav className="max-w-6xl mx-auto px-5 pb-3 flex justify-center gap-4 sm:gap-6">
        <Link href="/" className="text-white text-xs sm:text-sm uppercase tracking-wider hover:text-[#D4956A] transition-colors">
          Home
        </Link>
        <Link href="/informatie" className="text-white text-xs sm:text-sm uppercase tracking-wider hover:text-[#D4956A] transition-colors">
          Informatie
        </Link>
        <Link href="/shop" className="text-white text-xs sm:text-sm uppercase tracking-wider hover:text-[#D4956A] transition-colors">
          Shop
        </Link>
        <Link href="/over-mij" className="text-white text-xs sm:text-sm uppercase tracking-wider hover:text-[#D4956A] transition-colors">
          Over Mij
        </Link>
        <Link href="/winkelwagen" className="text-white text-xs sm:text-sm uppercase tracking-wider hover:text-[#D4956A] transition-colors relative">
          Winkelwagen
          {cartCount > 0 && (
            <span className="bg-[#D4956A] text-white text-xs px-2 py-0.5 rounded-full ml-1 align-top">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
