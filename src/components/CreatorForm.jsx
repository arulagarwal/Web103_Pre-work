// Shared by AddCreator and EditCreator. Fully controlled by the parent: it owns
// the values, this owns the markup.
//
// The handler lives on <form onSubmit> rather than on the button's onClick so
// that HTML5 `required` validation and Enter-to-submit both keep working.
function CreatorForm({ values, onChange, onSubmit, submitLabel, disabled }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={onChange}
          placeholder="Fireship"
          required
        />
      </label>

      <label htmlFor="url">
        Channel or page URL
        <input
          id="url"
          name="url"
          type="url"
          value={values.url}
          onChange={onChange}
          placeholder="https://www.youtube.com/@Fireship"
          required
        />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          id="description"
          name="description"
          rows="4"
          value={values.description}
          onChange={onChange}
          placeholder="What do they make, and why is it worth watching?"
          required
        />
      </label>

      {/* Column name is camelCase in Postgres, so this must match exactly. */}
      <label htmlFor="imageURL">
        Image URL <small>(optional)</small>
        <input
          id="imageURL"
          name="imageURL"
          type="url"
          value={values.imageURL}
          onChange={onChange}
          placeholder="https://example.com/avatar.jpg"
        />
      </label>

      <button type="submit" aria-busy={disabled} disabled={disabled}>
        {submitLabel}
      </button>
    </form>
  );
}

export default CreatorForm;
