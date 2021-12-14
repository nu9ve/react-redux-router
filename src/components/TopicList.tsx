import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { rootStore } from '../store';
import { Topic, TopicPayload } from '../types/content';
import { getTopics, createTopic, updateTopicInput } from '../actions/content';
import { EssayList } from './EssayList';


const TopicCard = ({topic}:{topic:Topic}) => {
  const [isOpen, setIsOpen] = useState(false);

  const expandTopic = (event: MouseEvent) => {
    setIsOpen(!isOpen);
  }

  return <li>
    <span onClick={expandTopic}>{topic.name}</span>
    <Link className="go-write-link" to={`/create/${topic.id}`}>
      escribir
    </Link>
    {isOpen ? <EssayList topic={topic}/> : null }
  </li>
}



export const TopicCardList = () => {
  const dispatch = useDispatch();
  const contentStore = useSelector((state: rootStore) => state.content)

  useEffect(() => {
    dispatch(getTopics())
  }, [])

  const handleClick = (event: MouseEvent) => {
    if(contentStore.topicInput === ""){
      return;
    }
    event.preventDefault();
    let topic: TopicPayload = {
      name: contentStore.topicInput
    }
    dispatch(createTopic(topic))
  }

  const handleTopicInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    dispatch(updateTopicInput(newValue));
 }

  return <div>
    <div>{contentStore.error}</div>
    <ul className="topic-list">
      {contentStore.topics.map((t:Topic, i:number) => {
        return <TopicCard key={t.id} topic={t}/>
      })}
    </ul>
    <div>
      <input value={contentStore.topicInput} 
             type="text"
             onChange={handleTopicInputChange}/>
      <button onClick={handleClick}>crear tema</button>
    </div>
    </div>
}
