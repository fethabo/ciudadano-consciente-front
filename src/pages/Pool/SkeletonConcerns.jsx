import {  Card, CardContent, Typography, Box, Stack, Skeleton  } from '@mui/material';


export default function SkeletonConcerns(){
  return(
    <Stack spacing={3}>
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign={"left"}>
          <Skeleton width="40%" />
        </Typography>
        <Skeleton variant="rectangular" height={56} sx={{ marginBottom: 2 }} />
        <Skeleton variant="rectangular" height={100} />
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Skeleton variant="rectangular" width={100} height={36} />
      </Box>
    </Card>
    {[1, 2, 3].map((index) => (
  <Card key={index}>
    <CardContent>
      <Typography variant="h6" textAlign={"left"}>
    <Skeleton width="80%" />
      </Typography>
      <Typography variant="body2" textAlign={"left"} color="textSecondary">
    <Skeleton width="60%" />
      </Typography>
    </CardContent>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, width: '100%' }}>
      <Box display={"flex"}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="circular" width={40} height={40} />
      </Box>
      <Typography variant="caption" width={40} display="block" align="right">
    <Skeleton width="100%" />
      </Typography>
    </Box>
  </Card>
    ))}
  </Stack>
  )
}