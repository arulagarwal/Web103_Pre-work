import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <article>
      <h2>Page not found</h2>
      <p>That page is not part of the Creatorverse.</p>
      <Link to="/" role="button">
        Back to all creators
      </Link>
    </article>
  );
}

export default NotFound;
