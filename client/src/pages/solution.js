import React from 'react'

import { calculate } from './../algorithm/algorithm'
import { Link } from 'react-router-dom'

const Solution = (props) => {
  const data = dataForAlgo(props.location.state.data)

  console.log(calculate(data.rod_length, data.kerf, data.iteams))
  // calculate(data.rod_length, data.kerf, data.iteams)

  return <Link to="/"> Back</Link>
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

export { Solution }
