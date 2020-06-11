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
import { cardStyle } from './style'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
// import { Solution } from "./solution"

const Home = (props) => {
  const [inputValue, changeInput] = useState([
    { len: 0, quantity: 0, error: null },
  ])
  const [materialValue, changeMaterial] = useState({
    stock: 0,
    kerf: 0,
    error: null,
  })
  const [solution, alterPage] = useState(false)
  const addRow = () => {
    changeInput(inputValue.concat({ len: 0, quantity: 0 }))
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
    // console.log(inputValue)

    for (let i = 0; i < inputValue.length; i++) {
      console.log(materialValue.stock)
      console.log(inputValue[i].len)
      if (inputValue[i].len > materialValue.stock) {
        console.log('this is excuting')
        let array = [...inputValue]
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

  // const cardStyle = useStyles();
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
          <Card className={cardStyle.root}>
            <CardContent>
              <Typography
                className={cardStyle.title}
                color="textPrimary"
                gutterBottom
              >
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
          <Card className={cardStyle.root}>
            <CardContent>
              <Typography
                className={cardStyle.title}
                color="textPrimary"
                gutterBottom
              >
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
                          value={value.length}
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

export { Home }
