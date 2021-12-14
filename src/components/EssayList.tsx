import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { rootStore } from '../store';
import { Essay, Topic } from '../types/content';
import { getEssays } from '../actions/content';



export const EssayList = ({topic}:{topic:Topic}) => {
  const dispatch = useDispatch();
  const contentStore = useSelector((state: rootStore) => state.content)
  // let topicEssays = contentStore.essays[topic.id];

  useEffect(() => {
    dispatch(getEssays(topic.id))
  }, [])

  return <ul className="essay-list">
    {contentStore.essays[topic.id] && contentStore.essays[topic.id].map((e:Essay, i:number) => {
      return <div key={e.id}><Link className="go-essay-link" to={`/read/${e.id}`} >{e.title}</Link></div>
    })}
  </ul>
  
}
