import { Box, Card, CardContent, Skeleton } from "@mui/material";

function SkeletonContent() {
    return(<Card sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" }, textAlign: 'left' }}>
        <CardContent>
            <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Skeleton variant="text" width="80%" height={30} />
            </Box>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Box display="flex" gap="1em" alignItems={"center"}>
                <Skeleton variant="text" width="20%" height={20} />
                <Skeleton variant="rectangular" width="80%" height={20} />
            </Box>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
        </Box>
    </Card>)
}

export default SkeletonContent;

