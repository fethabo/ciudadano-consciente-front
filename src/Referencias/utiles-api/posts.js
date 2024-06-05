import axios from 'nodeModulesTemp/axios';
import { headerDelta, headerDeltaFormData, headerIntranetFormData,headerIntranet, headerDeltaDocumento } from './headers';



export async function postRequestDelta(token, url, payload) {
    const headers = headerDelta(token);
    const { data } = await axios.post(url, payload, headers);
    return data;
}

export async function postRequestDeltaFormData(token, url, payload) {
    const headers = headerDeltaFormData(token);
    const { data } = await axios.post(url,payload,headers);
    return data;
}
export async function postRequestIntranetFormData(token, url, payload) {
    const headers = headerIntranetFormData();
    const { data } = await axios.post(url, payload, headers);
    return data;
}

export async function postRequestIntranet(token, url, payload) {
    const headers = headerIntranet();
    const { data } = await axios.post(url, payload, headers);
    return data;
}

export async function postRequestDeltaDocumento(token, url, payload) {
    const headers = headerDeltaDocumento(token);
    const { data } = await axios.post(url, payload, headers);
    return data;
}