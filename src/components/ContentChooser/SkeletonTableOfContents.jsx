import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function SkeletonTableOfContents() {
    return (  
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>
                    <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                    <Skeleton variant="text" />
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    );
}

export default SkeletonTableOfContents;