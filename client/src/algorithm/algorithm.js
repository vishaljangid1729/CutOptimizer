const calculate = (rod_length, kerf, items) => {
  const item_ilst = []
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].quantity; j++) {
      item_ilst.push(parseFloat(items[i].len))
    }
  }
  return MMFD(rod_length, kerf, item_ilst)
}

const MMFD = (rod_length, kerf, items) => {
  const large = []
  const medium = []
  const small = []
  const tiny = []

  const required = [
    {
      sum: parseFloat(0),
      arr: [],
    },
  ]
  //   console.log(items)

  for (let i = 0; i < items.length; i++) {
    if (items[i] >= rod_length / 2) {
      large.push(items[i])
    } else if (items[i] >= rod_length / 3) {
      medium.push(items[i])
    } else if (items[i] >= rod_length / 6) {
      small.push(items[i])
    } else {
      tiny.push(items[i])
    }
  }
  large.sort().reverse()
  medium.sort().reverse()
  small.sort().reverse()
  tiny.sort().reverse()

  // console.log(large)
  for (let i = 0; i < large.length; i++) {
    const size = required.length
    let newRod = true
    // console.log(large[i])
    // console.log(size)
    for (let j = 0; j < size; j++) {
      if (large[i] + required[j].sum <= rod_length) {
        required[j].arr.push(large[i])
        required[j].sum += large[i]
        newRod = false
        break
      }
    }
    if (newRod) {
      required.push({ sum: large[i], arr: [large[i]] })
    }
  }
  for (let i = 0; i < medium.length; i++) {
    const size = required.length
    let newRod = true
    // console.log(large[i])
    // console.log(size)
    for (let j = 0; j < size; j++) {
      if (medium[i] + required[j].sum <= rod_length) {
        required[j].arr.push(medium[i])
        required[j].sum += medium[i]
        newRod = false
        break
      }
    }
    if (newRod) {
      required.push({ sum: medium[i], arr: [medium[i]] })
    }
  }
  for (let i = 0; i < small.length; i++) {
    const size = required.length
    let newRod = true
    // console.log(large[i])
    // console.log(size)
    for (let j = 0; j < size; j++) {
      if (small[i] + required[j].sum <= rod_length) {
        required[j].arr.push(small[i])
        required[j].sum += small[i]
        newRod = false
        break
      }
    }
    if (newRod) {
      required.push({ sum: small[i], arr: [small[i]] })
    }
  }
  for (let i = 0; i < tiny.length; i++) {
    const size = required.length
    let newRod = true
    // console.log(large[i])
    // console.log(size)
    for (let j = 0; j < size; j++) {
      if (tiny[i] + required[j].sum <= rod_length) {
        required[j].arr.push(tiny[i])
        required[j].sum += tiny[i]
        newRod = false
        break
      }
    }
    if (newRod) {
      required.push({ sum: tiny[i], arr: [tiny[i]] })
    }
  }

  return required
}

export { calculate }
