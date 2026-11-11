import './styles/global.css' // base layer first, so component styles can build on it
import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SiteDataProvider } from './context/SiteDataContext'

const AdminApp = lazy(() => import('./admin/AdminApp'))

const isAdminPath = () => window.location.pathname.replace(/\/+$/, '').toLowerCase().endsWith('/admin')

/** A router small enough to not need a router. */
function Root() {
  const [admin, setAdmin] = useState(isAdminPath)

  useEffect(() => {
    const onPop = () => setAdmin(isAdminPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <SiteDataProvider>
      {admin ? (
        <Suspense fallback={<div className="boot">Loading the editor…</div>}>
          <AdminApp />
        </Suspense>
      ) : (
        <App />
      )}
    </SiteDataProvider>
  )
}

// Reuse the root across hot reloads so dev never double-mounts.
const container = document.getElementById('root')
const root = (container.__root ||= createRoot(container))

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
)
