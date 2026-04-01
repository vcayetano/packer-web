import { useState, useEffect, useCallback, useRef } from 'react'
import type { PackResult, PackSizesResponse } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

interface UsePackCalculatorReturn {
  packSizes: number[]
  loadingPackSizes: boolean
  result: PackResult | null
  error: string | null
  loading: boolean
  calculatePacks: (orderAmount: number) => Promise<void>
  addPackSize: (size: number) => void
  removePackSize: (size: number) => void
}

export function usePackCalculator(): UsePackCalculatorReturn {
  const [packSizes, setPackSizes] = useState<number[]>([])
  const [loadingPackSizes, setLoadingPackSizes] = useState(true)
  const [result, setResult] = useState<PackResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchPackSizes = async () => {
      try {
        const response = await fetch(`${API_BASE}/pack-sizes`, {
          signal: controller.signal,
        })
        if (response.ok) {
          const data: PackSizesResponse = await response.json()
          setPackSizes(data.sizes || [])
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Failed to fetch pack sizes:', err)
        }
      } finally {
        setLoadingPackSizes(false)
      }
    }

    fetchPackSizes()

    return () => controller.abort()
  }, [])

  const updatePackSizesOnServer = useCallback(async (sizes: number[]) => {
    try {
      await fetch(`${API_BASE}/pack-sizes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sizes }),
      })
    } catch (err) {
      console.error('Failed to update pack sizes on server:', err)
    }
  }, [])

  const calculatePacks = useCallback(async (orderAmount: number) => {
    if (packSizes.length === 0) {
      setError('Please configure at least one pack size')
      return
    }


    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/packs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_amount: orderAmount,
          pack_sizes: packSizes,
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data: PackResult = await response.json()
      setResult(data)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message || 'Failed to calculate packs')
      }
    } finally {
      setLoading(false)
    }
  }, [packSizes])

  const addPackSize = useCallback((size: number) => {
    if (size > 0 && !packSizes.includes(size)) {
      const newSizes = [...packSizes, size].sort((a, b) => a - b)
      setPackSizes(newSizes)
      updatePackSizesOnServer(newSizes)
    }
  }, [packSizes, updatePackSizesOnServer])

  const removePackSize = useCallback((sizeToRemove: number) => {
    const newSizes = packSizes.filter((size) => size !== sizeToRemove)
    setPackSizes(newSizes)
    updatePackSizesOnServer(newSizes)
  }, [packSizes, updatePackSizesOnServer])

  return {
    packSizes,
    loadingPackSizes,
    result,
    error,
    loading,
    calculatePacks,
    addPackSize,
    removePackSize,
  }
}
