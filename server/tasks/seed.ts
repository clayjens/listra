import type { NewWishlist, NewWishlistItem } from '../utils/drizzle'

type OrphanWishlistItem = Pick<NewWishlistItem, 'name' | 'description' | 'url' | 'price' | 'priority' | 'purchased' | 'createdAt'>

/* eslint-disable no-console */
export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...')

    const wishlists: NewWishlist[] = [
      {
        name: 'Birthday Wishlist',
        description: 'Things I want for my birthday',
        createdAt: new Date('2022-03-15T14:30:00Z'),
      },
      {
        name: 'Christmas Wishlist',
        description: 'Gifts for Christmas',
        createdAt: new Date('2023-11-01T09:15:00Z'),
      },
      {
        name: 'Wedding Registry',
        description: 'Wedding gift ideas',
        createdAt: new Date('2024-01-20T16:45:00Z'),
      },
    ]

    const wishlistItems: OrphanWishlistItem[] = [
      {
        name: 'Smartphone',
        description: 'Latest model smartphone',
        url: 'https://example.com/smartphone',
        price: 699,
        priority: 1,
        purchased: true,
        createdAt: new Date('2022-03-15T14:35:00Z'),
      },
      {
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        url: 'https://example.com/headphones',
        price: 199,
        priority: 2,
        purchased: false,
        createdAt: new Date('2022-07-22T10:20:00Z'),
      },
      {
        name: 'Book Collection',
        description: 'Complete set of Lord of the Rings',
        url: 'https://example.com/lotr-books',
        price: 75,
        priority: 1,
        purchased: false,
        createdAt: new Date('2023-11-02T11:30:00Z'),
      },
      {
        name: 'Gaming Console',
        description: 'Latest gaming console with controllers',
        url: 'https://example.com/gaming-console',
        price: 499,
        priority: 3,
        purchased: true,
        createdAt: new Date('2023-12-10T08:45:00Z'),
      },
      {
        name: 'Stand Mixer',
        description: 'Professional kitchen stand mixer',
        url: 'https://example.com/stand-mixer',
        price: 349,
        priority: 1,
        purchased: false,
        createdAt: new Date('2024-01-21T12:00:00Z'),
      },
    ]

    const createdWishlists = await useDrizzle().insert(tables.wishlists).values(wishlists).returning({
      id: tables.wishlists.id,
    })

    const wishlistItemsWithWishlistId = wishlistItems.map(item => ({
      ...item,
      wishlistId: assignToRandomWishlist(createdWishlists),
    }))

    await useDrizzle().insert(tables.wishlistItems).values(wishlistItemsWithWishlistId)

    return { result: 'success' }
  },
})

function assignToRandomWishlist(createdWishlists: { id: number }[]) {
  const randomIndex = Math.floor(Math.random() * createdWishlists.length)
  return createdWishlists[randomIndex].id
}
