import { useState } from 'react'
import cultivos from '../data/cultivos.json'

function CustomSelect({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative z-20 w-full bg-agro-card text-agro-text font-cuerpo text-sm rounded-xl px-3 py-2.5 border border-agro-accent/30 hover:border-agro-lima/50 transition-colors flex items-center justify-between gap-2"
      >
        <span className={selected ? 'text-agro-text' : 'text-agro-muted'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-agro-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-agro-card border border-agro-accent/30 rounded-xl overflow-hidden z-20 shadow-xl">
          {options.map(o => (
            <button
              key={o.value}
              onClick={() => { onChange(o.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2.5 font-cuerpo text-sm transition-colors ${
                o.value === value
                  ? 'text-agro-lima bg-agro-lima/10 font-bold'
                  : 'text-agro-text hover:bg-agro-lima/10'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function parsearRango(str) {
  if (!str) return null
  const ge = str.match(/>=?\s*([\d.]+)/)
  if (ge) return parseFloat(ge[1])
  const rango = str.match(/([\d.]+)\s*[-–]\s*([\d.]+)/)
  if (rango) return (parseFloat(rango[1]) + parseFloat(rango[2])) / 2
  const solo = str.match(/([\d.]+)/)
  if (solo) return parseFloat(solo[1])
  return null
}

const FILAS_NUMERICAS = [
  { label: 'Temperatura máxima', get: c => c.clima.temperatura.maxima,       unidad: '°C',    raw: null },
  { label: 'Temperatura media',  get: c => c.clima.temperatura.media,         unidad: '°C',    raw: null },
  { label: 'Temperatura mínima', get: c => c.clima.temperatura.minima,        unidad: '°C',    raw: null },
  { label: 'Lluvia mínima',      get: c => c.clima.rango_humedad.minimo,      unidad: 'mm/mes', raw: null },
  { label: 'Lluvia máxima',      get: c => c.clima.rango_humedad.maximo,      unidad: 'mm/mes', raw: null },
  { label: 'Horas de luz',       get: c => parsearRango(c.clima.horas_luz.valor), unidad: 'h', raw: c => c.clima.horas_luz.valor ?? '—' },
  { label: 'pH del suelo',       get: c => parsearRango(c.condiciones_suelo.ph),  unidad: '',  raw: c => c.condiciones_suelo.ph ?? '—' },
]

const FILAS_TEXTO = [
  { label: 'Nota pH',           get: c => c.condiciones_suelo.ph_nota ?? '—' },
  { label: 'Textura del suelo', get: c => c.condiciones_suelo.textura ?? '—' },
  { label: 'info suelo',              get: c => c.condiciones_suelo.textura_extra ?? '—' },
  { label: 'Profundidad',       get: c => c.condiciones_suelo.profundidad ?? '—' },
]

function FilaNumerica({ label, valA, valB, unidad, displayA, displayB, indice }) {
  const mayorA = valA !== null && valB !== null && valA > valB
  const mayorB = valA !== null && valB !== null && valB > valA
  const igual   = valA !== null && valB !== null && valA === valB

  const textoA = displayA ?? (valA !== null ? `${valA}${unidad ? ` ${unidad}` : ''}` : '—')
  const textoB = displayB ?? (valB !== null ? `${valB}${unidad ? ` ${unidad}` : ''}` : '—')

  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 gap-2 ${indice % 2 !== 0 ? 'bg-agro-surface/50' : ''}`}>
      <p className={`font-titulo font-bold text-sm text-right ${mayorA ? 'text-agro-lima' : 'text-agro-text'}`}>
        {mayorA && <span className="mr-1 text-xs">↑</span>}
        {textoA}
        {igual && <span className="ml-1 text-xs text-agro-muted font-cuerpo font-normal">(=)</span>}
      </p>
      <div className="text-center whitespace-nowrap px-2 self-center">
        <p className="text-agro-muted text-xs font-cuerpo uppercase tracking-wide">{label}</p>
      </div>
      <p className={`font-titulo font-bold text-sm text-left ${mayorB ? 'text-agro-lima' : 'text-agro-text'}`}>
        {igual && <span className="mr-1 text-xs text-agro-muted font-cuerpo font-normal">(=)</span>}
        {textoB}
        {mayorB && <span className="ml-1 text-xs">↑</span>}
      </p>
    </div>
  )
}

function FilaTexto({ label, valA, valB, indice }) {
  return (
    <div className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 gap-2 ${indice % 2 !== 0 ? 'bg-agro-surface/50' : ''}`}>
      <p className="text-agro-text font-cuerpo text-xs text-right self-center">{valA}</p>
      <p className="text-agro-muted text-xs font-cuerpo uppercase tracking-wide text-center whitespace-nowrap px-2 self-center">{label}</p>
      <p className="text-agro-text font-cuerpo text-xs text-left self-center">{valB}</p>
    </div>
  )
}

export default function Comparar() {
  const [idA, setIdA] = useState('')
  const [idB, setIdB] = useState('')

  const cultivoA = cultivos.find(c => c.id === idA)
  const cultivoB = cultivos.find(c => c.id === idB)
  const listos = !!cultivoA && !!cultivoB

  const opcionesA = cultivos.filter(c => c.id !== idB).map(c => ({ value: c.id, label: `${c.emoji} ${c.nombre}` }))
  const opcionesB = cultivos.filter(c => c.id !== idA).map(c => ({ value: c.id, label: `${c.emoji} ${c.nombre}` }))

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full">
      <h2 className="font-titulo font-bold text-agro-text text-2xl">Comparar cultivos</h2>

      {/* Selectores */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">Cultivo A</p>
          <CustomSelect value={idA} onChange={setIdA} options={opcionesA} placeholder="Seleccionar cultivo..." />
        </div>
        <div>
          <p className="text-agro-cardLabel text-xs font-cuerpo uppercase tracking-wide mb-2">Cultivo B</p>
          <CustomSelect value={idB} onChange={setIdB} options={opcionesB} placeholder="Seleccionar cultivo..." />
        </div>
      </div>

      {/* Mensaje de espera */}
      {!listos && (
        <p className="text-agro-muted font-cuerpo text-sm text-center mt-4">
          Seleccioná dos cultivos para ver la comparación.
        </p>
      )}

      {/* Tabla comparativa */}
      {listos && <div className="bg-agro-card rounded-xl overflow-hidden">
        {/* Encabezado */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center bg-agro-surface px-4 py-3 gap-2">
          <p className="font-titulo font-bold text-agro-lima text-sm text-right">{cultivoA.emoji} {cultivoA.nombre}</p>
          <p className="text-agro-muted text-xs font-cuerpo uppercase tracking-wide text-center px-2">vs</p>
          <p className="font-titulo font-bold text-agro-lima text-sm text-left">{cultivoB.emoji} {cultivoB.nombre}</p>
        </div>

        {/* Filas numéricas */}
        {FILAS_NUMERICAS.map(({ label, get, unidad, raw }, i) => (
          <FilaNumerica
            key={label}
            label={label}
            valA={get(cultivoA)}
            valB={get(cultivoB)}
            unidad={unidad}
            displayA={raw ? raw(cultivoA) : null}
            displayB={raw ? raw(cultivoB) : null}
            indice={i}
          />
        ))}

        {/* Separador */}
        <div className="border-t border-agro-accent/30 mx-4" />

        {/* Filas de texto */}
        {FILAS_TEXTO.map(({ label, get }, i) => (
          <FilaTexto
            key={label}
            label={label}
            valA={get(cultivoA)}
            valB={get(cultivoB)}
            indice={i + FILAS_NUMERICAS.length}
          />
        ))}
      </div>}
    </div>
  )
}
