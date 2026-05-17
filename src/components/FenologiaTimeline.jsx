import DatosPendientes from './DatosPendientes'

function esPendiente(valor) {
  return !valor || valor.startsWith('[')
}

export default function FenologiaTimeline({ etapas }) {
  return (
    <ol className="flex flex-col gap-0">
      {etapas.map((etapa, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-agro-lima mt-1 shrink-0" />
            {i < etapas.length - 1 && (
              <div className="w-0.5 bg-agro-lima flex-1 my-1" />
            )}
          </div>
          <div className="pb-6">
            <p className="font-titulo font-bold text-agro-text text-sm">
              {esPendiente(etapa.nombre) ? <DatosPendientes /> : etapa.nombre}
            </p>
            <p className="text-agro-muted text-xs font-cuerpo mt-0.5">
              {esPendiente(etapa.duracion) ? <DatosPendientes /> : etapa.duracion}
            </p>
            <p className="text-agro-text text-sm font-cuerpo mt-1">
              {esPendiente(etapa.descripcion) ? <DatosPendientes /> : etapa.descripcion}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
