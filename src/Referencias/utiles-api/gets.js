import axios from 'nodeModulesTemp/axios';
import { headerDelta, headerDeltaFormDataDocumento, headerDeltaReporte, headerIntranet, headerIntranetDocumento } from './headers';

export async function getRequestDelta(token, url) {
    const headers = headerDelta(token);
    const { data } = await axios.get(url, headers)
    return data;
}

/**
 * 
 * @param {string} token 
 * @param {string} url 
 * @param {number || string} nroPagina 
 * @param {number || string} tamanioPagina 
 * @returns {Object} {data, totalItemsData}
 */
// Para utilizar esta request debemos tener en la api los query params cantidadElementos y nroPagina
// además para usarlo tiene que estar la regla en el apache que exponga el header items-totales
export async function getRequestPaginadoDelta(token, url, form, nroPagina, tamanioPagina) {
    const headers = headerDelta(token);
    const searchUrl = new URL(url)
    searchUrl.searchParams.set('cantidadElementos',`${tamanioPagina || 10}`);
    searchUrl.searchParams.set('nroPagina', `${nroPagina || 1}`);
    const response = await axios.get(searchUrl, headers)
    const data = await response.data;
    const totalItems = Number.parseInt(
        response.headers.get('items-totales') || '0',
        10
    );
    return {
        data,
        totalItems,
    };
}

export async function getRequestDeltaDocumento(token, url) {
    const headers = headerDeltaFormDataDocumento(token);
    const { data } = await axios.get(url, headers)
    return data;
}

export async function getRequestDeltaReporte(token, url, mime) {
    const headers = headerDeltaReporte(token, mime);
    const { data } = await axios.get(url, headers)
    return data;
}

export async function getRequestIntranet(token, url) {
    const headers = headerIntranet();
    const { data } = await axios.get(url, headers)
    return data;
}

export async function getRequestIntranetDocumento(token, url) {
    const headers = headerIntranetDocumento();
    const { data } = await axios.get(url, headers)
    return data;
}
