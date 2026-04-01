import { useState, type FormEvent } from 'react'
import styles from './OrderInput.module.css'

interface OrderInputProps {
  onCalculate: (amount: number) => void
  loading: boolean
}

export function OrderInput({ onCalculate, loading }: OrderInputProps) {
  const [orderAmount, setOrderAmount] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const amount = parseInt(orderAmount)
    if (amount > 0) {
      onCalculate(amount)
    }
  }

  return (
    <section className={styles.card}>
      <h2>Order Amount</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          value={orderAmount}
          onChange={(e) => setOrderAmount(e.target.value)}
          placeholder="Enter order amount"
          min="1"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </form>
    </section>
  )
}
