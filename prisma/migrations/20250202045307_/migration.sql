/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_end` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_start` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `positions` on the `events` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `created_by` on the `events` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `roster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staff_roles` on the `roster` table. All the data in the column will be lost.
  - You are about to alter the column `cid` on the `roster` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `rating` on the `roster` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `ctr_cert` on the `roster` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `stats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cid` on the `stats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `month_one` on the `stats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `month_two` on the `stats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `month_three` on the `stats` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_cid_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_created_by_fkey";

-- DropForeignKey
ALTER TABLE "notams" DROP CONSTRAINT "notams_author_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_cid_fkey";

-- DropForeignKey
ALTER TABLE "stats" DROP CONSTRAINT "stats_cid_fkey";

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "event_end",
DROP COLUMN "event_start",
DROP COLUMN "positions",
ADD COLUMN     "end" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "start" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE SERIAL,
ALTER COLUMN "created_by" SET DATA TYPE INTEGER,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roster" DROP CONSTRAINT "roster_pkey",
DROP COLUMN "staff_roles",
ADD COLUMN     "rating_changed" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "sop_course" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "cid" SET DATA TYPE INTEGER,
ALTER COLUMN "rating" SET DATA TYPE INTEGER,
ALTER COLUMN "ctr_cert" SET DATA TYPE INTEGER,
ADD CONSTRAINT "roster_pkey" PRIMARY KEY ("cid");

-- AlterTable
ALTER TABLE "stats" DROP CONSTRAINT "stats_pkey",
ADD COLUMN     "all_time" INTEGER DEFAULT 0,
ADD COLUMN     "delivery" INTEGER DEFAULT 0,
ADD COLUMN     "enroute" INTEGER DEFAULT 0,
ADD COLUMN     "ground" INTEGER DEFAULT 0,
ADD COLUMN     "tower" INTEGER DEFAULT 0,
ADD COLUMN     "tracon" INTEGER DEFAULT 0,
ADD COLUMN     "ytd" INTEGER DEFAULT 0,
ALTER COLUMN "cid" SET DATA TYPE INTEGER,
ALTER COLUMN "month_one" DROP NOT NULL,
ALTER COLUMN "month_one" SET DEFAULT 0,
ALTER COLUMN "month_one" SET DATA TYPE INTEGER,
ALTER COLUMN "month_two" DROP NOT NULL,
ALTER COLUMN "month_two" SET DEFAULT 0,
ALTER COLUMN "month_two" SET DATA TYPE INTEGER,
ALTER COLUMN "month_three" DROP NOT NULL,
ALTER COLUMN "month_three" SET DEFAULT 0,
ALTER COLUMN "month_three" SET DATA TYPE INTEGER,
ADD CONSTRAINT "stats_pkey" PRIMARY KEY ("cid");

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "bookings";

-- DropTable
DROP TABLE "notams";

-- DropTable
DROP TABLE "sessions";

-- CreateTable
CREATE TABLE "action_log" (
    "id" TEXT NOT NULL,
    "user" INTEGER NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "action_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artcc_stats" (
    "id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "mtd" DOUBLE PRECISION,
    "ytd" DOUBLE PRECISION,
    "all_time" DOUBLE PRECISION,

    CONSTRAINT "artcc_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "controller_sessions" (
    "id" TEXT NOT NULL,
    "cid" INTEGER NOT NULL,
    "callsign" VARCHAR(255),
    "frequency" VARCHAR(255),
    "start" TIMESTAMPTZ(6),
    "active" BOOLEAN NOT NULL,
    "end" TIMESTAMPTZ(6),
    "duration" INTEGER DEFAULT EXTRACT(epoch FROM ("end" - start)),

    CONSTRAINT "controller_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_positions" (
    "controller" INTEGER,
    "eventId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "type" DOUBLE PRECISION NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "event_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "author" INTEGER NOT NULL,
    "controller" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "position_requests" (
    "cid" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "request_id" SERIAL NOT NULL,

    CONSTRAINT "request_id" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "staff_roles" (
    "cid" INTEGER NOT NULL,
    "role" VARCHAR(10) NOT NULL,

    CONSTRAINT "staff_roles_pk" PRIMARY KEY ("cid","role")
);

-- CreateTable
CREATE TABLE "training_requests" (
    "training_request_id" SERIAL NOT NULL,
    "student_cid" INTEGER NOT NULL,
    "instructor_cid" INTEGER,
    "date_requested" DATE NOT NULL DEFAULT CURRENT_DATE,
    "date_assigned" DATE,
    "status" VARCHAR(50),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "training_type" VARCHAR(30),

    CONSTRAINT "training_requests_pk" PRIMARY KEY ("training_request_id")
);

-- CreateTable
CREATE TABLE "training_sessions" (
    "session_id" SERIAL NOT NULL,
    "student_cid" INTEGER NOT NULL,
    "instructor_cid" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "movements" INTEGER DEFAULT 0,
    "notes" VARCHAR(750) NOT NULL,
    "score" INTEGER NOT NULL,
    "position" VARCHAR(20) NOT NULL,
    "location" INTEGER NOT NULL,
    "session_date" DATE NOT NULL,

    CONSTRAINT "training_sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "facility" TEXT,
    "rating" INTEGER NOT NULL,
    "roles" TEXT NOT NULL,
    "rostered" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_requests" (
    "id" SERIAL NOT NULL,
    "cid" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "date_requested" DATE,
    "reviewed" BOOLEAN DEFAULT false,
    "action_message" VARCHAR(150),
    "action_cid" INTEGER,
    "action_date" DATE,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "visit_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_sessions" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "web_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "action_log" ADD CONSTRAINT "action_log_user_fkey" FOREIGN KEY ("user") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controller_sessions" ADD CONSTRAINT "controller_sessions_cid_fkey" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_positions" ADD CONSTRAINT "event_positions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_controller_fkey" FOREIGN KEY ("controller") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_requests" ADD CONSTRAINT "cid" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_requests" ADD CONSTRAINT "event_id" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position_requests" ADD CONSTRAINT "position" FOREIGN KEY ("position") REFERENCES "event_positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_roles" ADD CONSTRAINT "staff_roles_roster_cid_fk" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_cid_fkey" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_roster_cid_fk_ins" FOREIGN KEY ("instructor_cid") REFERENCES "roster"("cid") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "training_requests" ADD CONSTRAINT "training_requests_roster_cid_fk_student" FOREIGN KEY ("student_cid") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "training_sessions" ADD CONSTRAINT "training_sessions___fk_controller" FOREIGN KEY ("student_cid") REFERENCES "roster"("cid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_sessions" ADD CONSTRAINT "training_sessions___fk_instructor" FOREIGN KEY ("instructor_cid") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_users_cid_fk" FOREIGN KEY ("cid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_requests" ADD CONSTRAINT "visit_requests_users_id_fk" FOREIGN KEY ("action_cid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "web_sessions" ADD CONSTRAINT "web_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
