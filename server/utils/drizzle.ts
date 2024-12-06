import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type Wishlist = typeof schema.wishlists.$inferSelect
export type NewWishlist = typeof schema.wishlists.$inferInsert

export type WishlistItem = typeof schema.wishlistItems.$inferSelect
export type NewWishlistItem = typeof schema.wishlistItems.$inferInsert
