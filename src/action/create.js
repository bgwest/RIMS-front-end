import superagent from 'superagent';
import * as routes from '../routes';


export const createPart = part => (store) => {
  return superagent.post(`${API_URL}${routes.PARTS_BACKEND}`)
      .send(part)
      .then((response) => {
        console.log(response);
      }).catch(console.error);
};
