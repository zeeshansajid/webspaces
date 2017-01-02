import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  FETCH_WORKSPACES_DATA,
  FETCH_WORKSPACES_DATA_SUCCESS,
  FETCH_WORKSPACES_DATA_FAILURE,
  SORT_WORKSPACES_DATA
} from './types';

//const SERVER_URL = 'https://s3.amazonaws.com/misc.recruiting';
const SERVER_URL = '/src/data';

export function fetchWorkspacesData(){
 return function(dispatch) {
    axios.get(`${SERVER_URL}/workspaces.json`)
      .then(response => {
        dispatch({
          type: FETCH_WORKSPACES_DATA_SUCCESS,
          payload: response.data
        });
      }
      ).catch( () => dispatch({
          type: FETCH_WORKSPACES_DATA_FAILURE,
          payload: 'Failed to fetch workspaces data'
        })
      );
  } 
}

export function SortWorkspacesTable(sortOrder){
  return function(dispatch) {
     dispatch({
          type: SORT_WORKSPACES_DATA,
          payload: sortOrder
        });
  }
}
