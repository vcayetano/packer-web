import { useState, type FormEvent } from 'react'
import styles from './PackSizeEditor.module.css'

interface PackSizeEditorProps {
  packSizes: number[]
  loading: boolean
  onAdd: (size: number) => void
  onRemove: (size: number) => void
  onClear: () => void
}

export function PackSizeEditor({
  packSizes,
  loading,
  onAdd,
  onRemove,
  onClear,
}: PackSizeEditorProps) {
  const [newPackSize, setNewPackSize] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const size = parseInt(newPackSize)
    if (size > 0) {
      onAdd(size)
      setNewPackSize('')
    }
  }

  return (
    <section className={styles.card}>
      <h2>Pack Sizes</h2>
      <div className={styles.tags}>
        {loading ? (
          <span className={styles.loading}>Loading pack sizes...</span>
        ) : packSizes.length === 0 ? (
          <span className={styles.empty}>No pack sizes configured</span>
        ) : (
          packSizes.map((size) => (
            <span key={size} className={styles.tag}>
              {size.toLocaleString()}
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => onRemove(size)}
                aria-label={`Remove pack size ${size}`}
              >
                ×
              </button>
            </span>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          value={newPackSize}
          onChange={(e) => setNewPackSize(e.target.value)}
          placeholder="Add new pack size"
          min="1"
        />
        <button type="submit" className={styles.addBtn}>
          Add
        </button>
      </form>
      {packSizes.length > 0 && (
        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Clear Packs
        </button>
      )}
    </section>
  )
}
