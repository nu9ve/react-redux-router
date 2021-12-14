
import logo from '../logo.svg';
import {TopicCardList} from '../components/TopicList';

export function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>de que quieres escribir?</h2>
        {/* <Card title="heello" body="anyone there?" /> */}
        <TopicCardList />
      </header>
    </div>
  );
}