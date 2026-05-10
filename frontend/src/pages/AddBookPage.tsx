import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBook } from "../api";

function AddBookPage() {
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


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        createBook({
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
                navigate("/books");
            })
            .catch((error) => {
                console.error("Create book error:", error);

                if (error.response?.data?.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("Failed to create book");
                }
            });
    };

    return (
        <div style={{ padding: "30px", background: "white", color: "black" }}>
            <h1>Lisa raamat</h1>

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

                <br />
                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {errorMessage}
                    </p>
                )}

                <button type="submit">Salvesta</button>
            </form>

            <br />

            <Link to="/books">
                <button>Tagasi nimekirja</button>
            </Link>
        </div>
    );
}

export default AddBookPage;