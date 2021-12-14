// import * as types from '../../types/newTypes';
import { 
  ContentDispatchTypes, 
  CONTENT_CLEAN, CONTENT_ERROR, CONTENT_SUCCESS, CONTENT_LOADING,
  TOPICS_SUCCESS, TOPICS_CREATE_SUCCESS, TOPIC_INPUT_UPDATE,
  ESSAYS_SUCCESS,
  Topic, Essay
} from '../types/content';


interface ContentStateI {
  topics: Topic[],
  essays: {
    [key:string]: any
  },
  topicInput: string,
  
  loading: boolean,
  error: any;
  message?: string;
};

const contentState: ContentStateI = {
  topics: [],
  essays: {},
  topicInput: '',
  
  loading: false,
  error: null,
  message: ''
};


const contentReducer = (state: ContentStateI = contentState, action: ContentDispatchTypes) : ContentStateI => {
  switch(action.type) {
    case CONTENT_ERROR:
      // console.log('at user error', action);
      return {
        ...state,
        loading: false,
        message: action.message || '',
      }

    case CONTENT_LOADING:
      return {
        ...state,
        loading: true
      }

    case CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'success',
        ...action.payload
      }
    
    case TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'success',
        topics: [...action.payload]
      }

    case TOPIC_INPUT_UPDATE:
      return {
        ...state,
        topicInput: action.payload
      }
      
    case TOPICS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'success',
        topics: [...state.topics, action.payload],
        topicInput: ''
      }
    
    case ESSAYS_SUCCESS:
      let topic = action.topic;
      return {
        ...state,
        essays: {
          ...state.essays,
          [topic]: [...action.payload]
        }
      }

    case CONTENT_CLEAN:
      return contentState;

    default:
      return state;
  }
};

export default contentReducer


