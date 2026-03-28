export default function InformatiePage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-center text-4xl font-light uppercase tracking-[4px] text-[#2C1810] mb-12">
        Over Chocolade
      </h1>

      {/* Soorten Chocola */}
      <section className="mb-16" id="soorten">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Soorten Chocolade
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Er zijn 3 verschillende soorten <em>chocolade</em>. Elke soort heeft zijn eigen unieke smaak en bereidingswijze.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FDF2E9] rounded-lg p-6">
            <div className="text-4xl mb-3">🟤</div>
            <h3 className="text-lg font-bold text-[#2C1810] mb-2">Pure Chocolade</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bevat minstens 35% cacao. Hoe hoger het cacaopercentage, hoe intenser en bitterder de smaak. Pure chocolade bevat geen of weinig melk en is favoriet bij echte chocoladekenners.
            </p>
          </div>

          <div className="bg-[#FDF2E9] rounded-lg p-6">
            <div className="text-4xl mb-3">🟠</div>
            <h3 className="text-lg font-bold text-[#2C1810] mb-2">Melkchocolade</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Gemaakt met cacaoboter, suiker en melkpoeder. Zachter en zoeter van smaak dan pure chocolade. Dit is de meest populaire chocoladesoort ter wereld.
            </p>
          </div>

          <div className="bg-[#FDF2E9] rounded-lg p-6">
            <div className="text-4xl mb-3">⚪</div>
            <h3 className="text-lg font-bold text-[#2C1810] mb-2">Witte Chocolade</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bevat cacaoboter maar geen cacaopoeder. Daardoor is de kleur wit en de smaak romig en zoet. Technisch gezien is het geen &apos;echte&apos; chocolade, maar het is wel heerlijk!
            </p>
          </div>
        </div>
      </section>

      {/* Hoe wordt chocola gemaakt */}
      <section className="mb-16" id="hoe-maak-je-chocola">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Hoe Wordt Chocolade Gemaakt?
        </h2>

        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">1</div>
            <div>
              <h3 className="font-bold text-[#2C1810] mb-1">Cacaobonen oogsten</h3>
              <p className="text-gray-600 text-sm leading-relaxed">De cacaovruchten worden met de hand geoogst van de cacaoboom. Elke vrucht bevat 20-50 cacaobonen omgeven door een wit, zoet vruchtvlees.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">2</div>
            <div>
              <h3 className="font-bold text-[#2C1810] mb-1">Fermenteren</h3>
              <p className="text-gray-600 text-sm leading-relaxed">De bonen worden 5-7 dagen gefermenteerd. Hierbij verdwijnt het vruchtvlees en ontstaan de eerste chocolade-aroma&apos;s.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">3</div>
            <div>
              <h3 className="font-bold text-[#2C1810] mb-1">Drogen en roosteren</h3>
              <p className="text-gray-600 text-sm leading-relaxed">De bonen worden gedroogd in de zon en daarna geroosterd op ongeveer 120°C. Het roosteren geeft chocolade zijn typische aroma.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">4</div>
            <div>
              <h3 className="font-bold text-[#2C1810] mb-1">Malen en mengen</h3>
              <p className="text-gray-600 text-sm leading-relaxed">De geroosterde bonen worden fijngemalen tot cacaomassa. Deze wordt gemengd met cacaoboter, suiker en eventueel melkpoeder.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="bg-[#8B4513] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">5</div>
            <div>
              <h3 className="font-bold text-[#2C1810] mb-1">Concheren</h3>
              <p className="text-gray-600 text-sm leading-relaxed">De chocolademassa wordt urenlang (soms tot 72 uur!) verwarmd en geroerd. Dit maakt de chocolade glad en zacht — het geheim van smeltende chocolade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video */}
      <section className="mb-16" id="youtube-filmpje">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Bekijk: Hoe Chocolade Wordt Gemaakt
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/ibjUpk9Iagk"
            title="How Chocolate Is Made"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </section>

      {/* Handige websites */}
      <section id="websites">
        <h2 className="text-2xl font-light uppercase tracking-[3px] text-[#8B4513] mb-6 border-b-2 border-[#D4956A] pb-3">
          Handige Websites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://www.chocolademakers.nl/" target="_blank" rel="noopener noreferrer" className="block bg-[#FDF2E9] rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#2C1810] mb-1">Chocolademakers</h3>
            <p className="text-sm text-gray-600">Ambachtelijke chocolade uit Amsterdam</p>
          </a>
          <a href="https://www.callebaut.com/nl-NL" target="_blank" rel="noopener noreferrer" className="block bg-[#FDF2E9] rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#2C1810] mb-1">Callebaut</h3>
            <p className="text-sm text-gray-600">Belgische chocolade sinds 1911</p>
          </a>
          <a href="https://www.cacaolab.nl/" target="_blank" rel="noopener noreferrer" className="block bg-[#FDF2E9] rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#2C1810] mb-1">CacaoLab</h3>
            <p className="text-sm text-gray-600">Bean-to-bar chocolademaker</p>
          </a>
          <a href="https://schooltv.nl/video-item/chocola-hoe-wordt-chocola-gemaakt" target="_blank" rel="noopener noreferrer" className="block bg-[#FDF2E9] rounded-lg p-5 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[#2C1810] mb-1">SchoolTV - Chocola</h3>
            <p className="text-sm text-gray-600">Hoe wordt chocola gemaakt?</p>
          </a>
        </div>
      </section>
    </div>
  );
}
