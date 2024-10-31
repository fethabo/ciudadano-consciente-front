import { useContext } from "react";
import { UserContext } from './UserContext';

export default function useUserApi() {

    const context = useContext(UserContext);
    console.log("valor en contexto (hook)", context)
    return context || null;
}