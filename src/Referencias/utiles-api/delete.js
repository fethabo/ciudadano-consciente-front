import axios from 'nodeModulesTemp/axios';
import { headerDelta } from './headers';

export async function deleteRequestDelta(token, url) {
    const headers = headerDelta(token);
    const { data } = await axios.delete(url, headers);
    return data;
}