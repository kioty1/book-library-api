import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../api";

function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [genres, setGenres] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    getBookById(id).then((book) => {
      setTitle(book.title);
      setIsbn(book.isbn);
      setPublishedYear(String(book.publishedYear));
      setPageCount(String(book.pageCount));
      setLanguage(book.language);
      setDescription(book.description ?? "");
      setAuthorId(book.author?.id ?? "");
      setPublisherId(book.publisher?.id ?? "");
      setGenres(book.genres?.map((genre) => genre.id).join(", ") ?? "");
    });
  }, [id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) return;

    updateBook(id, {
      title,
      isbn,
      publishedYear: Number(publishedYear),
      pageCount: Number(pageCount),
      language,
      description,
      authorId,
      publisherId,
      genres: genres.split(",").map((genre) => genre.trim()),
    })
      .then(() => {
        navigate(`/books/${id}`);
      })
      .catch((error) => {
        console.error("Update book error:", error);

        if (error.response?.data?.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("Failed to update book");
        }
      });
  };

  return (
    <div style={{ padding: "30px", background: "white", color: "black" }}>
      <h1>Muuda raamatut</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>ISBN</label>
          <br />
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>

        <div>
          <label>Year</label>
          <br />
          <input
            type="number"
            max="9999"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
          />
        </div>

        <div>
          <label>Pages</label>
          <br />
          <input
            type="number"
            max="10000"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          />
        </div>

        <div>
          <label>Language</label>
          <br />
          <input value={language} onChange={(e) => setLanguage(e.target.value)} />
        </div>

        <div>
          <label>Description</label>
          <br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>Author ID</label>
          <br />
          <input value={authorId} onChange={(e) => setAuthorId(e.target.value)} />
        </div>

        <div>
          <label>Publisher ID</label>
          <br />
          <input value={publisherId} onChange={(e) => setPublisherId(e.target.value)} />
        </div>

        <div>
          <label>Genres</label>
          <br />
          <input
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            placeholder="genre-1, genre-2"
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <br />

        <button type="submit">Salvesta muudatused</button>
      </form>

      <br />

      <Link to={id ? `/books/${id}` : "/books"}>
        <button>Tagasi</button>
      </Link>
    </div>
  );
}

export default EditBookPage;