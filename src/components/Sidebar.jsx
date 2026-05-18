import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import cultivos from '../data/cultivos.json'

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [hovered, setHovered] = useState(false)

  // Determinar cultivo activo desde la URL: /cultivo/:id
  const partes = pathname.split('/')
  const cultivoActivo = partes[1] === 'cultivo' ? partes[2] : null
  // En móvil abierto siempre expandido; en desktop colapsa cuando hay cultivo activo
  const colapsado = (!!cultivoActivo || pathname === '/comparar') && !mobileOpen

  function seleccionar(cultivoId) {
    if (cultivoId === cultivoActivo) {
      // Clic en el activo → deseleccionar, volver al home, expandir sidebar
      navigate('/')
    } else {
      navigate(`/cultivo/${cultivoId}`)
    }
    onMobileClose?.()
  }

  return (
    <>
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={[
          'fixed top-0 left-0 h-dvh bg-agro-surface flex flex-col z-30',
          'transition-[width,transform] duration-200 ease-in-out overflow-hidden',
          'lg:translate-x-0 lg:static lg:z-auto',
          colapsado && !hovered ? 'w-16' : 'w-60',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
        onMouseEnter={() => colapsado && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Logo */}
        <div
          className={[
            'border-b border-agro-accent shrink-0 flex items-center cursor-pointer',
            colapsado && !hovered ? 'justify-center py-4 px-2' : 'px-4 py-4 gap-3',
          ].join(' ')}
          onClick={() => { navigate('/'); onMobileClose?.() }}
        >
          <img
            src="/logo Agrovision.png"
            alt="AgroVisión logo"
            className="w-9 h-9 object-contain shrink-0"
          />
          {(!colapsado || hovered) && (
            <div className="flex flex-col gap-0.5">
              <img
                src="/texto Agrovision.png"
                alt="AgroVisión"
                className="h-7 object-contain object-left"
              />
              <img
                src="/down text.png"
                alt="Una guía para tu cultivo"
                className="object-contain object-left w-[80%]"
              />
            </div>
          )}
        </div>

        {/* Lista de cultivos */}
        <nav className="flex-1 overflow-y-auto overscroll-contain py-3">
          {/* Comparar cultivos */}
          <button
            onClick={() => { navigate('/comparar'); onMobileClose?.() }}
            className={[
              'relative w-full flex items-center transition-colors select-none',
              colapsado && !hovered ? 'justify-center py-3 px-2' : 'gap-3 px-4 py-2.5 text-left',
              pathname === '/comparar'
                ? 'bg-agro-lima/15 text-agro-lima'
                : 'text-agro-text hover:bg-agro-lima/10',
            ].join(' ')}
          >
            <span className={colapsado && !hovered ? 'text-2xl' : 'text-xl shrink-0'}>⚖️</span>
            <span className={[
              'font-titulo font-bold text-sm truncate transition-all duration-200',
              pathname === '/comparar' ? 'text-agro-lima' : '',
              (!colapsado || hovered) ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0',
            ].join(' ')}>
              Comparar cultivos
            </span>
            {colapsado && !hovered && pathname === '/comparar' && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-agro-lima rounded-r-full" />
            )}
          </button>

          <div className="border-t border-agro-accent/30 mx-4 my-2" />

          {cultivos.map(cultivo => {
            const esActivo = cultivoActivo === cultivo.id

            return (
              <div key={cultivo.id}>
                <button
                  onClick={() => seleccionar(cultivo.id)}
                  className={[
                    'relative w-full flex items-center transition-colors select-none',
                    colapsado && !hovered
                      ? 'justify-center py-3 px-2'
                      : 'gap-3 px-4 py-2.5 text-left',
                    esActivo
                      ? 'bg-agro-lima/15 text-agro-lima'
                      : 'text-agro-text hover:bg-agro-lima/10',
                  ].join(' ')}
                >
                  <span className={colapsado && !hovered ? 'text-2xl' : 'text-xl shrink-0'}>
                    {cultivo.emoji}
                  </span>

                  <span
                    className={[
                      'font-titulo font-bold text-sm truncate transition-all duration-200',
                      esActivo ? 'text-agro-lima' : '',
                      (!colapsado || hovered) ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0',
                    ].join(' ')}
                  >
                    {cultivo.nombre}
                  </span>

                  {/* Indicador activo en modo colapsado */}
                  {colapsado && !hovered && esActivo && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-agro-lima rounded-r-full" />
                  )}
                </button>
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
