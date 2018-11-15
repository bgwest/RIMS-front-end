import superagent from 'superagent';
import React from 'react';
import * as routes from '../routes';

export const set = users => ({
  type: 'USER_LIST_SET',
  payload: users,
});

export const subAssySet = subAssys => ({
  type: 'SUB_ASSY_SET',
  payload: subAssys,
});

export const partSet = parts => ({
  type: 'PART_SET',
  payload: parts,
});

export const getUsers = users => (store) => {
  return superagent.get(`${API_URL}${routes.ACCOUNTS_BACKEND}`)
    .then((userData) => {
      userData = JSON.parse(userData.text);
      return userData.dbQuery.map((eachUser) => {
        if (eachUser.username !== 'admin') {
          return eachUser;
        } // else if admin...
        return {
          _id: '!prohibited',
          isAdmin: '!prohibited',
          recoveryQuestion: '!prohibited',
          username: '!prohibited', 
        };
      });
    }).then((finalMap) => {
      console.log('finalmap');
      console.log(finalMap);
      return store.dispatch(set(finalMap));
    }).catch(console.error);
};

export const getSubAssy = subAssy => (store) => {
  return superagent.get(`${API_URL}${routes.SUBASSY_BACKEND}`)
    .then((subAssyData) => {
      subAssyData = JSON.parse(subAssyData.text);
      return subAssyData.dbQuery.map((eachSubAssy) => {
        return eachSubAssy;
      });
    }).then((finalMap) => {
      console.log('finalmap');
      console.log(finalMap);
      return store.dispatch(subAssySet(finalMap));
    }).catch(console.error);
};

export const getParts = parts => (store) => {
  return superagent.get(`${API_URL}${routes.PARTS_BACKEND}`)
    .then((partData) => {
      partData = JSON.parse(partData.text);
      return partData.dbQuery.map((eachPart) => {
        return eachPart;
      });
    }).then((finalPartMap) => {
      console.log('finalPartMap');
      console.log(finalPartMap);
      return store.dispatch(partSet(finalPartMap));
    }).catch(console.error);
};
