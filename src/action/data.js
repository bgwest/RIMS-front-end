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

export const rolesSet = roles => ({
  type: 'ROLES_SET',
  payload: roles,
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
  const { username, accountType } = user[0];
  // if username token in store, then send with request to DB
  let saltedUserName = START_SALT;
  saltedUserName += username;
  saltedUserName += END_SALT;
  saltedUserName = encodeData(saltedUserName, base64Rounds);
  return superagent.get(`${API_URL}${routes.GET_ACCOUNTS_BACKEND}`)
    .set('arbitrary', saltedUserName)
    .then((userData) => {
      userData = JSON.parse(userData.text);
      // this condition can be improved...
      if (username === 'landing' || accountType.sudo) {
        return userData.dbQuery.map((eachUser) => {
          return eachUser;
        });
      } // else, if user is !admin
      return { '!prohibited': '!prohibited' };
    }).then((finalMap) => {
      return store.dispatch(set(finalMap));
    })
    .catch((error) => {
      console.log('action: getUsers() error:');
      return error;
    });
};

export const getRoles = perms => (store) => {
  return superagent.get(`${API_URL}${routes.GET_ROLES_BACKEND}`)
    .then((roles) => {
      return store.dispatch(rolesSet(roles.body));
    })
    .catch((error) => {
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
