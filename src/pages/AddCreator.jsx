import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createCreator } from '../services/creators';
import CreatorForm from '../components/CreatorForm.jsx';

const EMPTY_FORM = { name: '', url: '', description: '', imageURL: '' };

function AddCreator() {
  const navigate = useNavigate();

  // Every field starts as '' so the inputs are controlled from the first
  // render -- an undefined value would make React switch them to uncontrolled.
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createCreator({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <section>
      <hgroup>
        <h2>Add a creator</h2>
        <p>Who else belongs in the Creatorverse?</p>
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
        submitLabel={submitting ? 'Saving…' : 'Add creator'}
        disabled={submitting}
      />

      <Link to="/">Cancel</Link>
    </section>
  );
}

export default AddCreator;
