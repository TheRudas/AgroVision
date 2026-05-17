import { useState } from 'react'
import { useParams } from 'react-router-dom'
import cultivos from '../data/cultivos.json'
import DatosPendientes from '../components/DatosPendientes'
import TemperaturaCard from '../components/TemperaturaCard'
import FenologiaTimeline from '../components/FenologiaTimeline'

function esPendiente(valor) {
  return valor === null || valor === undefined || (typeof valor === 'string' && valor.startsWith('['))
}

function SeccionCollapsible({ id, titulo, children, defaultOpen = true }) {
  const [abierto, setAbierto] = useState(defaultOpen)

  return (
    <section id={id} className="scroll-mt-4 border-b border-agro-accent/40 last:border-b-0">
      <button
        onClick={() => setAbierto(v => !v)}
        className="w-full flex items-center justify-between gap-2 py-4 group"
      >
        <h3 className="font-titulo font-bold text-agro-text text-base group-hover:text-agro-limaHover transition-colors">
          {titulo}
        </h3>
        <svg
          className={`w-4 h-4 text-agro-muted group-hover:text-agro-limaHover transition-all duration-200 shrink-0 ${abierto ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {abierto && <div className="pb-5">{children}</div>}
    </section>
  )
}

function SeccionSuelo({ suelo }) {
  const campos = [
    { label: 'Humedad del suelo',  valor: suelo.humedad },
    { label: 'Textura del suelo',  valor: suelo.textura },
    { label: 'Profundidad',        valor: suelo.profundidad },
    { label: 'pH',                 valor: suelo.ph },
  ].filter(c => c.valor !== undefined)

  return (
    <SeccionCollapsible id="suelo" titulo="Suelo">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {campos.map(({ label, valor }) => (
          <div key={label} className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">{label}</p>
            {esPendiente(valor) ? <DatosPendientes /> : (
              <p className="text-agro-text font-cuerpo">{valor}</p>
            )}
          </div>
        ))}
      </div>
    </SeccionCollapsible>
  )
}

function SeccionClima({ clima }) {
  const { temperatura, horas_luz, rango_humedad } = clima
  return (
    <SeccionCollapsible id="clima" titulo="Clima">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">Temperatura</p>
          <div className="flex gap-3">
            <TemperaturaCard label="Máxima" valor={temperatura.maxima} unidad={temperatura.unidad} />
            <TemperaturaCard label="Media"  valor={temperatura.media}  unidad={temperatura.unidad} />
            <TemperaturaCard label="Mínima" valor={temperatura.minima} unidad={temperatura.unidad} />
          </div>
          {!esPendiente(temperatura.nota) && (
            <p className="text-agro-muted text-xs font-cuerpo mt-2">{temperatura.nota}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">Horas de luz diarias</p>
            {esPendiente(horas_luz.valor) ? <DatosPendientes /> : (
              <p className="text-agro-text font-titulo font-bold text-2xl">{horas_luz.valor}h</p>
            )}
            {!esPendiente(horas_luz.nota) && (
              <p className="text-agro-muted text-xs font-cuerpo mt-1">{horas_luz.nota}</p>
            )}
          </div>
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">Humedad ambiental</p>
            {(esPendiente(rango_humedad.minimo) && esPendiente(rango_humedad.maximo)) ? (
              <DatosPendientes />
            ) : (
              <p className="text-agro-text font-titulo font-bold text-2xl">
                {rango_humedad.minimo} — {rango_humedad.maximo} {rango_humedad.unidad}
              </p>
            )}
            {!esPendiente(rango_humedad.nota) && (
              <p className="text-agro-muted text-xs font-cuerpo mt-1">{rango_humedad.nota}</p>
            )}
          </div>
        </div>
      </div>
    </SeccionCollapsible>
  )
}

function ListaNutricion({ items }) {
  if (esPendiente(items)) return <DatosPendientes />
  if (!Array.isArray(items)) return <p className="text-agro-text font-cuerpo text-sm">{items}</p>
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-agro-text font-cuerpo text-sm">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-agro-lima shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function SeccionNutricion({ nutricion }) {
  const tieneFertilizantes = Array.isArray(nutricion.fertilizantes) && nutricion.fertilizantes.length > 0

  return (
    <SeccionCollapsible id="nutricion" titulo="Nutrición">
      <div className={`grid gap-4 ${tieneFertilizantes ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        <div className="bg-agro-card rounded-xl p-4">
          <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-3">Requerimientos nutricionales</p>
          <ListaNutricion items={nutricion.requerimientos} />
        </div>
        {tieneFertilizantes && (
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-3">Fertilizantes recomendados</p>
            <ListaNutricion items={nutricion.fertilizantes} />
          </div>
        )}
      </div>
    </SeccionCollapsible>
  )
}

function SeccionFenologia({ fenologia }) {
  return (
    <SeccionCollapsible id="fenologia" titulo="Fenología">
      <div className="bg-agro-card rounded-xl p-5">
        <FenologiaTimeline etapas={fenologia.etapas} />
      </div>
    </SeccionCollapsible>
  )
}

export default function DetalleCultivo() {
  const { id, seccion } = useParams()
  const cultivo = cultivos.find(c => c.id === id)

  if (!cultivo) {
    return <div className="p-8 text-agro-muted font-cuerpo">Cultivo no encontrado.</div>
  }

  if (seccion) {
    setTimeout(() => {
      document.getElementById(seccion)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="p-6 sm:p-8 flex flex-col max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="text-5xl">{cultivo.emoji}</span>
        <div>
          <h2 className="font-titulo font-bold text-agro-text text-2xl">{cultivo.nombre}</h2>
          {esPendiente(cultivo.descripcion) ? (
            <DatosPendientes />
          ) : (
            <p className="text-agro-muted font-cuerpo text-sm mt-1">{cultivo.descripcion}</p>
          )}
        </div>
      </div>

      <SeccionSuelo suelo={cultivo.condiciones_suelo} />
      <SeccionClima clima={cultivo.clima} />
      <SeccionNutricion nutricion={cultivo.nutricion} />
      <SeccionFenologia fenologia={cultivo.fenologia} />
    </div>
  )
}
