import { cookies } from 'next/headers';

export interface CartItem {
  productId: number;
  aantal: number;
}

export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart');
  if (!cartCookie) return [];

  try {
    return JSON.parse(cartCookie.value) as CartItem[];
  } catch {
    return [];
  }
}

export async function getCartCount(): Promise<number> {
  const cart = await getCart();
  return cart.reduce((sum, item) => sum + item.aantal, 0);
}

export async function saveCart(cart: CartItem[]) {
  const cookieStore = await cookies();
  cookieStore.set('cart', JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearCart() {
  const cookieStore = await cookies();
  cookieStore.delete('cart');
}
