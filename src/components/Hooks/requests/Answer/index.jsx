import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


export function useGetAnswers({...rest}){
    return( useQuery({
        queryKey: ['useGetAnswers'],
        queryFn: () =>
          axios
            .get(`${URL_API}/answers`)
            .then((res) => res.data),
        ...rest
      })
    )
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
  return( useQuery({
      queryKey: ['usePostAnswers'],
      queryFn: () =>
        axios
          .post(`${URL_API}/answers`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}

export function useGetAnswersFromLevel({levelId, ...rest}){
  return( useQuery({
      queryKey: ['useGetAnswersFromLevel'],
      queryFn: () =>
        axios
          .get(`${URL_API}/answers/levels/${levelId}/childrens`)
          .then((res) => res.data),
      ...rest
    })
  )
}


/**
 * 
 * @param {*} answerId 
 * @returns 
 */
export function useGetAnswer({answerId, ...rest }){
  return( useQuery({
      queryKey: ['useGetAnswer'],
      queryFn: () =>
        axios
          .get(`${URL_API}/answers/${answerId}`)
          .then((res) => res.data),
      ...rest
    })
  )
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
  return( useQuery({
      queryKey: ['usePatchAnswer'],
      queryFn: () =>
        axios
          .patch(`${URL_API}/answers/${answerId}/status`,form)
          .then((res) => res.data),
      ...rest
    })
  )
}
