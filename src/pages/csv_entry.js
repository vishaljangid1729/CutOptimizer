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
import { Link, Redirect } from 'react-router-dom'
import { parse } from 'csv'
import { useState } from 'react'

const CSVEntry = (props) => {
  const [error, chageError] = useState(false)
  const [redirect, chageRedirect] = useState(false)
  const [data_to_send, setData] = useState(null)
  let fileReader

  const handleFileRead = (e) => {
    const content = fileReader.result
    parse(content, (err, data) => {
      err ? chageError(true) : chageError(false)
      data = formatData(data)
      setData(data)
      next()
    })
  }
  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsBinaryString(file)
  }
  const next = () => {
    if (!error) {
      chageRedirect(true)
    } else {
      chageRedirect(false)
    }
  }
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: '/manual',
          state: { data: data_to_send },
        }}
      ></Redirect>
    )
  }
  return (
    <>
      <CssBaseline></CssBaseline>
      <Container maxWidth="md">
        <Box mt={3}>
          <Card>
            <CardContent>
              <Typography>
                Download the CSV file and fill the required details.
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
              <Typography>
                Upload downloaded CSV files with filled data.
              </Typography>
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

const formatData = (data) => {
  let info = []
  info.push({ stock_length: data[0][1], kref: data[1][1] })
  let length_info = []
  for (let i = 4; i < data.length; i++) {
    length_info.push({ len: data[i][0], quantity: data[i][1] })
  }
  info.push(length_info)
  return info
}

export { CSVEntry }
