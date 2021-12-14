
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import {useParams, useHistory} from "react-router-dom";
import config from '../config.json';
import { Essay } from '../types/content';

export function Reader() {
  const history = useHistory();
  let { essayId }: any = useParams();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic,setTopic] = useState('');

  useEffect(() => {
    fetch(`${config.SERVER_URL}/essay/${essayId}`)
      .then(res => res.json())
      .then(
        (essay:Essay) => {
          // setIsLoaded(true);
          if(essay != null){
            setTitle(essay.title)
            setBody(essay.body) 
            fetch(`${config.SERVER_URL}/topic`)
            .then(res => res.json())
            .then(
              (ts) => {
                // setIsLoaded(true);
                if(ts != null){
                  for (const t of ts) {
                    if(t.id === essay.topic){
                      setTopic(t.name)
                    }
                  }
                  // setTopics(ts);            
                }
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                // setIsLoaded(true);
                // setError(error);
              }
            )

          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      )
  },[])

  return <div>
      <h2>{topic} - {title}</h2>
      <div>
        {body}
      </div>
    </div>
}