CREATE SCHEMA IF NOT EXISTS "users";

CREATE TABLE IF NOT EXISTS "users"."customers" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "email" varchar NOT NULL UNIQUE,
  "street_1" varchar,
  "street_2" varchar,
  "city" varchar,
  "state" varchar,
  "zip" varchar
);

CREATE TABLE IF NOT EXISTS "users"."admins" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL,
  "refresh_token" varchar UNIQUE
);