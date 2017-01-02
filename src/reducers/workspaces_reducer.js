import {
  FETCH_WORKSPACES_DATA,
  FETCH_WORKSPACES_DATA_SUCCESS,
  FETCH_WORKSPACES_DATA_FAILURE,
  SORT_WORKSPACES_DATA
} from '../actions/types';

import _ from 'underscore'

export default function(state = {}, action) {
  var sortedData = [];
  switch(action.type) {
    case FETCH_WORKSPACES_DATA:
      return { ...state, loader: true };
   
    case FETCH_WORKSPACES_DATA_SUCCESS:
          sortedData = _.sortBy(action.payload, function (obj) { 
            let fav = 2;
            if(obj.favorite === 1)
              fav = 1;
            return fav +" "+ obj.name.toUpperCase();  
          });
      return { ...state, data: sortedData, loader: false };
   
    case FETCH_WORKSPACES_DATA_FAILURE:
      return { ...state, data: [], error: action.payload, loader: false };

    case SORT_WORKSPACES_DATA:

      if(action.payload === 'name')
          sortedData = _.sortBy(state.data, function (obj) { return obj.name.toUpperCase(); });
      else if(action.payload === 'owner') {
          sortedData = _.sortBy(state.data, function (obj) { 
              return obj.workspace_owner.first_name.toLowerCase() +" "+ obj.workspace_owner.last_name.toLowerCase()  
            });
      }
      else if(action.payload === 'modified') {
          sortedData = _.sortBy(state.data, function (obj) { return obj.created_at; }, 'desc');
          sortedData = sortedData.reverse();
      }
      else if(action.payload === 'favorites') {
          sortedData = _.sortBy(state.data, function (obj) { 
            let fav = 2;
            if(obj.favorite === 1)
              fav = 1;
            return fav +" "+ obj.name.toUpperCase();  
          });
      }
      return {...state, data: sortedData};

  }
  return state;
}
