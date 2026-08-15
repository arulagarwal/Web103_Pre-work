import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteCreator, getCreatorById, updateCreator } from '../services/creators';
import CreatorForm from '../components/CreatorForm.jsx';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const creator = await getCreatorById(id);

        // Columns are nullable, and a null would flip a controlled input to
        // uncontrolled mid-render, so coalesce everything to a string.
        setForm(
          creator && {
            name: creator.name ?? '',
            url: creator.url ?? '',
            description: creator.description ?? '',
            imageURL: creator.imageURL ?? '',
          },
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await updateCreator(id, {
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      });
      navigate(`/creators/${id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${form.name}? This cannot be undone.`)) return;

    setSubmitting(true);
    try {
      await deleteCreator(id);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <article aria-busy="true">Loading creator…</article>;

  if (error && !form) {
    return (
      <article className="error-panel">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <Link to="/">Back to all creators</Link>
      </article>
    );
  }

  if (!form) {
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
    <section>
      <hgroup>
        <h2>Edit {form.name}</h2>
        <p>Fix a typo, swap the link, or find a better picture.</p>
      </hgroup>

      {error && (
        <article className="error-panel">
          <strong>Could not save.</strong> {error}
        </article>
      )}

      <CreatorForm
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel={submitting ? 'Saving…' : 'Save changes'}
        disabled={submitting}
      />

      <footer className="edit-actions">
        <button type="button" className="secondary" onClick={handleDelete} disabled={submitting}>
          Delete creator
        </button>
        <Link to={`/creators/${id}`}>Cancel</Link>
      </footer>
    </section>
  );
}

export default EditCreator;
