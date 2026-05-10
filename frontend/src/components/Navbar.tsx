import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/books">
        <button>Books</button>
      </Link>

      <Link to="/books/new">
        <button>Add Book</button>
      </Link>
    </nav>
  );
}

export default Navbar;