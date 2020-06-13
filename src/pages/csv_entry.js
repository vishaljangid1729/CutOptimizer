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
import { parse } from 'csv'
import { useState } from 'react'

const CSVEntry = (props) => {
  const [error, chageError] = useState(false)
  let fileReader

  const handleFileRead = (e) => {
    const content = fileReader.result
    parse(content, (err, data) => {
      err ? chageError(true) : chageError(false)
    })
  }
  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsBinaryString(file)
  }
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
                  accept=".csv"
                  id="contained-button-file"
                  style={{ display: 'none' }}
                  multiple
                  type="file"
                  onChange={(e) => handleFileChosen(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </div>
              {error ? (
                <CardContent>
                  <Typography>
                    There is some problem in uploading file
                  </Typography>
                </CardContent>
              ) : (
                ''
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}
export { CSVEntry }
