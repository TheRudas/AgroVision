import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import DetalleCultivo from './pages/DetalleCultivo'

function AnimatedRoutes() {
  const location = useLocation()
  // Usamos solo el segundo segmento de la ruta como key para que el fade
  // ocurra al cambiar de cultivo pero no al cambiar de sección
  const routeKey = location.pathname.split('/').slice(0, 3).join('/')

  return (
    <main key={routeKey} className="flex-1 overflow-y-auto animate-fadein">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/cultivo/:id" element={<DetalleCultivo />} />
        <Route path="/cultivo/:id/:seccion" element={<DetalleCultivo />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
  )
}

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-dvh bg-agro-bg overflow-hidden">
      <Sidebar
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header móvil */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-agro-surface border-b border-agro-accent shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-agro-muted hover:text-agro-limaHover p-1"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <img src="/logo Agrovision.png" alt="AgroVisión" className="w-7 h-7 object-contain shrink-0" />
          <img src="/texto Agrovision.png" alt="AgroVisión" className="h-7 object-contain object-left" />
        </header>

        <AnimatedRoutes />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
