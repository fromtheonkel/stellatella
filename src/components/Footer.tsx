import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-[#D4956A] font-bold uppercase tracking-wider mb-3">Stellatella</h3>
          <p className="text-sm leading-relaxed">De lekkerste chocolade, ambachtelijk gemaakt met de beste ingrediënten.</p>
        </div>
        <div>
          <h3 className="text-[#D4956A] font-bold uppercase tracking-wider mb-3">Links</h3>
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-sm hover:text-[#D4956A] transition-colors">Home</Link>
            <Link href="/informatie" className="text-sm hover:text-[#D4956A] transition-colors">Informatie</Link>
            <Link href="/shop" className="text-sm hover:text-[#D4956A] transition-colors">Shop</Link>
            <Link href="/over-mij" className="text-sm hover:text-[#D4956A] transition-colors">Over Mij</Link>
          </div>
        </div>
        <div>
          <h3 className="text-[#D4956A] font-bold uppercase tracking-wider mb-3">Account</h3>
          <div className="flex flex-col gap-1">
            <Link href="/login" className="text-sm hover:text-[#D4956A] transition-colors">Inloggen</Link>
            <Link href="/registreer" className="text-sm hover:text-[#D4956A] transition-colors">Registreren</Link>
            <Link href="/winkelwagen" className="text-sm hover:text-[#D4956A] transition-colors">Winkelwagen</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        Stellatella &copy; {new Date().getFullYear()} | Gemaakt door Stella van den Enk
      </div>
    </footer>
  );
}
