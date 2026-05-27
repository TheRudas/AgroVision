import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [hovered, setHovered] = useState(false)

  const partes = pathname.split('/')
  const cultivoActivo = partes[1] === 'cultivo' ? partes[2] : null
  const colapsado = (!!cultivoActivo || pathname === '/comparar' || pathname === '/recomendar') && !mobileOpen
  const expandido = !colapsado || hovered

  const enCultivos = pathname === '/' || !!cultivoActivo

  function irACultivos() {
    navigate('/')
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
            expandido ? 'px-4 py-4 gap-3' : 'justify-center py-4 px-2',
          ].join(' ')}
          onClick={() => { navigate('/'); onMobileClose?.() }}
        >
          <img
            src="/logo Agrovision.png"
            alt="AgroVisión logo"
            className="w-9 h-9 object-contain shrink-0"
          />
          {expandido && (
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overscroll-contain py-3">

          {/* Cultivos */}
          <button
            onClick={irACultivos}
            className={[
              'relative w-full flex items-center transition-colors select-none',
              expandido ? 'gap-3 px-4 py-2.5 text-left' : 'justify-center py-3 px-2',
              enCultivos
                ? 'bg-agro-lima/15 text-agro-lima'
                : 'text-agro-text hover:bg-agro-lima/10',
            ].join(' ')}
          >
            <span className={expandido ? 'text-xl shrink-0' : 'text-2xl'}>🌿</span>
            {expandido && (
              <>
                <span className={[
                  'font-titulo font-bold text-sm flex-1',
                  enCultivos ? 'text-agro-lima' : '',
                ].join(' ')}>
                  Cultivos
                </span>
                <span className="text-agro-muted text-base font-bold pr-1">›</span>
              </>
            )}
            {!expandido && enCultivos && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-agro-lima rounded-r-full" />
            )}
          </button>

          <div className="border-t border-agro-accent/30 mx-4 my-2" />

          {/* Comparar cultivos */}
          <button
            onClick={() => { navigate(pathname === '/comparar' ? '/' : '/comparar'); onMobileClose?.() }}
            className={[
              'relative w-full flex items-center transition-colors select-none',
              expandido ? 'gap-3 px-4 py-2.5 text-left' : 'justify-center py-3 px-2',
              pathname === '/comparar'
                ? 'bg-agro-lima/15 text-agro-lima'
                : 'text-agro-text hover:bg-agro-lima/10',
            ].join(' ')}
          >
            <span className={expandido ? 'text-xl shrink-0' : 'text-2xl'}>⚖️</span>
            {expandido && (
              <span className={[
                'font-titulo font-bold text-sm truncate',
                pathname === '/comparar' ? 'text-agro-lima' : '',
              ].join(' ')}>
                Comparar cultivos
              </span>
            )}
            {!expandido && pathname === '/comparar' && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-agro-lima rounded-r-full" />
            )}
          </button>

        </nav>
      </aside>
    </>
  )
}
