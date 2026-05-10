import { Link } from "react-router-dom";
import type { Book } from "../api";

type Props = {
  book: Book;
  onDelete: (id: string) => void;
};

function BookCard({ book, onDelete }: Props) {
  return (
    <div className="card">
      <h2>{book.title}</h2>

      <p>Language: {book.language}</p>
      <p>Year: {book.publishedYear}</p>

      <Link to={`/books/${book.id}`}>
        <button>Vaata</button>
      </Link>

<button
  style={{ marginLeft: "10px" }}
  onClick={() => {
    if (window.confirm("Delete this book?")) {
      onDelete(book.id);
    }
  }}
>
  Kustuta
</button>
    </div>
  );
}



export default BookCard;