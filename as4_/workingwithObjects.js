bookLibrary = {
  books: [{ title: "The Alchemist", auther: "Paulo Coelho", yearOfPublish: 5 }],
};

function addBook(book) {
  bookLibrary.books.push(book);
}

function removeBook(title) {
  bookLibrary.books = bookLibrary.books.filter((book) => book.title !== title);
}

function getBooksByAuthor(auther) {
  return bookLibrary.books.find((book) => book.auther === auther);
}

function getAllbooks() {
  return bookLibrary.books;
}

console.log(getAllbooks());
console.log(getBooksByAuthor("Paulo Coelho"));
console.log(removeBook("The Alchemist"));
console.log(getAllbooks());
console.log(
  addBook({
    title: "how to code without code in coding ",
    auther: "Yashodip",
    yearOfPublish: 5,
  })
);
console.log(getAllbooks());
