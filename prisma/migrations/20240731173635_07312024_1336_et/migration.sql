-- CreateTable
CREATE TABLE "bookings" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" TEXT NOT NULL,
    "booking_start" TIMESTAMPTZ(6) NOT NULL,
    "booking_end" TIMESTAMPTZ(6) NOT NULL,
    "cid" BIGINT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" BIGSERIAL NOT NULL,
    "last_modified" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_start" TIMESTAMPTZ(6) NOT NULL,
    "event_end" TIMESTAMPTZ(6) NOT NULL,
    "host" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,
    "banner" TEXT NOT NULL,
    "positions" JSONB,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notams" (
    "id" BIGINT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "author" BIGINT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "notams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roster" (
    "cid" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "home_facility" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" BIGINT NOT NULL,
    "del_certs" DOUBLE PRECISION NOT NULL,
    "gnd_certs" DOUBLE PRECISION NOT NULL,
    "twr_certs" DOUBLE PRECISION NOT NULL,
    "app_certs" DOUBLE PRECISION NOT NULL,
    "ctr_cert" BIGINT NOT NULL,
    "initials" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "staff_roles" TEXT NOT NULL DEFAULT 0,
    "mentor_level" BIGINT DEFAULT 0,

    CONSTRAINT "roster_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" BIGINT NOT NULL,
    "cid" BIGINT,
    "callsign" VARCHAR(255),
    "frequency" VARCHAR(255),
    "logon_time" TIMESTAMPTZ(6),
    "last_update" TIMESTAMPTZ(6),
    "duration" INTEGER,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "cid" BIGINT NOT NULL,
    "month_one" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "month_two" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "month_three" DOUBLE PRECISION NOT NULL DEFAULT 0.0,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_cid_fkey" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notams" ADD CONSTRAINT "notams_author_fkey" FOREIGN KEY ("author") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_cid_fkey" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_cid_fkey" FOREIGN KEY ("cid") REFERENCES "roster"("cid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
