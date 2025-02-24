import { Box, Skeleton } from "@mui/material";

function SkeletonFormActivity() {
    return (  <Box>
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="text" width={210} height={40} />
                <Skeleton variant="rectangular" width="100%" height={60} />
                <Skeleton variant="rectangular" width={100} height={40} />
            </Box>);
}

export default SkeletonFormActivity;