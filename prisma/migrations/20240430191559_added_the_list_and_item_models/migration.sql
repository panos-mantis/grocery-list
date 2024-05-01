-- CreateTable
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "label" TEXT
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER,
    "text" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "List_id_key" ON "List"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
