import { useContext } from "react";
import { UserContext } from './UserContext';

export default function useUserApi() {

    const user = useContext(UserContext);
    return user || null;
}