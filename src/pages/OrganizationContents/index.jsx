import { useParams } from "react-router-dom";
import { useGetContentsOfOrganization } from "../../components/Hooks/requests/Content";



/**
 *  Permite gestionar los contenidos de una organizacion
 *  CRUD de content
 *   
 * @returns PageOrganizationContents
 */
export default function OrganizationContents(){
    
    //

    const { idOrganization } = useParams();    
    //GET ccontents TODO: pedirle a simon el endpoint (si no lo hice ya)
    const {data} = useGetContentsOfOrganization({organizationId: idOrganization, enabled: !!idOrganization});
    return (
        <div>
            <h4>Contents</h4>
            <div>
                CRUD de contents de la organizacion
            </div>    
        </div>

    )
}
