
export function headerDelta(token) {

  const header = {
    
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    }
  }

  return (header)
}

export function headerDeltaFormData(token) {
  //const onUploadProgress = (progressEvent) => console.log("onUploadProgress",Math.round((progressEvent.loaded * 100) / progressEvent.total)); ///si lo quiero mostrar lo tengo que guardar en algun lado :S
  const header = {
    //onUploadProgress,
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    }
  }

  return (header)
}

export function headerDeltaFormDataDocumento(token) {

  const header = {
    'responseType': 'blob',
    headers: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    }
  }

  return (header)
}

export function headerDeltaDocumento(token) {

  const header = {
    'responseType': 'blob',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    }
  }

  return (header)
}

export function headerDeltaReporte(token, mime) {
  const header = {
    'responseType': 'blob',
    headers: {
      'Accept': mime,
      'Authorization': 'Bearer ' + token
    }
  }

  return (header)
}



export function headerIntranet() {

  const header = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    }
  }

  return (header)
}

export function headerIntranetDocumento() {

  const header = {
    'responseType': 'blob',
    headers: { 
    }
  }
  return (header)
}
export function headerIntranetFormData() {

  const header = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  }

  return (header)
}
