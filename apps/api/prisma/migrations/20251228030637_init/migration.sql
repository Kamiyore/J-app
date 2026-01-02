-- CreateEnum
CREATE TYPE "InboxStatus" AS ENUM ('RECEIVED', 'ACTION_REQUESTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('NONE', 'SEND', 'SCAN', 'DISCARD');

-- CreateTable
CREATE TABLE "Inbox" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT,
    "status" "InboxStatus" NOT NULL DEFAULT 'RECEIVED',
    "requestedAction" "ActionType" NOT NULL DEFAULT 'NONE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inbox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inbox" ADD CONSTRAINT "Inbox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
