-- CreateIndex
CREATE INDEX "Book_title_author_isbn_idx" ON "Book"("title", "author", "isbn");
