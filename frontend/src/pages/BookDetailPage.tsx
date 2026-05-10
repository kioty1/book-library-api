import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getBookById, getBookReviews, getAverageRating,
    type Book,
    type Review,
} from "../api";

function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);

    useEffect(() => {
        if (!id) return;

        getBookById(id)
            .then((data) => {
                setBook(data);
            })
            .catch((error) => {
                console.error("Book error:", error);
            });

        getBookReviews(id)
            .then((data) => {
                setReviews(data ?? []);
            })
            .catch((error) => {
                console.error("Reviews error:", error);
            });

        getAverageRating(id)
            .then((data) => {
                setAverageRating(data);
            })
            .catch((error) => {
                console.error("Average rating error:", error);
            });
    }, [id]);

    if (!book) {
        return <p style={{ padding: "30px" }}>Loading...</p>;
    }

    return (
        <div style={{ padding: "30px", background: "white", color: "black" }}>
            <h1>{book.title}</h1>

            <p><strong>ID:</strong> {book.id}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Year:</strong> {book.publishedYear}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Pages:</strong> {book.pageCount}</p>

            <p><strong>Description:</strong></p>
            <p>{book.description}</p>

            <p>
                <strong>Author:</strong> {book.author?.firstName} {book.author?.lastName}
            </p>

            <p>
                <strong>Publisher:</strong> {book.publisher?.name}
            </p>

            <p>
                <strong>Genres:</strong> {book.genres?.map((g) => g.name).join(", ")}
            </p>

            <h2>Average rating</h2>
            <p>{averageRating} / 5</p>

            <h2>Reviews</h2>

            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map((review) => (
                    <div
                        key={review.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <p><strong>User:</strong> {review.userName}</p>
                        <p><strong>Rating:</strong> {review.rating}/5</p>
                        <p>{review.comment}</p>
                    </div>
                ))
            )}

            <Link to={`/books/${book.id}/edit`}>
                <button>Muuda</button>
            </Link>

            <Link to="/books">
                <button>Tagasi nimekirja</button>
            </Link>
        </div>
    );
}

export default BookDetailPage;