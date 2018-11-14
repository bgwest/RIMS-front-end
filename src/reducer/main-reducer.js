import { combineReducers } from 'redux';
import token from './token-reducer';
import users from './users-reducer';

export default combineReducers({ token, users });
