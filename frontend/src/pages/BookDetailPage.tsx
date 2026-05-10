import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getBookById,
  getBookReviews,
  getAverageRating,
  createReview,
  type Book,
  type Review,
} from "../api";

function BookDetailPage() {
  const { id } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    // Загружаем книгу
    getBookById(id, { signal: controller.signal })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error("Book error:", error);
      });

    // Загружаем отзывы
    getBookReviews(id, { signal: controller.signal })
      .then((data) => {
        setReviews(data ?? []);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error("Reviews error:", error);
      });

    // Загружаем средний рейтинг
    getAverageRating(id, { signal: controller.signal })
      .then((data) => {
        setAverageRating(data);
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error("Average rating error:", error);
      });

    return () => controller.abort(); // Отмена всех запросов при размонтировании
  }, [id]);

  const handleReviewSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!id) return;

    setReviewError("");

    createReview(id, {
      userName,
      rating: Number(rating),
      comment,
    })
      .then(() => {
        setUserName("");
        setRating("5");
        setComment("");

        // Перезагружаем отзывы и рейтинг после добавления нового отзыва
        const controller = new AbortController();

        getBookReviews(id, { signal: controller.signal })
          .then((data) => {
            setReviews(data ?? []);
          })
          .catch((error) => {
            if (error.name === 'AbortError') return;
            console.error("Reviews reload error:", error);
          });

        getAverageRating(id, { signal: controller.signal })
          .then((data) => {
            setAverageRating(data);
          })
          .catch((error) => {
            if (error.name === 'AbortError') return;
            console.error("Average rating reload error:", error);
          });
      })
      .catch((error) => {
        console.error("Create review error:", error);

        if (error.response?.data?.error) {
          setReviewError(error.response.data.error);
        } else {
          setReviewError("Failed to add review");
        }
      });
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold text-slate-900 mb-6" style={{ color: "#111827" }}>
        {book.title}
      </h1>

      <div className="card">
        <p><strong>ID:</strong> {book.id}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Year:</strong> {book.publishedYear}</p>
        <p><strong>Language:</strong> {book.language}</p>
        <p><strong>Pages:</strong> {book.pageCount}</p>

        <p><strong>Description:</strong></p>
        <p>{book.description}</p>

        <p>
          <strong>Author:</strong>{" "}
          {book.author?.firstName} {book.author?.lastName}
        </p>

        <p>
          <strong>Publisher:</strong> {book.publisher?.name}
        </p>

        <p>
          <strong>Genres:</strong>{" "}
          {book.genres?.map((g) => g.name).join(", ")}
        </p>
      </div>

      <div className="card">
        <h2>Average rating</h2>
        <p>{averageRating} / 5</p>
      </div>

      <div className="card">
        <h2>Add review</h2>

        <form onSubmit={handleReviewSubmit}>
          <div>
            <label>User name</label>
            <br />
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Rating</label>
            <br />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div style={{ marginTop: "10px" }}>
            <label>Comment</label>
            <br />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {reviewError && (
            <p style={{ color: "red" }}>{reviewError}</p>
          )}

          <button type="submit" style={{ marginTop: "10px" }}>
            Lisa arvustus
          </button>
        </form>
      </div>

      <h2>Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="card">
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