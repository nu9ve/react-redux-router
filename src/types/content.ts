export const CONTENT_FETCH = 'CONTENT/FETCH';
export const CONTENT_ERROR = 'CONTENT/ERROR';
export const CONTENT_SUCCESS = 'CONTENT/SUCCESS';
export const CONTENT_LOADING = 'CONTENT/LOADING';
export const CONTENT_CLEAN = 'CONTENT/CLEAN';
export const TOPICS_SUCCESS = 'TOPICS/SUCCESS';
export const TOPICS_CREATE_SUCCESS = 'TOPICS/CREATE/SUCCESS';
export const TOPIC_INPUT_UPDATE = 'TOPICS/INPUT/UPDATE';
export const ESSAYS_SUCCESS = 'ESSAYS/SUCCESS';


// CONTENT TYPES
export type Topic = {
  id: string;
  name: string;
  createdAt: string;
}

export type Essay = {
  id:   string;
  title: string;
  body: string;
  topic: string;
}

export type ContentType = ContentPayload; //| ContentPayload;

export type TopicPayload = {
  name: string
};

export type ContentPayload = {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  roles?: string[];
};


// ACTION TYPES
export interface ContentFetchI {
  type: typeof CONTENT_FETCH
};

export interface ContentErrorI {
  type: typeof CONTENT_ERROR;
  message?: string;
};

export interface ContentSuccessI {
  type: typeof CONTENT_SUCCESS;
  payload: ContentPayload;
};

export interface TopicsSuccessI {
  type: typeof TOPICS_SUCCESS;
  payload: Topic[];
};

export interface TopicsCreateSuccessI {
  type: typeof TOPICS_CREATE_SUCCESS;
  payload: Topic;
};

export interface TopicInputUpdateI {
  type: typeof TOPIC_INPUT_UPDATE;
  payload: string;
};

export interface EssaysSuccessI {
  type: typeof ESSAYS_SUCCESS;
  payload: Essay[];
  topic: string;
};

export interface ContentLoadingI {
  type: typeof CONTENT_LOADING;
}

export interface ContentCleanI {
  type: typeof CONTENT_CLEAN;
};

export type ContentDispatchTypes = 
  ContentFetchI | ContentErrorI | ContentSuccessI | ContentLoadingI | ContentCleanI | 
  TopicsSuccessI | TopicsCreateSuccessI | TopicInputUpdateI | 
  EssaysSuccessI;
