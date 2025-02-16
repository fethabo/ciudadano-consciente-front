import { Card, CardContent, Box, Skeleton } from '@mui/material';


export default function SkeletonContents(){
    return(
        [1, 2, 3, 4].map((_, index) => (
            <Card key={index} sx={{ marginBottom: 2, width: { xs: '100%', sm: "48%" } }}>
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="70%" />
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Skeleton variant="rectangular" width="45%" height={36} />
                <Skeleton variant="rectangular" width="45%" height={36} />
              </Box>
            </Card>
          ))
    )
}
