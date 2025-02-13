import { useGetStatisticsOfOrganization } from "@components/Hooks/requests/Statistics";
import { Alert, Box, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function OrganizationStatistics() {
    const { idOrganization } = useParams();
    const { data: statistics, isFetching, isError } = useGetStatisticsOfOrganization({ organizationId: idOrganization, enabled: idOrganization });

    if (isFetching) {
        return (
            <Box>
                {Array.from({ length: 9 }).map((_, index) => (
                    <Skeleton key={index} variant="text" width={210} height={40} />
                ))}
            </Box>
        );
    }

    if (isError) {
        return <Alert severity="error"></Alert>;
    }

    return (
        <Box>
            {Object.entries(statistics).map(([key, value]) => (
                <Typography key={key} variant="h6">
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                </Typography>
                ))}
        </Box>
    );
}

export default OrganizationStatistics;
