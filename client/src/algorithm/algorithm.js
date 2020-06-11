const calculate = (rod_length, kerf, items) => {
  const item_ilst = []
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].quantity; j++) {
      item_ilst.push(items[i].len)
    }
  }
  return MMFD(rod_length, kerf, item_ilst)
}

const MMFD = (rod_lenght, kerf, items) => {
  const large = []
  const medium = []
  const small = []
  const tiny = []

  const required = [
    {
      sum: large[0] > 0 ? large[0] : 0,
      arr: [large[0] > 0 ? large[0] : 0],
    },
  ]

  for (let i = 0; i < items.length; i++) {
    if (items[i] >= rod_lenght / 2) {
      large.push(items[i])
    } else if (items[i] >= rod_lenght / 3) {
      medium.push(items[i])
    } else if (items[i] >= rod_lenght / 6) {
      small.push(items[i])
    } else {
      tiny.push(items[i])
    }
  }
  large.sort().reverse()
  medium.sort().reverse()
  small.sort().reverse()
  tiny.sort().reverse()

  console.log(large)

  // for(let i = 1; i < large.length; i++) {
  //     const size = required.length
  //     let newRod = true;
  //     for(let j = 0; j < size; j++) {
  //         if(large[i] + required[j].sum <= rod_lenght) {
  //             required[j].arr.push(large[i]);
  //             required[j].sum += large[i];
  //             // kerf added
  //             if(required[j].sum < rod_lenght) {
  //                 required[j].sum += kerf;
  //             }
  //             newRod = false;
  //             break;
  //         }
  //     }

  //     if(newRod) {
  //         large.push({"sum": large[i], "arr": large[i]});
  //     }
  // }
  // for(let i = 1; i < medium.length; i++) {
  //     const size = required.length
  //     let newRod = true;
  //     for(let j = 0; j < size; j++) {
  //         if(medium[i] + required[j].sum <= rod_lenght) {
  //             required[j].arr.push(medium[i]);
  //             required[j].sum += medium[i];
  //             // kerf added
  //             if(required[j].sum < rod_lenght) {
  //                 required[j].sum += kerf;
  //             }
  //             newRod = false;
  //             break;
  //         }
  //     }

  //     if(newRod) {
  //         large.push({"sum": medium[i], "arr": medium[i]});
  //     }
  // }
  // for(let i = 1; i < small.length; i++) {
  //     const size = required.length
  //     let newRod = true;
  //     for(let j = 0; j < size; j++) {
  //         if(small[i] + required[j].sum <= rod_lenght) {
  //             required[j].arr.push(small[i]);
  //             required[j].sum += small[i];
  //             // kerf added
  //             if(required[j].sum < rod_lenght) {
  //                 required[j].sum += kerf;
  //             }
  //             newRod = false;
  //             break;
  //         }
  //     }

  //     if(newRod) {
  //         large.push({"sum": small[i], "arr": small[i]});
  //     }
  // }
  // for(let i = 1; i < tiny.length; i++) {
  //     const size = required.length
  //     let newRod = true;
  //     for(let j = 0; j < size; j++) {
  //         if(tiny[i] + required[j].sum <= rod_lenght) {
  //             required[j].arr.push(tiny[i]);
  //             required[j].sum += tiny[i];
  //             // kerf added
  //             if(required[j].sum < rod_lenght) {
  //                 required[j].sum += kerf;
  //             }
  //             newRod = false;
  //             break;
  //         }
  //     }

  //     if(newRod) {
  //         large.push({"sum": tiny[i], "arr": tiny[i]});
  //     }
  // }

  return required
}

export { calculate }
