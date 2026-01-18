/*
  Warnings:

  - You are about to drop the column `return` on the `Borrowing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Borrowing" DROP COLUMN "return",
ADD COLUMN     "checkedOutAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "returnedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Borrowing_bookId_idx" ON "Borrowing"("bookId");

-- CreateIndex
CREATE INDEX "Borrowing_borrowerId_idx" ON "Borrowing"("borrowerId");

-- CreateIndex
CREATE INDEX "Borrowing_borrowerId_returnedAt_idx" ON "Borrowing"("borrowerId", "returnedAt");

-- CreateIndex
CREATE INDEX "Borrowing_dueDate_returnedAt_idx" ON "Borrowing"("dueDate", "returnedAt");
