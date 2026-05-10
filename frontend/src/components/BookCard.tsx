import { Link } from "react-router-dom";
import type { Book } from "../api";

type Props = {
  book: Book;
  onDelete: (id: string) => void;
};

function BookCard({ book, onDelete }: Props) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ borderColor: "#cbd5e1", backgroundColor: "#ffffff" }}
    >
      <h2
        className="text-2xl font-semibold text-slate-900 mb-2"
        style={{ color: "#111827" }}
      >
        {book.title}
      </h2>
      <p className="text-sm text-slate-600">Language: {book.language}</p>
      <p className="text-sm text-slate-600">Year: {book.publishedYear}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        <Link to={`/books/${book.id}`}>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Vaata
          </button>
        </Link>

        <button
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          onClick={() => {
            if (window.confirm("Delete this book?")) {
              onDelete(book.id);
            }
          }}
        >
          Kustuta
        </button>
      </div>
    </div>
  );
}



export default BookCard;