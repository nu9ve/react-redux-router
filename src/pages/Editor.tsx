
import { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import config from '../config.json';

export function Editor() {
  const navigate = useNavigate();
  let { topicId }: any = useParams();
  const [error, setError] = useState(null);
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [topicName,setTopicName] = useState('');

  useEffect(() => {
    fetch(`${config.SERVER_URL}/topic`)
      .then(res => res.json())
      .then(
        (ts) => {
          // setIsLoaded(true);
          if(ts != null){
            for (const t of ts) {
              if(t.id === topicId){
                setTopicName(t.name)
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
  },[])


  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setTitleInput(newValue);
  }

  const handleBodyInputChange = (e: ChangeEvent<HTMLTextAreaElement>)=> {
    const newValue = e.target.value;
    setBodyInput(newValue);
  }
  const handleCreate = (event: MouseEvent) => {
    if(titleInput === ""){
      alert('title cant be empty')
      return
    }
    if(bodyInput === ""){
      alert('body cant be empty')
      return
    }

    const topicPostUrl = `${config.SERVER_URL}/essay`;
    const postBody = {
        title: titleInput,
        body: bodyInput,
        topic: topicId
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };

    fetch(topicPostUrl, requestMetadata)
        .then(res => res.json())
        .then(response => {
            console.log('topic post response');
            console.log(response);
            setTitleInput('')
            setBodyInput('')
            navigate('/')
        });

    
  }

  return <div>
      <h2>Edit for {topicName}</h2>
      <div>
        Title:  
        <input value={titleInput} 
               type="text"
               onChange={handleTitleInputChange}/>
      </div>
      <div>
        Body:
        <br/>
        <textarea value={bodyInput} onChange={handleBodyInputChange}></textarea>
      </div>
      <div>
        <button onClick={handleCreate}>Create</button>
      </div>
    </div>
}