import { useGetStatisticsOfOrganization } from "@components/Hooks/requests/Statistics";
import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function OrganizationStatistics() {
    const { idOrganization } = useParams();
    const { data: statistics, isFetching, isError } = useGetStatisticsOfOrganization({ organizationId: idOrganization, enabled: !!idOrganization });

    if (isFetching) {
        return (
            <Box alignSelf={"center"} >
            {Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} variant="text" width={Math.floor(Math.random() * (250 - 150 + 1)) + 150} height={30} />
            ))}
            </Box>
        );
    }

    if (isError) {
        return <Alert severity="error"></Alert>;
    }

    return (
        <Box alignSelf={"center"}>
            <Typography variant="h6" marginBottom={"1em"}>Estadísticas de la organización</Typography>
            {Object.entries(statistics)
                .filter(([key]) => !["name","description", "organizationId", "email"].includes(key))
                .map(([key, value]) => (
                    <Typography key={key} variant="body1" >
                        {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    </Typography>
                ))}
        </Box>
    );
}

export default OrganizationStatistics;
