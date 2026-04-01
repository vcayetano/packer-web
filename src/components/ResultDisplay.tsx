import { useMemo } from 'react'
import type { PackResult } from '../types'
import styles from './ResultDisplay.module.css'

interface ResultDisplayProps {
  result: PackResult
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const totalItems = useMemo(() => {
    return Object.entries(result.packs).reduce(
      (sum, [size, count]) => sum + parseInt(size) * count,
      0
    )
  }, [result.packs])

  const sortedPacks = useMemo(() => {
    return Object.entries(result.packs).sort(
      ([a], [b]) => parseInt(b) - parseInt(a)
    )
  }, [result.packs])

  return (
    <section className={styles.card}>
      <h2>Result</h2>
      <div className={styles.summary}>
        <div className={styles.stat}>
          <span className={styles.label}>Order Amount</span>
          <span className={styles.value}>
            {result.order_amount.toLocaleString()}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Total Items</span>
          <span className={styles.value}>{totalItems.toLocaleString()}</span>
        </div>
      </div>
      <div className={styles.grid}>
        {sortedPacks.map(([size, count]) => (
          <div key={size} className={styles.packItem}>
            <span className={styles.count}>{count}×</span>
            <span className={styles.size}>
              {parseInt(size).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
