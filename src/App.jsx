import { Link, useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators.jsx';
import ViewCreator from './pages/ViewCreator.jsx';
import EditCreator from './pages/EditCreator.jsx';
import AddCreator from './pages/AddCreator.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  // Routes are ranked by specificity, not array order, so /new correctly wins
  // over /creators/:id without needing to be listed first.
  const element = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/new', element: <AddCreator /> },
    { path: '/creators/:id', element: <ViewCreator /> },
    { path: '/creators/:id/edit', element: <EditCreator /> },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <div className="container">
      <header className="site-header">
        <hgroup>
          <h1>
            <Link to="/" className="site-title">
              Creatorverse
            </Link>
          </h1>
          <p>Six people worth following, and room for more.</p>
        </hgroup>
        <nav>
          <ul>
            <li>
              <Link to="/" role="button" className="secondary">
                View all creators
              </Link>
            </li>
            <li>
              <Link to="/new" role="button">
                Add a creator
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{element}</main>
    </div>
  );
}

export default App;
