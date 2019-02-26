import superagent from 'superagent';
import * as routes from '../routes';

// how many rounds to base64 encode a value before sending
const base64Rounds = 6;

// once we move to HTTPS this will not be needed
// more extra precaution for now in case we want to deploy product for demo as HTTP
function encodeData(value, rounds) {
  let ran = 0;
  let encodedValue = value;
  while (ran !== rounds) {
    encodedValue = Buffer.from(encodedValue).toString('base64');
    ran += 1;
  }
  return encodedValue;
}

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

export const getUsers = user => (store) => {
  // testing token in store for username
  // if username, then send with request to DB
  console.log('testing for token in store w/ username:');
  let { username } = user[0];
  console.log(username);
  let saltedUserName = START_SALT;
  saltedUserName += username;
  saltedUserName += END_SALT;
  username = encodeData(saltedUserName, base64Rounds);
  return superagent.get(`${API_URL}${routes.GET_ACCOUNTS_BACKEND}`)
    .set('arbitrary', username)
    .then((userData) => {
      userData = JSON.parse(userData.text);
      // refactor so mapping only happens if user is admin
      // otherwise, we want to immediately return !prohibited object
      // this ensures only admin can generate a user list for account settings management
      // this may not be the best way to accommodate this...
      // look into handling rejection on back-end
      return userData.dbQuery.map((eachUser) => {
        if (eachUser.username === 'admin') {
          return eachUser;
        } // else if NOT admin...
        return {
          _id: '!prohibited',
          isAdmin: '!prohibited',
          recoveryQuestion: '!prohibited',
          username: '!prohibited',
        };
      });
    }).then((finalMap) => {
      return store.dispatch(set(finalMap));
    }).catch((error) => {
      console.log('action: getUsers() error:');
      return error;
    });
};

export const getSubAssy = subAssy => (store) => {
  return superagent.get(`${API_URL}${routes.GET_SUBASSYS_BACKEND}`)
    .then((subAssyData) => {
      subAssyData = JSON.parse(subAssyData.text);
      return subAssyData.dbQuery.map((eachSubAssy) => {
        return eachSubAssy;
      });
    }).then((finalMap) => {
      return store.dispatch(subAssySet(finalMap));
    }).catch(console.error);
};

export const getParts = parts => (store) => {
  return superagent.get(`${API_URL}${routes.GET_PARTS_BACKEND}`)
    .then((partData) => {
      partData = JSON.parse(partData.text);
      return partData.dbQuery.map((eachPart) => {
        return eachPart;
      });
    }).then((finalPartMap) => {
      return store.dispatch(partSet(finalPartMap));
    }).catch(console.error);
};


