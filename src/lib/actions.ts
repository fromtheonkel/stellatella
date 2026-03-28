'use server';

import { sql } from './db';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getCart, saveCart, clearCart } from './cart';

// ============================================================
// AUTH ACTIONS
// ============================================================

export async function loginAction(formData: FormData) {
  const gebruikersnaam = formData.get('gebruikersnaam') as string;
  const wachtwoord = formData.get('wachtwoord') as string;

  const rows = await sql`
    SELECT * FROM st_gebruikers WHERE gebruikersnaam = ${gebruikersnaam} LIMIT 1
  `;

  if (rows.length === 0) {
    redirect('/login?error=user');
  }

  const user = rows[0];
  const valid = await bcrypt.compare(wachtwoord, user.hashedwachtwoord);

  if (!valid) {
    redirect('/login?error=password');
  }

  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify({
    gebruikersId: user.id,
    gebruikersnaam: user.gebruikersnaam
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
  });

  redirect('/shop');
}

export async function registreerAction(formData: FormData) {
  const gebruikersnaam = formData.get('gebruikersnaam') as string;
  const email = formData.get('email') as string;
  const wachtwoord = formData.get('wachtwoord') as string;

  const hashedwachtwoord = await bcrypt.hash(wachtwoord, 10);

  await sql`
    INSERT INTO st_gebruikers (gebruikersnaam, email, hashedwachtwoord)
    VALUES (${gebruikersnaam}, ${email}, ${hashedwachtwoord})
  `;

  redirect('/login');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}

// ============================================================
// CART ACTIONS
// ============================================================

export async function addToCartAction(formData: FormData) {
  const productId = parseInt(formData.get('productId') as string);
  const aantal = parseInt(formData.get('aantal') as string) || 1;

  const cart = await getCart();
  const existing = cart.find(item => item.productId === productId);

  if (existing) {
    existing.aantal += aantal;
  } else {
    cart.push({ productId, aantal });
  }

  await saveCart(cart);
  redirect('/winkelwagen');
}

export async function updateCartAction(formData: FormData) {
  const productId = parseInt(formData.get('productId') as string);
  const aantal = parseInt(formData.get('aantal') as string);

  const cart = await getCart();

  if (aantal <= 0) {
    const filtered = cart.filter(item => item.productId !== productId);
    await saveCart(filtered);
  } else {
    const item = cart.find(item => item.productId === productId);
    if (item) item.aantal = aantal;
    await saveCart(cart);
  }

  redirect('/winkelwagen');
}

export async function removeFromCartAction(formData: FormData) {
  const productId = parseInt(formData.get('productId') as string);
  const cart = await getCart();
  const filtered = cart.filter(item => item.productId !== productId);
  await saveCart(filtered);
  redirect('/winkelwagen');
}

// ============================================================
// ORDER ACTIONS
// ============================================================

export async function placeOrderAction() {
  const { cookies: getCookies } = await import('next/headers');
  const cookieStore = await getCookies();
  const sessionCookie = cookieStore.get('session');
  if (!sessionCookie) redirect('/login');

  const session = JSON.parse(sessionCookie.value);
  const cart = await getCart();

  if (cart.length === 0) redirect('/winkelwagen');

  // Calculate total
  let totaal = 0;
  const items: { productId: number; aantal: number; prijs: number }[] = [];

  for (const cartItem of cart) {
    const rows = await sql`SELECT prijs FROM st_producten WHERE id = ${cartItem.productId}`;
    if (rows.length > 0) {
      const prijs = parseFloat(rows[0].prijs);
      totaal += prijs * cartItem.aantal;
      items.push({ productId: cartItem.productId, aantal: cartItem.aantal, prijs });
    }
  }

  // Create order
  const orderRows = await sql`
    INSERT INTO st_bestellingen (gebruiker_id, totaal)
    VALUES (${session.gebruikersId}, ${totaal})
    RETURNING id
  `;
  const bestellingId = orderRows[0].id;

  // Create order lines
  for (const item of items) {
    await sql`
      INSERT INTO st_bestelregels (bestelling_id, product_id, aantal, prijs)
      VALUES (${bestellingId}, ${item.productId}, ${item.aantal}, ${item.prijs})
    `;
  }

  await clearCart();
  redirect(`/afrekenen?success=${bestellingId}`);
}
