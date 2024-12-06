PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_wishlist_items` (
	`id` text PRIMARY KEY NOT NULL,
	`wishlist_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text,
	`price` integer,
	`priority` integer,
	`purchased` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_wishlist_items`("id", "wishlist_id", "name", "description", "url", "price", "priority", "purchased", "created_at") SELECT "id", "wishlist_id", "name", "description", "url", "price", "priority", "purchased", "created_at" FROM `wishlist_items`;--> statement-breakpoint
DROP TABLE `wishlist_items`;--> statement-breakpoint
ALTER TABLE `__new_wishlist_items` RENAME TO `wishlist_items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_wishlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_wishlists`("id", "name", "description", "created_at") SELECT "id", "name", "description", "created_at" FROM `wishlists`;--> statement-breakpoint
DROP TABLE `wishlists`;--> statement-breakpoint
ALTER TABLE `__new_wishlists` RENAME TO `wishlists`;