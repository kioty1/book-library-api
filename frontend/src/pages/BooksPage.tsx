import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getBooks,
  deleteBook,
  type Book,
  type Pagination,
} from "../api";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBooks = (pageNumber = page) => {
    setLoading(true);
    setError("");

    getBooks({
      title: title || undefined,
      year: year || undefined,
      language: language || undefined,
      sortBy,
      order,
      page: pageNumber,
      limit,
    })
      .then((response) => {
        setBooks(response.data ?? []);
        setPagination(response.pagination);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load books");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBooks(page);
  }, [page, limit]);

  const handleSearch = () => {
    setPage(1);
    loadBooks(1);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    deleteBook(id)
      .then(() => {
        loadBooks(page);
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div>
      <h1>Books</h1>


      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <input
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginLeft: "10px" }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="publishedYear">Year</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      <p>Books on this page: {books.length}</p>

      {pagination && (
        <p>
          Page {pagination.currentPage} / {pagination.totalPages} | Total books:{" "}
          {pagination.totalItems}
        </p>
      )}

      <div style={{ marginBottom: "20px" }}>
        <button
          disabled={!pagination?.hasPreviousPage}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          disabled={!pagination?.hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && books.length === 0 && (
  <p>No books found.</p>
)}

      {!loading &&
        books.map((book) => (
          <BookCard key={book.id} book={book} onDelete={handleDelete} />
        ))}
    </div>
  );
}

export default BooksPage;