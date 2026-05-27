import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </section>
  )
}

function SeccionSuelo({ suelo }) {
  const campos = [
    { label: '💧 Humedad del suelo', valor: suelo.humedad },
    { label: 'Profundidad',        valor: suelo.profundidad },
    { label: '🧪 pH',               valor: suelo.ph },
    { label: '🧪 Nota de pH',      valor: suelo.ph_nota },
  ].filter(c => c.valor !== undefined)

  return (
    <SeccionCollapsible id="suelo" titulo="Suelo">
      <div className="flex flex-col gap-4">
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
        {suelo.textura && (
          <div className="bg-agro-card border border-agro-accent/30 rounded-xl p-4 flex gap-3">
            <div>
              <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-1">⛏️ Textura del suelo</p>
              <p className="text-agro-text font-cuerpo text-sm">{suelo.textura_extra ? `${suelo.textura}. ${suelo.textura_extra}` : suelo.textura}</p>
            </div>
          </div>
        )}
        {suelo.tip_textura && (
          <div className="bg-agro-card border border-agro-accent/30 rounded-xl p-4 flex gap-3">
            <span className="text-lg shrink-0">🔍</span>
            <div>
              <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-1">¿Cómo identificar la textura en campo?</p>
              <p className="text-agro-text font-cuerpo text-sm">{suelo.tip_textura}</p>
            </div>
          </div>
        )}
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
          <div className="grid grid-cols-3 gap-3">
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

function comoBullets(texto) {
  if (!texto) return []
  return texto.split('. ').map(s => s.trim()).filter(Boolean).map(s => s.endsWith('.') ? s : s + '.')
}

function SeccionRiego({ riego }) {
  const items = [
    { icono: '💧', label: 'Frecuencia', valor: riego.frecuencia },
    { icono: '🪣', label: 'Cantidad por riego', valor: riego.cantidad },
    { icono: '⚠️', label: 'Nota importante', valor: riego.nota },
  ].filter(item => !esPendiente(item.valor))

  return (
    <SeccionCollapsible id="riego" titulo="Riego">
      <div className="bg-agro-card rounded-xl p-5">
        <ol className="flex flex-col gap-0">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-agro-lima mt-1 shrink-0" />
                {i < items.length - 1 && (
                  <div className="w-0.5 bg-agro-lima flex-1 my-1" />
                )}
              </div>
              <div className="pb-5">
                <p className="font-titulo font-bold text-agro-text text-sm">{item.icono} {item.label}</p>
                <ul className="flex flex-col gap-1.5 mt-1.5">
                  {comoBullets(item.valor).map((punto, j) => (
                    <li key={j} className="flex items-start gap-2 text-agro-text font-cuerpo text-sm leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-agro-lima/70 shrink-0" />
                      {punto}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SeccionCollapsible>
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
    <SeccionCollapsible id="fenologia" titulo="Fenología y etapas">
      <div className="bg-agro-card rounded-xl p-5">
        <FenologiaTimeline etapas={fenologia.etapas} />
      </div>
    </SeccionCollapsible>
  )
}

function SeccionPoscosecha({ poscosecha }) {
  if (!poscosecha) return null
  return (
    <SeccionCollapsible id="poscosecha" titulo="Poscosecha">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">🌡️ Temperatura de almacenamiento</p>
            <p className="text-agro-text font-cuerpo text-sm leading-snug">{poscosecha.temperatura_almacenamiento}</p>
          </div>
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">📅 Vida útil</p>
            <p className="text-agro-text font-cuerpo text-sm leading-snug">{poscosecha.vida_util}</p>
          </div>
        </div>
        {Array.isArray(poscosecha.recomendaciones) && poscosecha.recomendaciones.length > 0 && (
          <div className="bg-agro-card rounded-xl p-4">
            <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-3">Recomendaciones</p>
            <ul className="flex flex-col gap-2">
              {poscosecha.recomendaciones.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-agro-text font-cuerpo text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-agro-lima shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SeccionCollapsible>
  )
}

const TIPO_BADGE = {
  insecto:  { label: 'Insecto',  cls: 'bg-teal-500/15 text-teal-400' },
  hongo:    { label: 'Hongo',    cls: 'bg-amber-500/15 text-amber-400' },
  bacteria: { label: 'Bacteria', cls: 'bg-red-500/15 text-red-400' },
  'acaro':  { label: 'Ácaro',   cls: 'bg-purple-500/15 text-purple-400' },
  virus:    { label: 'Virus',    cls: 'bg-yellow-500/15 text-yellow-400' },
  nematodo: { label: 'Nematodo', cls: 'bg-blue-500/15 text-blue-400' },
}

function SeccionPlagas({ plagas }) {
  if (!plagas?.length) return null
  return (
    <SeccionCollapsible id="plagas" titulo="Plagas comunes">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plagas.map((plaga, i) => {
          const badge = TIPO_BADGE[plaga.tipo] ?? { label: plaga.tipo, cls: 'bg-agro-muted/15 text-agro-muted' }
          return (
            <div key={i} className="bg-agro-card rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl select-none">{plaga.emoji}</span>
                  <div>
                    <span className="font-titulo font-bold text-agro-text text-sm leading-tight">{plaga.nombre}</span>
                    {plaga.nombre_cientifico && (
                      <span className="block font-cuerpo italic text-agro-muted text-xs">{plaga.nombre_cientifico}</span>
                    )}
                  </div>
                </div>
                <span className={`shrink-0 text-xs font-titulo font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
              <div>
                <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-1">Cómo identificarla</p>
                <p className="text-agro-text font-cuerpo text-sm leading-snug">{plaga.como_identificar}</p>
              </div>
              <div>
                <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">🛡️ Manejo y prevención</p>
                <ul className="flex flex-col gap-1.5">
                  {comoBullets(plaga.prevencion || plaga.que_hacer).map((punto, j) => (
                    <li key={j} className="flex items-start gap-2 text-agro-text font-cuerpo text-sm leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-agro-lima/70 shrink-0" />
                      {punto}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </SeccionCollapsible>
  )
}

export default function DetalleCultivo() {
  const { id, seccion } = useParams()
  const navigate = useNavigate()
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
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col w-full">
      <button
        onClick={() => navigate('/')}
        className="self-start flex items-center gap-1.5 text-agro-muted hover:text-agro-lima transition-colors mb-5 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-titulo font-bold text-sm">Volver a cultivos</span>
      </button>

      <div className="flex items-center gap-4">
        <span className="text-5xl">{cultivo.emoji}</span>
        <div>
          <h2 className="font-titulo font-bold text-agro-text text-2xl">
            {cultivo.nombre}
            {cultivo.nombre_cientifico && (
              <em className="font-cuerpo font-normal not-italic text-agro-muted text-lg"> (<i>{cultivo.nombre_cientifico}</i>)</em>
            )}
          </h2>
          {esPendiente(cultivo.descripcion) ? (
            <DatosPendientes />
          ) : (
            <p className="text-agro-muted font-cuerpo text-sm mt-1">{cultivo.descripcion}</p>
          )}
        </div>
      </div>

      <SeccionSuelo suelo={cultivo.condiciones_suelo} />
      <SeccionClima clima={cultivo.clima} />
      {cultivo.riego && <SeccionRiego riego={cultivo.riego} />}
      <SeccionNutricion nutricion={cultivo.nutricion} />
      <SeccionFenologia fenologia={cultivo.fenologia} />
      <SeccionPlagas plagas={cultivo.plagas} />
      <SeccionPoscosecha poscosecha={cultivo.poscosecha} />

      <button
        onClick={() => navigate('/')}
        className="self-center flex items-center gap-2 bg-agro-lima hover:bg-agro-limaHover text-agro-surface font-titulo font-bold text-sm px-6 py-2.5 rounded-full transition-colors mt-8 group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver a cultivos
      </button>
    </div>
  )
}
