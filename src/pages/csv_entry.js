import React from 'react'
import {
  Container,
  Box,
  CssBaseline,
  Button,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const CSVEntry = (props) => {
  return (
    <>
      <CssBaseline></CssBaseline>
      <Container maxWidth="md">
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography>
                Downlaod CSV file and fill the required details
              </Typography>
            </CardContent>
            <CardContent>
              <Link
                to="/input-data.csv"
                target="_blank"
                download
                style={{ textDecoration: 'none' }}
              >
                <Button variant="contained" color="primary">
                  Download
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography>Upload that csv file with filled data</Typography>
            </CardContent>
            <CardContent>
              <div>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  style={{ display: 'none' }}
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}
export { CSVEntry }
