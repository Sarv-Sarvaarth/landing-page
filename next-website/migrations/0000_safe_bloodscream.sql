CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `volunteer_roles` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`requirements` text,
	`skills_needed` text,
	`time_commitment` text,
	`location` text,
	`is_active` integer DEFAULT true NOT NULL,
	`max_volunteers` integer,
	`current_volunteers` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `volunteers` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`salutation` text NOT NULL,
	`full_name` text NOT NULL,
	`address` text NOT NULL,
	`aadhaar_number` text NOT NULL,
	`pan_number` text,
	`occupation` text NOT NULL,
	`professional_details` text NOT NULL,
	`skills` text,
	`availability` text,
	`preferred_roles` text,
	`status` text DEFAULT 'pending_review' NOT NULL,
	`application_date` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`approved_date` text,
	`approved_by` integer,
	`applied_role_id` integer,
	`role_assigned_date` text,
	`phone_number` text,
	`emergency_contact` text,
	`notes` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`approved_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`applied_role_id`) REFERENCES `volunteer_roles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `volunteers_email_unique` ON `volunteers` (`email`);