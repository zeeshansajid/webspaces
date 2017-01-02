import { combineReducers } from 'redux';
import workspacesReducer from './workspaces_reducer';

const rootReducer = combineReducers({
  workspaces: workspacesReducer,
});

export default rootReducer;
