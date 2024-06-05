import axios from 'nodeModulesTemp/axios';
import { headerDelta, headerDeltaFormData } from './headers';

export async function putRequestDelta(token, url, payload) {
    const headers = headerDelta(token);
    const { data } = await axios.put(url, payload, headers);
    return data;
}

export async function putRequestDeltaFormData(token, url, payload) {
    const headers = headerDeltaFormData(token);
    const { data } = await axios.put(url, payload, headers);
    return data;
}