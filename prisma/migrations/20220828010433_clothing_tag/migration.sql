-- AlterTable
ALTER TABLE "Clothing" ADD COLUMN     "tagId" INTEGER;

-- CreateTable
CREATE TABLE "ClothingTag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClothingTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ClothingTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClothingTag" ADD CONSTRAINT "ClothingTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
