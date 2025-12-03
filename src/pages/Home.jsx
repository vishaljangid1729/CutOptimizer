import React from 'react'
import {
  Box,
  Card,
  CssBaseline,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <CssBaseline />
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={20}>
        <Card sx={{ width: '20rem', margin: '1rem' }}>
          <CardContent>
            <Typography component="h2" variant="h5">
              Use CSV
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1">
              Upload a CSV file containing your cut list to quickly generate an optimized cutting plan.
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/csv-entry" style={{ textDecoration: 'none' }}>
              <Button size="small" color="primary">
                Go
              </Button>
            </Link>
          </CardActions>
        </Card>

        <Card sx={{ width: '20rem', margin: '1rem' }}>
          <CardContent>
            <Typography component="h2" variant="h5">
              Enter manually
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1">
              Manually enter your stock length and the list of parts you need to cut.
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/manual" style={{ textDecoration: 'none' }}>
              <Button color="primary">Go</Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}
export { Home }
