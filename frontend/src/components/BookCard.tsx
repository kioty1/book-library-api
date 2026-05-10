import { Link } from "react-router-dom";
import type { Book } from "../api";

type Props = {
  book: Book;
  onDelete: (id: string) => void;
};

function BookCard({ book, onDelete }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px" }}>
      <h2>{book.title}</h2>

      <p>Language: {book.language}</p>
      <p>Year: {book.publishedYear}</p>

      <Link to={`/books/${book.id}`}>
        <button>Vaata</button>
      </Link>

 <button
  style={{ marginLeft: "10px" }}
  onClick={() => onDelete(book.id)}
>
  Kustuta
</button>
    </div>
  );
}

export default BookCard;