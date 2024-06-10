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

/* POST answers 
/answers
 */
/* payload: {
  "activity": 0,
  "userId": 0,
  "status": true
} */

/*  */
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


/* PATCH answers:
  /answers/{id}/status
{
  "answerStatusId": "",
  "status": true
}
*/
