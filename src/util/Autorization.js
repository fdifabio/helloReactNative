import {environment} from '../environments/environment';

const Authorization = {
    headers: {
        'Authorization': environment.authorization,
    },
};

export default Authorization;
