import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function setup() {
  console.log('Creating tables...');

  await sql`CREATE TABLE IF NOT EXISTS st_gebruikers (
    id SERIAL PRIMARY KEY,
    gebruikersnaam VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    hashedwachtwoord TEXT NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS st_producten (
    id SERIAL PRIMARY KEY,
    naam VARCHAR(100) NOT NULL,
    beschrijving TEXT,
    prijs DECIMAL(10,2) NOT NULL,
    afbeelding VARCHAR(255) NOT NULL,
    categorie VARCHAR(50) NOT NULL
  )`;

  await sql`CREATE TABLE IF NOT EXISTS st_bestellingen (
    id SERIAL PRIMARY KEY,
    gebruiker_id INT NOT NULL REFERENCES st_gebruikers(id),
    totaal DECIMAL(10,2) NOT NULL,
    datum TIMESTAMP DEFAULT NOW()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS st_bestelregels (
    id SERIAL PRIMARY KEY,
    bestelling_id INT NOT NULL REFERENCES st_bestellingen(id),
    product_id INT NOT NULL REFERENCES st_producten(id),
    aantal INT NOT NULL,
    prijs DECIMAL(10,2) NOT NULL
  )`;

  console.log('Tables created!');

  // Check if products already exist
  const existing = await sql`SELECT COUNT(*) as count FROM st_producten`;
  if (parseInt(existing[0].count) > 0) {
    console.log('Products already exist, skipping seed.');
    return;
  }

  console.log('Seeding products...');

  await sql`INSERT INTO st_producten (naam, beschrijving, prijs, afbeelding, categorie) VALUES
    ('Klassieke Pralines', 'Handgemaakte Belgische pralines met zachte vulling. Een tijdloos genot voor de echte chocoladeliefhebber.', 14.95, 'pralines.jpg', 'Bonbons'),
    ('Pure Chocoladereep', 'Intense pure chocolade met 72% cacao. Krachtig van smaak, zacht in textuur.', 5.95, 'pure-reep.jpg', 'Repen'),
    ('Melk Truffels', 'Romige melkchocolade truffels bestrooid met fijn cacaopoeder.', 12.95, 'truffels.jpg', 'Bonbons'),
    ('Witte Chocolade Brokken', 'Witte chocolade met gedroogd fruit en geroosterde noten.', 8.95, 'witte-brokken.jpg', 'Repen'),
    ('Karamel Zeezout Bonbons', 'Luxe bonbons met een hart van gezouten karamel. Zoet en zout in perfecte balans.', 16.95, 'karamel-bonbons.jpg', 'Bonbons'),
    ('Hazelnoot Chocoladereep', 'Romige melkchocolade met hele geroosterde hazelnoten.', 6.95, 'hazelnoot-reep.jpg', 'Repen'),
    ('Assortiment Doos', 'Een mix van 20 handgemaakte bonbons in diverse smaken.', 24.95, 'assortiment.jpg', 'Dozen'),
    ('Cadeauset Deluxe', 'Luxe geschenkdoos met een selectie van onze beste pralines en truffels.', 34.95, 'cadeauset.jpg', 'Dozen')
  `;

  console.log('Done! Database is ready.');
}

setup().catch(console.error);
