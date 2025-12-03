import { describe, it, expect } from 'vitest'
import { calculate } from './algorithm'

describe('Cut Optimizer Algorithm', () => {
    it('should calculate optimal cuts for simple case', () => {
        const rodLength = 100
        const kerf = 0
        const items = [{ len: 20, quantity: 5 }]
        // Should fit exactly into one rod: 20*5 = 100
        const result = calculate(rodLength, kerf, items)
        expect(result).toHaveLength(1)
        expect(result[0].arr).toHaveLength(5)
        expect(result[0].sum).toBe(100)
    })

    it('should handle kerf correctly', () => {
        const rodLength = 100
        const kerf = 5
        const items = [{ len: 20, quantity: 4 }]
        // 20 + 5 + 20 + 5 + 20 + 5 + 20 = 95. Fits in one rod.
        // If we tried 5 items: 95 + 5 + 20 = 120. Too big.

        const result = calculate(rodLength, kerf, items)
        expect(result).toHaveLength(1)
        expect(result[0].arr).toHaveLength(4)
        // Used: 20*4 + 5*3 = 80 + 15 = 95
        expect(result[0].sum).toBe(95)
    })

    it('should split across multiple rods', () => {
        const rodLength = 10
        const kerf = 0
        const items = [{ len: 6, quantity: 3 }]
        // Rod 1: 6 (remaining 4)
        // Rod 2: 6 (remaining 4)
        // Rod 3: 6 (remaining 4)
        // Total 3 rods.

        const result = calculate(rodLength, kerf, items)
        expect(result).toHaveLength(3)
    })

    it('should optimize using Best Fit Decreasing', () => {
        // Example where First Fit might fail or be suboptimal compared to Best Fit
        // Rod: 100
        // Items: 50, 40, 10, 40
        // Sort: 50, 40, 40, 10
        // Rod 1: 50
        // Rod 1: 50 + 40 = 90 (rem 10)
        // Rod 1: 90 + 10 = 100 (rem 0) -> Perfect fit
        // Rod 2: 40

        const rodLength = 100
        const kerf = 0
        const items = [
            { len: 50, quantity: 1 },
            { len: 40, quantity: 2 },
            { len: 10, quantity: 1 },
        ]

        const result = calculate(rodLength, kerf, items)
        // Expect 2 rods? Or 1 if possible?
        // 50+40+10 = 100. 40 left.
        // Wait, 50+40+40+10 = 140. Needs 2 rods.
        // Rod 1: 50 + 40 + 10 = 100.
        // Rod 2: 40.
        // This is optimal.

        expect(result).toHaveLength(2)
        // Check if one rod is full
        const fullRod = result.find(r => r.sum === 100)
        expect(fullRod).toBeDefined()
    })
})
