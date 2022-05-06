import {environment} from '../environment';
import autorization from './Autorization';

let api = environment.baseURL;

export const getAll = (): Promise<Location[]> => {
    fetch(api + 'api/locations', autorization)
        .then(res => res.json())
        .then(resJson => {
            return resJson.content?.map(l => new Location(l));
        }).catch(e => console.log(e));
};
export const getById = async (id: number) => {
    let response = await fetch(api + 'api/locations/' + id, autorization);
    let json = await response.json();
    return new Location(json);
};
