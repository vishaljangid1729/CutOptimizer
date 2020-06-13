import React from 'react'
import {
  Box,
  Card,
  CssBaseline,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" mt={20}>
        <Card style={{ width: '20rem', margin: '1rem' }}>
          <CardContent>
            <Typography component="h2" variant="h5">
              Use CSV
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est nam
              beatae obcaecati dicta corrupti cupiditate consequuntur quam
              tenetur? Doloremque qui sequi vitae sit accusantium, quasi
              obcaecati vero id eligendi temporibus!
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

        <Card style={{ width: '20rem', margin: '1rem' }}>
          <CardContent>
            <Typography component="h2" variant="h5">
              Enter manually
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est nam
              beatae obcaecati dicta corrupti cupiditate consequuntur quam
              tenetur? Doloremque qui sequi vitae sit accusantium, quasi
              obcaecati vero id eligendi temporibus!
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
