import { combineReducers } from 'redux';
import token from './token-reducer';
import users from './users-reducer';
import subAssy from './sub-assy-reducer';
import parts from './parts-reducer';

export default combineReducers({ token, users, subAssy, parts });
