import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { URL_API } from "../../../../constants";


export function useGetLevel({levelId, ...rest}){
    return( useQuery({
        queryKey: ['useGetLevel'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/${levelId}`)
            .then((res) => res.data),
        ...rest
      })
    )
}

export function useGetLevels({...rest}){
    return( useQuery({
        queryKey: ['useGetLevels'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


export function useGetLevelChildrens({levelId,...rest}){
    return( useQuery({
        queryKey: ['useGetLevelChildrens'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/${levelId}/childrens`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}





export function useGetOrganizationPaths({organizationId, ...rest}){
    return( useQuery({
        queryKey: ['useGetOrganizationPaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/organizations/${organizationId}/paths`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

export function useGetPaths({...rest}){
    return( useQuery({
        queryKey: ['useGetPaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}


export function useGetFavoritePaths({userId, ...rest}){
    return( useQuery({
        queryKey: ['useGetFavoritePaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths/favorites/${userId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}

export function useGetRecentlyPaths({userId, ...rest}){
    return( useQuery({
        queryKey: ['useGetRecentlyPaths'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/paths/recently/${userId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}       

/* TODO: 
POST LEVEL:/levels

{
  "name": "",
  "description": "",
  "organization": "",
  "parent": ""
}
*/

/* TODO:
DELETE  /levels/{id}
*/

/* TODO:
PATCH /levels/{id}
{
  "levelId": "",
  "name": "",
  "description": "",
  "organization": "",
  "parent": ""
}
*/
/* TODO  */


/*OBTENER LEVELS DE UNA ORGANIZACION DONDE UN USUARIO TIENE UN ROL ESPECIFICO*/
export function useGetLevelsOfUserInOrganization({organizationId, roleId,userId, ...rest}){
    return( useQuery({
        queryKey: ['useGetLevelsOfUserInOrganization'],
        queryFn: () =>
          axios
            .get(`${URL_API}/levels/organizations/${organizationId}/users/${userId}/roles/${roleId}`)
            .then((res) => res.data),
        ...rest
      })
    ) 
}  
