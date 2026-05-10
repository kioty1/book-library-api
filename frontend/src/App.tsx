import { Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BooksPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/new" element={<AddBookPage />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/books/:id/edit" element={<EditBookPage />} />
    </Routes>
  );
}

export default App;