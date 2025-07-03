<h1>Library API</h1>

<p>
A simple Node.js + Express API for managing a library system. This API allows users to do crud operation on books, as well as user can borrow them. It’s perfect for understanding RESTful routes and how to work with MongoDB using Mongoose.
</p>

<h4>
Features:
</h4>

<ul>
<li>Add a new book</li>
<li>Get all books with optional filtering using query parameters</li>
<li>Get a single book by ID</li>
<li>Update book information</li>
<li>Delete a book</li>
<li>Borrow a book (save book ID, quantity, and due date)</li>
<li>Get a list of all borrowed books with book title, isbn, and total borrowed quantity per books.</li>
</ul>

<h4>
Technology Used:
</h4>
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>MongoDB + Mongoose</li>
<li>Typescript</li>
</ul>

<h4>
How to use this project locally ?
</h4>

- Clone the project
- Open project terminal
- npm install
- npm run dev

<h4>
Endpoints:
</h4>

* baseUrl/books => Method : GET (To get all the books) 
* baseUrl/books?filter=COMMERCE&sortBy=createdAt&sort=desc&limit=5 => Method : GET >(To get specific books with query params) 
* baseUrl/books/:bookId => Method : Patch (To update any data in book table) 
* baseUrl/books/:bookId => Method : Delete (To delete any data from book table)
* baseUrl/borrow => Method : Post (Send {book: book_id, quantity: number, dueDate: Date} this data with the api body to borrow a book)
* baseUrl/borrow => Method : Get (Can get book title, isbn and count of borrows per book).
