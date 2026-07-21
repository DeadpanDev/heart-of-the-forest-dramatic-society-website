-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'TRUSTEE');

-- CreateEnum
CREATE TYPE "NoticeType" AS ENUM ('NEWS', 'HELP_NEEDED', 'ALERT');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'REVIEWED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notice" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "NoticeType" NOT NULL DEFAULT 'NEWS',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_submission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest_area" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "interest_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_interest" (
    "submissionId" TEXT NOT NULL,
    "interestAreaId" TEXT NOT NULL,

    CONSTRAINT "volunteer_interest_pkey" PRIMARY KEY ("submissionId","interestAreaId")
);

-- CreateTable
CREATE TABLE "system_setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_setting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "notice_type_createdAt_idx" ON "notice"("type", "createdAt");

-- CreateIndex
CREATE INDEX "volunteer_submission_status_createdAt_idx" ON "volunteer_submission"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "interest_area_name_key" ON "interest_area"("name");

-- CreateIndex
CREATE UNIQUE INDEX "interest_area_slug_key" ON "interest_area"("slug");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notice" ADD CONSTRAINT "notice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_interest" ADD CONSTRAINT "volunteer_interest_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "volunteer_submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_interest" ADD CONSTRAINT "volunteer_interest_interestAreaId_fkey" FOREIGN KEY ("interestAreaId") REFERENCES "interest_area"("id") ON DELETE CASCADE ON UPDATE CASCADE;
