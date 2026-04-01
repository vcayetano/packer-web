import { usePackCalculator } from './hooks/usePackCalculator'
import {
  OrderInput,
  PackSizeEditor,
  ResultDisplay,
  ErrorMessage,
} from './components'
import './App.css'

function App() {
  const {
    packSizes,
    loadingPackSizes,
    result,
    error,
    loading,
    calculatePacks,
    addPackSize,
    removePackSize,
    clearPackSizes,
  } = usePackCalculator()

  return (
    <div className="container">
      <header>
        <h1>Pack Calculator</h1>
        <p className="subtitle">
          Calculate optimal pack combinations for your orders
        </p>
      </header>

      <main>
        <OrderInput onCalculate={calculatePacks} loading={loading} />

        <PackSizeEditor
          packSizes={packSizes}
          loading={loadingPackSizes}
          onAdd={addPackSize}
          onRemove={removePackSize}
          onClear={clearPackSizes}
        />

        {error && <ErrorMessage message={error} />}

        {result && <ResultDisplay result={result} />}

        <p className="cache-note">
          All calculations are cached. Requests with the same order amount and
          pack sizes will return instantly from cache.
        </p>
      </main>


      {/*I should follow best practices and move this to a componemt, but it is only one view at the moment*/}
      <footer className="footer">
        <p className="author">Victor Cayetano</p>
        <div className="links">
          <a
            href="https://www.credly.com/users/victor-cayetano.cc38e891/badges#credly"
            target="_blank"
            rel="noopener noreferrer"
          >
            Certifications
          </a>
          <a
            href="https://www.linkedin.com/in/victor-cayetano-629403113/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
