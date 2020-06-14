import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Redirect } from 'react-router-dom'
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
  Button,
} from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useEffect } from 'react'

const ManualEntry = (props) => {
  const [inputValue, changeInput] = useState([
    { len: '', quantity: '', error: null },
  ])
  const [materialValue, changeMaterial] = useState({
    stock: '',
    kerf: 0,
    error: null,
  })
  useEffect(() => {
    if (props.location.state) {
      const stock = props.location.state.data[0].stock_length
      const kerf = props.location.state.data[0].kref

      changeMaterial({ stock, kerf, error: null })

      const lenght_qty_info = []

      for (let i = 0; i < props.location.state.data[1].length; i++) {
        lenght_qty_info.push({
          len: props.location.state.data[1][i].len,
          quantity: props.location.state.data[1][i].quantity,
          error: null,
        })
      }
      changeInput(lenght_qty_info)
    } else {
      console.log('Thsta prefect')
    }
  }, [])

  const [solution, alterPage] = useState(false)
  const addRow = () => {
    changeInput(inputValue.concat({ len: '', quantity: '' }))
  }
  const removeRow = (index) => {
    let array = [...inputValue]
    array.splice(index, 1)
    changeInput(array)
  }
  const checkError = () => {
    let error = false
    if (materialValue.stock <= 0) {
      let value = { ...materialValue }
      value.error = "Can't be 0."
      changeMaterial(value)
      error = true
    }
    let array = [...inputValue]

    for (let i = 0; i < array.length; i++) {
      const len = array[i].len
      const rod = materialValue.stock
      if (parseFloat(len) > parseFloat(rod)) {
        array[i].error = 'Must be less than stock length'
        error = true
        changeInput(array)
      }
    }

    return error
  }
  const onSubmit = () => {
    if (!checkError()) {
      alterPage(true)
    }
  }
  const handleChange = (e, index = -1) => {
    if (e.target.name === 'stock' && e.target.value >= 0) {
      let value = { ...materialValue }
      value.stock = e.target.value
      changeMaterial(value)
    } else if (e.target.name === 'kerf' && e.target.value >= 0) {
      let value = { ...materialValue }
      value.kerf = e.target.value
      changeMaterial(value)
    } else if (e.target.name === 'length' && e.target.value >= 0) {
      let array = [...inputValue]
      array[index].error = null
      array[index].len = e.target.value
      changeInput(array)
    } else if (e.target.name === 'quantity' && e.target.value >= 0) {
      let array = [...inputValue]
      const value = e.target.value > 0 ? parseInt(e.target.value) : ''
      array[index].quantity = value
      changeInput(array)
    }
  }

  if (solution) {
    return (
      <Redirect
        to={{
          pathname: '/solution',
          state: { data: [materialValue, inputValue] },
        }}
      ></Redirect>
    )
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                Material Information
              </Typography>

              <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                <Box>
                  <TextField
                    variant="outlined"
                    label="Stock Length"
                    margin="dense"
                    fullWidth
                    type="number"
                    required
                    name="stock"
                    value={materialValue.stock}
                    error={materialValue.error === null ? false : true}
                    helperText={
                      materialValue.error !== null
                        ? materialValue.error
                        : 'Type material length'
                    }
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  ></TextField>
                </Box>
                <Box>
                  <TextField
                    variant="outlined"
                    label="Kerf"
                    margin="dense"
                    fullWidth
                    helperText="Leave empty if kerf width is "
                    name="kerf"
                    type="number"
                    value={materialValue.kerf}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  ></TextField>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={4}>
          <Card>
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                Required part lengths and quantities
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="none">#</TableCell>
                    <TableCell>Length</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {inputValue.map((value, index) => (
                    <TableRow key={index}>
                      <TableCell padding="none">{index + 1}</TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          type="number"
                          value={value.len}
                          name="length"
                          error={value.error === null ? false : true}
                          helperText={value.error}
                          onChange={(e) => {
                            handleChange(e, index)
                          }}
                        ></TextField>
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          margin="dense"
                          type="number"
                          value={value.quantity}
                          name="quantity"
                          onChange={(e) => {
                            handleChange(e, index)
                          }}
                        ></TextField>
                      </TableCell>

                      <TableCell>
                        <HighlightOffOutlinedIcon
                          color="error"
                          margin="dense"
                          onClick={() => removeRow(index)}
                          style={{
                            cursor: 'pointer',
                          }}
                        ></HighlightOffOutlinedIcon>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box textAlign="right" m={2} mr={8}>
                <IconButton size="medium" color="primary" onClick={addRow}>
                  <AddCircleOutlineIcon fontSize="large"></AddCircleOutlineIcon>
                </IconButton>
              </Box>
              <Box m={2}>
                <Button variant="contained" onClick={onSubmit}>
                  Solve
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export { ManualEntry }
