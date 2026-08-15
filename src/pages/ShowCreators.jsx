import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCreators } from '../services/creators';
import Card from '../components/Card.jsx';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setCreators(await getCreators());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <article aria-busy="true">Loading creators…</article>;

  if (error) {
    return (
      <article className="error-panel">
        <h2>Could not load creators</h2>
        <p>{error}</p>
      </article>
    );
  }

  if (creators.length === 0) {
    return (
      <article>
        <h2>No creators yet</h2>
        <p>Your Creatorverse is empty. Add the first person worth following.</p>
        <Link to="/new" role="button">
          Add a creator
        </Link>
      </article>
    );
  }

  return (
    <section>
      <div className="creator-grid">
        {creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  );
}

export default ShowCreators;
