import { combineReducers } from 'redux';
import token from './token-reducer';
import users from './users-reducer';
import subAssy from './sub-assy-reducer';

export default combineReducers({ token, users, subAssy });
