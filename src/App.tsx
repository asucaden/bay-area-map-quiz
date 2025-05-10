import Map from './components/Map'
import './App.css'

function App() {
  return (
    <>
      <h1>Neighborhooder</h1>
      <Map />
      <footer
        style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}
      >
        <a href="/privacy.html" style={{ color: '#7ca7ff' }}>
          Privacy Policy
        </a>
      </footer>
    </>
  )
}

export default App
