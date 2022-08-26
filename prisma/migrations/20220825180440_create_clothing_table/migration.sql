/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Clothing" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "minDegree" INTEGER NOT NULL,
    "maxDegree" INTEGER NOT NULL,

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clothing_imgUrl_key" ON "Clothing"("imgUrl");

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
