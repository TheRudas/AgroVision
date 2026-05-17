import DatosPendientes from './DatosPendientes'

export default function TemperaturaCard({ label, valor, unidad }) {
  return (
    <div className="bg-agro-card rounded-xl p-4 flex flex-col items-center gap-2 flex-1 min-w-[100px]">
      <span className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide">{label}</span>
      {valor !== null && valor !== undefined ? (
        <span className="text-agro-text text-2xl font-titulo font-bold">
          {valor}{unidad}
        </span>
      ) : (
        <DatosPendientes />
      )}
    </div>
  )
}
