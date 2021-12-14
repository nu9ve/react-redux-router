import { Dispatch } from 'redux';
import axios from 'axios';

import config from '../config.json';
import { 
  ContentDispatchTypes, 
  CONTENT_ERROR, CONTENT_SUCCESS, CONTENT_LOADING, CONTENT_CLEAN,
  TOPICS_SUCCESS, TOPICS_CREATE_SUCCESS, ESSAYS_SUCCESS,
  TOPIC_INPUT_UPDATE,
  TopicPayload 
} from '../types/content';


// ths functions / actions are used at componets through dispatch
export const getTopics = () => async (dispatch: Dispatch<ContentDispatchTypes>) => {
  try {
    dispatch({
      type: CONTENT_LOADING
    });
    const res = await axios.get(`${config.SERVER_URL}/topic`);
    dispatch({
      type: TOPICS_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: CONTENT_ERROR
    });
  }
};

export const getEssays = (topicId: string) => async (dispatch: Dispatch<ContentDispatchTypes>) => {
  try {
    dispatch({
      type: CONTENT_LOADING
    });
    const res = await axios.get(`${config.SERVER_URL}/essay/topic/${topicId}`);
    dispatch({
      type: ESSAYS_SUCCESS,
      payload: res.data,
      topic: topicId
    });
  } catch (e) {
    dispatch({
      type: CONTENT_ERROR
    });
  }
};

export const createTopic = (topicData: TopicPayload) => async (dispatch: Dispatch<ContentDispatchTypes>) => {
  try {
    dispatch({
      type: CONTENT_LOADING
    });
    const res = await axios({
      method: 'post',
      url:`${config.SERVER_URL}/topic`,
      data: topicData
    });
    dispatch({
      type: TOPICS_CREATE_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: CONTENT_ERROR
    });
  }
};

export const updateTopicInput = (topicName: string) => async (dispatch: Dispatch<ContentDispatchTypes>) => {
  try {
    dispatch({
      type: TOPIC_INPUT_UPDATE,
      payload: topicName
    });
  } catch (e) {
    dispatch({
      type: CONTENT_ERROR
    });
  }
}; 


