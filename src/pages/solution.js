import React from 'react'

import { calculate } from './../algorithm/algorithm'
import { Redirect } from 'react-router-dom'
import { Chart } from '../components/solution/chart'
import {
  Box,
  CssBaseline,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableHead,
  Button,
} from '@material-ui/core'
const data_chart = [
  {
    id: 'Waste',
    label: 'Waste',
    value: 18,
    color: '#f50057',
  },
  {
    id: 'Used',
    label: 'Used',
    value: 82,
    color: '#2196f3',
  },
]

const Solution = (props) => {
  if (!props.location.state) {
    return <Redirect to="/"></Redirect>
  }

  const raw_data = dataForAlgo(props.location.state.data)
  const data = calculate(raw_data.rod_length, raw_data.kerf, raw_data.iteams)
  const solution_data = solutionData(raw_data, data)
  data_chart[1].value = Number(solution_data.used)
  data_chart[0].value = Number((100.0 - solution_data.used).toFixed(2))

  return (
    <>
      <CssBaseline></CssBaseline>
      <div style={{ height: '20rem' }}>
        <Chart data={data_chart}></Chart>
      </div>

      <Container maxWidth="md">
        <Box textAlign="right">
          <Button style={{ marginRight: '1rem' }} href="/">
            New
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              window.print()
            }}
          >
            Print
          </Button>
        </Box>
        <Box>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h4"> Required stock </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h3" color="primary">
                    {solution_data.stock_req}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography>
                    Total parts:{' '}
                    <span style={{ marginLeft: '2rem' }}>
                      {' '}
                      {solution_data.total_parts}{' '}
                    </span>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    Total parts length:{' '}
                    <span style={{ marginLeft: '2rem' }}>
                      {' '}
                      {solution_data.total_stock_length}{' '}
                    </span>{' '}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>
                    {' '}
                    Stock length{' '}
                    <span style={{ marginLeft: '2rem' }}>
                      {' '}
                      {solution_data.stock_length}{' '}
                    </span>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box mt={5} mb={5}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Pices</TableCell>
                  <TableCell>Waste</TableCell>
                </TableRow>

                {solution_data.rods.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell> {index + 1}</TableCell>
                    <TableCell> {data.pices} </TableCell>
                    <TableCell> {data.waste} </TableCell>
                  </TableRow>
                ))}
              </TableHead>
            </Table>
          </Box>
        </Box>
      </Container>
    </>
  )
}

const dataForAlgo = (data) => {
  const rod_length = data[0].stock
  const kerf = data[0].kerf
  let iteams = []
  for (let i = 0; i < data[1].length; i++) {
    iteams.push({ len: data[1][i].len, quantity: data[1][i].quantity })
  }
  return {
    rod_length,
    kerf,
    iteams,
  }
}

const solutionData = (raw_data, algo_data) => {
  const stock_length = raw_data.rod_length
  const stock_req = algo_data.length
  let total_stock_length = 0
  let total_parts = 0
  let rods = []
  for (let i = 0; i < stock_req; i++) {
    total_stock_length += algo_data[i].sum
    total_parts += algo_data[i].arr.length
    let cuts = ''
    for (let j = 0; j < algo_data[i].arr.length; j++) {
      if (j === algo_data[i].arr.length - 1) {
        cuts += ` ${algo_data[i].arr[j].toFixed(2)}\xa0\xa0\xa0\xa0`
      } else {
        cuts += ` ${algo_data[i].arr[j].toFixed(2)},\xa0\xa0\xa0\xa0`
      }
    }
    rods.push({
      waste: (stock_length - algo_data[i].sum).toFixed(2),
      pices: cuts,
    })
  }
  const used = (
    (total_stock_length / (stock_length * stock_req)) *
    100
  ).toFixed(2)
  total_stock_length = total_stock_length.toFixed(2)
  return {
    stock_length,
    stock_req,
    total_stock_length,
    total_parts,
    rods,
    used,
  }
}

export { Solution }
