import useApiQuery from "../useApiQuery";


export function useGetAnswers({...rest}){
  return(useApiQuery({
    queryKey:['useGetAnswers'],
    endpoint: `/answers`,
    options: {...rest},
    }
  ))  
}

/**
 * 
 * @param {*} form = {
  "activity": 0,
  "userId": 0,
  "status": true
} 
 * @returns 
 */
export function usePostAnswer({form,...rest}){
 //console.log("POSTANSWER", form)
  return( 
    useApiQuery({
      queryKey:['usePostAnswers'],
      endpoint: `/answers`,
      method: 'POST', 
      options: {...rest},
      form:form 
      }
    )
  )
}

export function useGetAnswersFromLevel({levelId, ...rest}){
  return(useApiQuery({
    queryKey:['useGetAnswersFromLevel', levelId],
    endpoint: `/answers/levels/${levelId}/childrens`,
    options: {...rest},
    }
  ))  
}


export function useGetAnswersOfUserFromLevel({levelId, userId, ...rest}){
  return(useApiQuery({
    queryKey:['useGetAnswersOfUserFromLevel', levelId, userId],
    endpoint: `/answers/levels/${levelId}/childrens/user`,
    options: {...rest},
    }
  ))  
}



/**
 * 
 * @param {*} answerId 
 * @returns 
 */
export function useGetAnswer({answerId, ...rest }){
  return(useApiQuery({
    queryKey:['useGetAnswer', answerId],
    endpoint: `/answers/${answerId}`,
    options: {...rest},
    }
  ))  
}
 /**
  * 
  * @param {*} answerId
  * @param form = {
  "answerStatusId": "",
  "status": true
} 
  * @returns 
  */
export function usePatchAnswer({answerId,form, ...rest }){
  return( 
    useApiQuery({
      queryKey:['usePatchAnswer', answerId],
      endpoint: `/answers/${answerId}/status`,
      method: 'PATCH', 
      options: {...rest},
      form:form 
      }
    )
  )
}
