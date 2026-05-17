import { useNavigate } from 'react-router-dom'

export default function CultivoCard({ cultivo }) {
  const navigate = useNavigate()
  return (
    <div
      className="bg-agro-card rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer hover:ring-1 hover:ring-agro-limaHover transition-all"
      onClick={() => navigate(`/cultivo/${cultivo.id}`)}
    >
      <span className="text-5xl">{cultivo.emoji}</span>
      <h2 className="font-titulo font-bold text-agro-text text-lg text-center">{cultivo.nombre}</h2>
      <button
        className="mt-auto bg-agro-lima text-agro-bg font-titulo font-bold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        onClick={e => { e.stopPropagation(); navigate(`/cultivo/${cultivo.id}`) }}
      >
        Ver detalles
      </button>
    </div>
  )
}
