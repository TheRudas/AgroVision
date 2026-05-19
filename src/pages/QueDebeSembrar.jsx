import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cultivos from '../data/cultivos.json'
import { preguntas, puntajes, maxPuntaje, razones } from '../data/recomendador.js'

function calcularResultados(respuestas) {
  const scores = { mango: 0, banano: 0, aji: 0, maiz: 0, palma: 0, sandia: 0 }

  for (const [preguntaId, opcionId] of Object.entries(respuestas)) {
    const pts = puntajes[preguntaId]?.[opcionId]
    if (!pts) continue
    for (const [cultivoId, puntos] of Object.entries(pts)) {
      scores[cultivoId] += puntos
    }
  }

  return Object.entries(scores)
    .map(([id, score]) => ({
      id,
      score,
      porcentaje: Math.round((score / maxPuntaje[id]) * 100),
    }))
    .sort((a, b) => b.porcentaje - a.porcentaje)
    .slice(0, 3)
}

function getExplicaciones(cultivoId, respuestas) {
  const positivos = []
  const advertencias = []

  for (const [preguntaId, opcionId] of Object.entries(respuestas)) {
    const razon = razones[preguntaId]?.[opcionId]?.[cultivoId]
    if (!razon) continue
    if (razon.positivo) positivos.push(razon.positivo)
    else if (razon.advertencia) advertencias.push(razon.advertencia)
  }

  const result = []
  result.push(...positivos.slice(0, 2).map(t => ({ tipo: 'bien', texto: t })))
  if (advertencias.length > 0 && result.length < 3) {
    result.push({ tipo: 'advertencia', texto: advertencias[0] })
  }
  if (result.length < 2 && positivos.length >= 3) {
    result.push({ tipo: 'bien', texto: positivos[2] })
  }
  return result.slice(0, 3)
}

// ── Pantalla intro ─────────────────────────────────────────────────────────────

function PantallaIntro({ onStart }) {
  return (
    <div className="animate-fadein flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
      <div className="text-7xl mb-6 select-none">🌾</div>
      <h1 className="font-titulo font-bold text-3xl text-agro-text mb-3">
        ¿Qué debo sembrar?
      </h1>
      <p className="text-agro-muted text-base max-w-md leading-relaxed mb-8">
        No todos los cultivos sirven para todos los terrenos. Responde
        6 preguntas simples y te decimos cuál encaja mejor con tu zona,
        tu suelo y tus objetivos.
      </p>
      <button
        onClick={onStart}
        className="bg-agro-lima hover:bg-agro-limaHover text-agro-surface font-titulo font-bold px-8 py-3 rounded-xl text-base transition-colors"
      >
        Comenzar →
      </button>
    </div>
  )
}

// ── Pantalla de pregunta ───────────────────────────────────────────────────────

function PantallaPregunta({ pregunta, pasoActual, total, onResponder, onAnterior }) {
  const progreso = ((pasoActual - 1) / total) * 100

  return (
    <div className="animate-fadein flex flex-col flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
      {/* Barra de progreso */}
      <div className="mb-8 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-agro-muted text-sm font-titulo">
            Pregunta {pasoActual} de {total}
          </span>
          <span className="text-agro-muted text-sm">{Math.round(progreso)}%</span>
        </div>
        <div className="h-2 bg-agro-card rounded-full overflow-hidden">
          <div
            className="h-full bg-agro-lima rounded-full transition-all duration-300"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      {/* Enunciado */}
      <div className="mb-6 shrink-0">
        <h2 className="font-titulo font-bold text-2xl text-agro-text mb-1.5">
          {pregunta.titulo}
        </h2>
        {pregunta.ayuda && (
          <p className="text-agro-muted text-sm">{pregunta.ayuda}</p>
        )}
      </div>

      {/* Opciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pregunta.opciones.map(opcion => (
          <button
            key={opcion.id}
            onClick={() => onResponder(opcion.id)}
            className="flex items-start gap-4 p-4 rounded-xl bg-agro-card border border-agro-accent/30 hover:border-agro-lima hover:bg-agro-lima/10 transition-all text-left group"
          >
            <span className="text-3xl shrink-0 mt-0.5 select-none">{opcion.emoji}</span>
            <div>
              <div className="font-titulo font-bold text-agro-text text-sm group-hover:text-agro-lima transition-colors">
                {opcion.label}
              </div>
              <div className="text-agro-muted text-xs mt-0.5 leading-snug">
                {opcion.descripcion}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Anterior */}
      {pasoActual > 1 && (
        <button
          onClick={onAnterior}
          className="mt-6 text-agro-muted hover:text-agro-text text-sm self-start transition-colors"
        >
          ← Anterior
        </button>
      )}
    </div>
  )
}

// ── Tarjeta de resultado individual ───────────────────────────────────────────

function TarjetaResultado({ item, posicion, respuestas, primerLugar }) {
  const navigate = useNavigate()
  const cultivo = cultivos.find(c => c.id === item.id)
  if (!cultivo) return null

  const medallas = ['🥇', '🥈', '🥉']
  const explicaciones = getExplicaciones(item.id, respuestas)

  const colorBarra =
    posicion === 0 ? 'bg-green-500' :
    posicion === 1 ? 'bg-amber-400' : 'bg-amber-700'

  return (
    <div
      className={[
        'rounded-xl border p-5 transition-all',
        primerLugar
          ? 'bg-agro-card border-agro-lima/80 shadow-lg shadow-agro-lima/10'
          : 'bg-agro-card/60 border-agro-accent/60',
      ].join(' ')}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl select-none">{medallas[posicion]}</span>
          <span className="text-3xl select-none">{cultivo.emoji}</span>
          <div>
            <div className="font-titulo font-bold text-agro-text text-lg leading-tight">
              {cultivo.nombre}
            </div>
            <div className="text-agro-muted text-xs italic">{cultivo.nombre_cientifico}</div>
          </div>
        </div>
        <div className="text-right shrink-0 ml-2">
          <div
            className={`font-titulo font-bold text-xl ${
              item.porcentaje >= 70 ? 'text-agro-lima' : 'text-agro-muted'
            }`}
          >
            {item.porcentaje}%
          </div>
          <div className="text-agro-muted text-xs">compatibilidad</div>
        </div>
      </div>

      {/* Barra */}
      <div className="h-2 bg-agro-bg rounded-full mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorBarra}`}
          style={{ width: `${item.porcentaje}%` }}
        />
      </div>

      {/* Razones */}
      {explicaciones.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {explicaciones.map((exp, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 mt-0.5 select-none">
                {exp.tipo === 'bien' ? '✅' : '⚠️'}
              </span>
              <span className={exp.tipo === 'bien' ? 'text-agro-text' : 'text-agro-muted'}>
                {exp.texto}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate(`/cultivo/${item.id}`)}
        className={[
          'w-full py-2.5 rounded-lg font-titulo font-bold text-sm transition-colors',
          primerLugar
            ? 'bg-agro-lima hover:bg-agro-limaHover text-agro-surface'
            : 'bg-transparent border border-agro-accent/70 hover:border-agro-lima/70 text-agro-text hover:text-agro-lima',
        ].join(' ')}
      >
        Ver guía completa →
      </button>
    </div>
  )
}

// ── Pantalla de resultados ─────────────────────────────────────────────────────

function PantallaResultados({ respuestas, onReiniciar }) {
  const navigate = useNavigate()
  const top3 = calcularResultados(respuestas)

  return (
    <div className="animate-fadein px-6 py-8 max-w-2xl mx-auto w-full">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 select-none">🌾</div>
        <h2 className="font-titulo font-bold text-2xl text-agro-text mb-2">
          Tu recomendación
        </h2>
        <p className="text-agro-muted text-sm">
          Basado en tus respuestas, estos son los cultivos más adecuados para ti
        </p>
      </div>

      {/* Banner comparador */}
      <div
        onClick={() => navigate(`/comparar?a=${top3[0]?.id ?? ''}&b=${top3[1]?.id ?? ''}`)}
        className="mb-6 rounded-2xl bg-agro-card border border-agro-lima/30 p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:border-agro-lima/70 hover:bg-agro-lima/5 transition-all group"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <span className="text-4xl shrink-0 select-none">⚖️</span>
          <div className="min-w-0">
            <div className="font-titulo font-bold text-agro-text text-base group-hover:text-agro-lima transition-colors">
              ¿Sigues teniendo dudas?
            </div>
            <div className="text-agro-muted text-sm leading-snug">
              Aclaralas sin compromiso! Consulta y compara los cultivos que mas se adaptan a tus respuestas!
            </div>
          </div>
        </div>
        <button
          className="w-full sm:w-auto sm:shrink-0 bg-agro-lima hover:bg-agro-limaHover text-agro-surface font-titulo font-bold text-sm px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
          onClick={e => {
            e.stopPropagation()
            const a = top3[0]?.id ?? ''
            const b = top3[1]?.id ?? ''
            navigate(`/comparar?a=${a}&b=${b}`)
          }}
        >
          Comparar →
        </button>
      </div>

      <div className="space-y-4">
        {top3.map((item, index) => (
          <TarjetaResultado
            key={item.id}
            item={item}
            posicion={index}
            respuestas={respuestas}
            primerLugar={index === 0}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onReiniciar}
          className="w-[45%] bg-agro-lima hover:bg-agro-limaHover text-agro-surface font-titulo font-bold py-2.5 rounded-full text-sm transition-colors"
        >
          Responder de nuevo
        </button>
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────

export default function QueDebeSembrar() {
  const [paso, setPaso] = useState(0)
  const [respuestas, setRespuestas] = useState({})

  function responder(opcionId) {
    const pregunta = preguntas[paso - 1]
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: opcionId }
    setRespuestas(nuevasRespuestas)

    if (paso >= preguntas.length) {
      setPaso(preguntas.length + 1)
    } else {
      setPaso(paso + 1)
    }
  }

  function reiniciar() {
    setPaso(0)
    setRespuestas({})
  }

  if (paso === 0) {
    return <PantallaIntro key={0} onStart={() => setPaso(1)} />
  }

  if (paso > preguntas.length) {
    return <PantallaResultados key="resultados" respuestas={respuestas} onReiniciar={reiniciar} />
  }

  return (
    <PantallaPregunta
      key={paso}
      pregunta={preguntas[paso - 1]}
      pasoActual={paso}
      total={preguntas.length}
      onResponder={responder}
      onAnterior={() => setPaso(paso - 1)}
    />
  )
}
