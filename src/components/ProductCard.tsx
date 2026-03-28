import Link from 'next/link';

interface ProductCardProps {
  id: number;
  naam: string;
  prijs: string;
  categorie: string;
  afbeelding: string;
}

export default function ProductCard({ id, naam, prijs, categorie }: ProductCardProps) {
  return (
    <div className="bg-[#FDF2E9] rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
      <Link href={`/shop/${id}`}>
        <div className="w-full h-64 bg-[#f0ddd0] flex items-center justify-center">
          <span className="text-5xl opacity-30">🍫</span>
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wider text-[#D4956A] mb-1">{categorie}</div>
        <div className="font-semibold text-[#2C1810] mb-2">{naam}</div>
        <div className="text-lg font-bold text-[#2C1810] mb-3">&euro; {parseFloat(prijs).toFixed(2).replace('.', ',')}</div>
        <Link
          href={`/shop/${id}`}
          className="block text-center bg-[#8B4513] text-white py-2.5 rounded text-sm uppercase tracking-wider hover:bg-[#6d360f] transition-colors"
        >
          Bekijk
        </Link>
      </div>
    </div>
  );
}
