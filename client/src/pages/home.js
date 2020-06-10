import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Box,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    IconButton,
} from "@material-ui/core"
import { cardStyle } from "./style"
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"

export class Home extends React.Component {
    render() {
        // const cardStyle = useStyles();
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth='md'>
                    <Box mt={4}>
                        <Card className={cardStyle.root}>
                            <CardContent>
                                <Typography
                                    className={cardStyle.title}
                                    color='textPrimary'
                                    gutterBottom
                                >
                                    Material Information
                                </Typography>

                                <Box
                                    display='flex'
                                    justifyContent='space-around'
                                    flexWrap='wrap'
                                >
                                    <Box>
                                        <TextField
                                            variant='outlined'
                                            label='Stock Length'
                                            margin='dense'
                                            fullWidth
                                            type='number'
                                            required
                                            helperText='Type material length'
                                        ></TextField>
                                    </Box>
                                    <Box>
                                        <TextField
                                            variant='outlined'
                                            label='Kerf'
                                            margin='dense'
                                            fullWidth
                                            helperText='Leave empty if kerf width is '
                                        ></TextField>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box mt={4}>
                        <Card className={cardStyle.root}>
                            <CardContent>
                                <Typography
                                    className={cardStyle.title}
                                    color='textPrimary'
                                    gutterBottom
                                >
                                    Required part lengths and quantities
                                </Typography>

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding='none'>
                                                #
                                            </TableCell>
                                            <TableCell>Length</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            <TableCell padding='none'>
                                                1.
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>

                                            <TableCell>
                                                <HighlightOffOutlinedIcon
                                                    color='error'
                                                    margin='dense'
                                                ></HighlightOffOutlinedIcon>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell padding='none'>
                                                1.
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>

                                            <TableCell>
                                                <HighlightOffOutlinedIcon
                                                    color='error'
                                                    margin='dense'
                                                ></HighlightOffOutlinedIcon>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell padding='none'>
                                                1.
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant='outlined'
                                                    margin='dense'
                                                    type='number'
                                                ></TextField>
                                            </TableCell>

                                            <TableCell>
                                                <HighlightOffOutlinedIcon
                                                    color='error'
                                                    margin='dense'
                                                ></HighlightOffOutlinedIcon>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Box textAlign='right' m={2} mr={8}>
                                    <IconButton size='medium' color='primary'>
                                        <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </React.Fragment>
        )
    }
}
