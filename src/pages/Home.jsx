import { useNavigate } from 'react-router-dom'
import cultivos from '../data/cultivos.json'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-titulo font-bold text-agro-text text-3xl">Bienvenido a AgroVisión</h1>
        <p className="text-agro-muted font-cuerpo mt-1">Selecciona un cultivo para comenzar</p>
      </div>

      {/* Banner recomendador */}
      <div
        onClick={() => navigate('/recomendar')}
        className="mb-6 rounded-2xl bg-agro-card border border-agro-lima/30 p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-agro-lima/70 hover:bg-agro-lima/5 transition-all group"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-4xl shrink-0 select-none">🌾</span>
          <div className="min-w-0">
            <div className="font-titulo font-bold text-agro-text text-lg group-hover:text-agro-lima transition-colors">
              ¿No sabes qué sembrar?
            </div>
            <div className="text-agro-muted text-sm leading-snug">
              Responde 6 preguntas simples y te recomendamos el cultivo ideal para ti
            </div>
          </div>
        </div>
        <button
          className="w-full sm:w-auto sm:shrink-0 bg-agro-lima hover:bg-agro-limaHover text-agro-surface font-titulo font-bold text-sm px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
          onClick={e => { e.stopPropagation(); navigate('/recomendar') }}
        >
          Comenzar →
        </button>
      </div>

      {/* Lista de cultivos */}
      <div className="flex flex-col gap-3">
        {cultivos.map(c => (
          <div
            key={c.id}
            onClick={() => navigate(`/cultivo/${c.id}`)}
            className="flex items-center gap-4 bg-agro-card border border-agro-accent/20 rounded-2xl px-4 py-3 cursor-pointer hover:border-agro-lima/40 hover:bg-agro-card/80 transition-all group"
          >
            <span className="text-3xl shrink-0 select-none">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-titulo font-bold text-agro-text text-base leading-tight group-hover:text-agro-lima transition-colors">
                {c.nombre}
              </div>
              <div className="text-agro-muted text-xs italic leading-tight mt-0.5">
                {c.nombre_cientifico}
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); navigate(`/cultivo/${c.id}`) }}
              className="shrink-0 bg-agro-lima/20 hover:bg-agro-lima text-agro-lima hover:text-agro-surface font-titulo font-bold text-sm px-4 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              Ver →
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
