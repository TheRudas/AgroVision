import cultivos from '../data/cultivos.json'
import CultivoCard from '../components/CultivoCard'

export default function Home() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-titulo font-bold text-agro-text text-3xl">Bienvenido a AgroVisión</h1>
        <p className="text-agro-muted font-cuerpo mt-1">Selecciona un cultivo para comenzar</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cultivos.map(c => (
          <CultivoCard key={c.id} cultivo={c} />
        ))}
      </div>
    </div>
  )
}
