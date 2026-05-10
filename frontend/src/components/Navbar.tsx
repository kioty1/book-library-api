import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 px-6 py-4 shadow-sm">
      <div className="flex gap-3">
        <Link to="/books">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Books
          </button>
        </Link>

        <Link to="/books/new">
          <button className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
            Add Book
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;