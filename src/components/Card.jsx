import { Link } from 'react-router-dom';

// The channel link and the details link are deliberately siblings. Wrapping the
// whole card in a <Link> with an <a> inside would nest anchors, which HTML
// forbids -- browsers reflow it unpredictably and the router hijacks the click.
function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article className="creator-card">
      {imageURL && (
        <img
          className="creator-card__image"
          src={imageURL}
          alt={name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      )}

      <div className="creator-card__body">
        <h3>{name}</h3>
        <p>{description}</p>

        <a href={url} target="_blank" rel="noreferrer" className="creator-card__channel">
          Visit channel &#8599;
        </a>
      </div>

      <footer className="creator-card__actions">
        <Link to={`/creators/${id}`} role="button">
          View details
        </Link>
        <Link to={`/creators/${id}/edit`} role="button" className="secondary outline">
          Edit
        </Link>
      </footer>
    </article>
  );
}

export default Card;
