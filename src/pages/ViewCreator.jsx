import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCreator, getCreatorById } from '../services/creators';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetching by id here (rather than filtering a list passed down from a
  // parent) is what makes /creators/3 work when pasted into a fresh tab.
  // Depending on [id] also means navigating straight between two creators
  // refetches instead of showing the previous one's data.
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        setCreator(await getCreatorById(id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${creator.name}? This cannot be undone.`)) return;

    setDeleting(true);
    try {
      await deleteCreator(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  if (loading) return <article aria-busy="true">Loading creator…</article>;

  if (error) {
    return (
      <article className="error-panel">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <Link to="/">Back to all creators</Link>
      </article>
    );
  }

  if (!creator) {
    return (
      <article>
        <h2>Creator not found</h2>
        <p>There is no creator with the id {id}.</p>
        <Link to="/" role="button">
          Back to all creators
        </Link>
      </article>
    );
  }

  return (
    <article className="creator-detail">
      {creator.imageURL && (
        <img
          className="creator-detail__image"
          src={creator.imageURL}
          alt={creator.name}
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}

      <h2>{creator.name}</h2>
      <p>{creator.description}</p>

      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          {creator.url}
        </a>
      </p>

      <footer className="creator-detail__actions">
        <Link to={`/creators/${creator.id}/edit`} role="button">
          Edit
        </Link>
        <button type="button" className="secondary" onClick={handleDelete} aria-busy={deleting} disabled={deleting}>
          Delete
        </button>
        <Link to="/" role="button" className="contrast outline">
          Back
        </Link>
      </footer>
    </article>
  );
}

export default ViewCreator;
