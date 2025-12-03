import React, { useState } from 'react'
import {
  Container,
  Box,
  CssBaseline,
  Button,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Papa from 'papaparse'

const CSVEntry = () => {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleFileRead = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        try {
          const data = formatData(results.data)
          navigate('/manual', { state: { data } })
        } catch (e) {
          console.error(e)
          setError(true)
        }
      },
      error: () => {
        setError(true)
      },
    })
  }

  const handleFileChosen = (file) => {
    if (file) {
      handleFileRead(file)
    }
  }

  return (
    <>
      <CssBaseline />
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
                  Download Template
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
                  type="file"
                  onChange={(e) => handleFileChosen(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </div>
              {error && (
                <CardContent>
                  <Typography color="error">
                    There is some problem in uploading or parsing the file. Please ensure it matches the template.
                  </Typography>
                </CardContent>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  )
}

const formatData = (data) => {
  // Basic validation to ensure data has enough rows
  if (data.length < 5) throw new Error('Invalid CSV format')

  let info = []
  // Assuming the CSV structure matches the previous implementation
  // Row 0, Col 1: Stock Length
  // Row 1, Col 1: Kerf
  info.push({ stock_length: data[0][1], kref: data[1][1] }) // Keeping 'kref' key for compatibility with ManualEntry for now, but should fix typo globally later if possible.

  let length_info = []
  for (let i = 4; i < data.length; i++) {
    // Skip empty rows
    if (data[i][0] && data[i][1]) {
      length_info.push({ len: data[i][0], quantity: data[i][1] })
    }
  }
  info.push(length_info)
  return info
}

export { CSVEntry }
