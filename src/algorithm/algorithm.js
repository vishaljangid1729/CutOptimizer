/**
 * Calculates the optimal cutting plan using Best Fit Decreasing algorithm.
 * @param {number} rodLength - The total length of the stock rod.
 * @param {number} kerf - The width of the saw blade (material lost per cut).
 * @param {Array<{len: number, quantity: number}>} items - List of items to cut.
 * @returns {Array<{sum: number, arr: number[]}>} - List of rods with their cuts.
 */
export const calculate = (rodLength, kerf, items) => {
  rodLength = parseFloat(rodLength)
  kerf = parseFloat(kerf) || 0

  // 1. Expand items into a flat array of lengths
  const allItems = []
  items.forEach((item) => {
    for (let i = 0; i < item.quantity; i++) {
      allItems.push(parseFloat(item.len))
    }
  })

  // 2. Sort items in descending order
  allItems.sort((a, b) => b - a)

  // 3. Best Fit Decreasing
  const rods = [] // Array of { remaining: number, cuts: number[] }

  for (const itemLen of allItems) {
    let bestRodIndex = -1
    let minRemaining = Infinity

    // Find the best rod that can fit this item
    for (let i = 0; i < rods.length; i++) {
      const rod = rods[i]
      // Check if item fits.
      // If it's the first item in the rod, we just need itemLen <= remaining.
      // If it's not the first, we need itemLen + kerf <= remaining.
      const cost = rod.cuts.length === 0 ? itemLen : itemLen + kerf

      if (cost <= rod.remaining) {
        const potentialRemaining = rod.remaining - cost
        if (potentialRemaining < minRemaining) {
          minRemaining = potentialRemaining
          bestRodIndex = i
        }
      }
    }

    if (bestRodIndex !== -1) {
      // Place in the best rod
      const rod = rods[bestRodIndex]
      const cost = rod.cuts.length === 0 ? itemLen : itemLen + kerf
      rod.cuts.push(itemLen)
      rod.remaining -= cost
    } else {
      // Create a new rod
      if (itemLen > rodLength) {
        // This should be caught by validation, but just in case
        console.error(`Item length ${itemLen} is greater than rod length ${rodLength}`)
        continue
      }
      rods.push({
        remaining: rodLength - itemLen,
        cuts: [itemLen],
      })
    }
  }

  // Format output to match the expected structure of the UI
  // Expected: Array of { sum: number, arr: number[] }
  return rods.map((rod) => ({
    sum: rodLength - rod.remaining, // Total used length including kerfs
    arr: rod.cuts,
  }))
}
