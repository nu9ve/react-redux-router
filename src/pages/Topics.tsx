import {
  Routes,
  Route,
  Link,
  useMatch,
  useParams
} from "react-router-dom";


export function Topics() {
  let match = useMatch('topics');

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`/topics/components`}>Components</Link>
        </li>
        <li>
          <Link to={`/topics/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Routes> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Routes>
        <Route path={`/topics/:topicId`}>
          <TopicPage />
        </Route>
        <Route path='/topics'>
          <h3>Please select a topic.</h3>
        </Route>
      </Routes>
    </div>
  );
}

function TopicPage() {
  let { topicId }: any = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
