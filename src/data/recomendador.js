export const preguntas = [
  {
    id: 'temperatura',
    titulo: '¿Cómo es el calor donde cultivas?',
    ayuda: 'Piensa en cómo se siente el clima la mayor parte del año',
    opciones: [
      {
        id: 'muy_caliente',
        emoji: '🔥',
        label: 'Muy caliente',
        descripcion: 'Siempre hace calor, más de 28°C casi todo el año',
      },
      {
        id: 'caliente',
        emoji: '☀️',
        label: 'Caliente',
        descripcion: 'Hace calor pero no extremo, entre 24°C y 28°C',
      },
      {
        id: 'templado',
        emoji: '🌤️',
        label: 'Templado o fresco',
        descripcion: 'Hay momentos frescos, entre 18°C y 24°C',
      },
      {
        id: 'no_se',
        emoji: '🤷',
        label: 'No sé bien',
        descripcion: 'No tengo claro cómo es la temperatura de mi zona',
      },
    ],
  },
  {
    id: 'agua',
    titulo: '¿Cómo consigues agua para tus plantas?',
    ayuda: 'Considera tanto la lluvia como el acceso a riego propio',
    opciones: [
      {
        id: 'riego_siempre',
        emoji: '💧',
        label: 'Tengo riego',
        descripcion: 'Tengo pozo, manguera o canales — puedo regar cuando quiero',
      },
      {
        id: 'solo_lluvia',
        emoji: '🌧️',
        label: 'Solo lluvia',
        descripcion: 'Dependo completamente de la lluvia natural',
      },
      {
        id: 'a_veces',
        emoji: '⛅',
        label: 'Lluvia + algo de riego',
        descripcion: 'Hay lluvia pero en verano puedo añadir riego extra',
      },
    ],
  },
  {
    id: 'suelo',
    titulo: '¿Cómo se siente tu suelo húmedo?',
    ayuda: 'Toma un puñado de tierra húmeda y apriétala con la mano',
    opciones: [
      {
        id: 'suelto_arenoso',
        emoji: '🏜️',
        label: 'Se deshace fácil',
        descripcion: 'La bola se desarma sola y sientes granos al frotar — suelo suelto o arenoso',
      },
      {
        id: 'franco_normal',
        emoji: '🌱',
        label: 'Aguanta pero se rompe',
        descripcion: 'La bola se sostiene pero se rompe con un toque suave — suelo normal y equilibrado',
      },
      {
        id: 'pesado_arcilloso',
        emoji: '🪨',
        label: 'Se pega y se moldea',
        descripcion: 'Se queda pegado en los dedos, como plastilina — suelo pesado o arcilloso',
      },
    ],
  },
  {
    id: 'tiempo',
    titulo: '¿Cuánto puedes esperar para tu primera cosecha?',
    ayuda: 'Sé honesto — el tiempo es un factor clave para elegir bien',
    opciones: [
      {
        id: 'corto',
        emoji: '⚡',
        label: 'Menos de 6 meses',
        descripcion: 'Quiero resultados rápido — el ciclo corto es prioridad',
      },
      {
        id: 'medio',
        emoji: '📅',
        label: 'Entre 6 y 18 meses',
        descripcion: 'Puedo esperar hasta año y medio sin problema',
      },
      {
        id: 'largo',
        emoji: '🌳',
        label: 'Más de 18 meses',
        descripcion: 'Es una inversión a largo plazo — pienso en años',
      },
    ],
  },
  {
    id: 'experiencia',
    titulo: '¿Es tu primera vez cultivando?',
    ayuda: 'Ser honesto aquí te ayuda a elegir un cultivo que no te frustre',
    opciones: [
      {
        id: 'primero',
        emoji: '🌱',
        label: 'Sí, soy nuevo',
        descripcion: 'Apenas estoy empezando — nunca he cultivado en serio',
      },
      {
        id: 'algo',
        emoji: '🧑‍🌾',
        label: 'Algo de experiencia',
        descripcion: 'He cultivado antes pero aún estoy aprendiendo',
      },
      {
        id: 'experto',
        emoji: '👨‍🌾',
        label: 'Tengo experiencia',
        descripcion: 'Ya tengo varios ciclos encima y conozco el trabajo del campo',
      },
    ],
  },
  {
    id: 'objetivo',
    titulo: '¿Para qué quieres cultivar?',
    ayuda: 'El destino del cultivo cambia cuál te conviene más',
    opciones: [
      {
        id: 'consumo',
        emoji: '🏠',
        label: 'Para comer en casa',
        descripcion: 'Quiero alimentar a mi familia con lo que produzco',
      },
      {
        id: 'venta',
        emoji: '💰',
        label: 'Para vender',
        descripcion: 'Quiero ganar dinero vendiendo la cosecha',
      },
      {
        id: 'ambos',
        emoji: '🤝',
        label: 'Para las dos cosas',
        descripcion: 'Un poco para casa y el excedente para vender',
      },
    ],
  },
]

// puntajes[preguntaId][opcionId][cultivoId] → número (0–3)
export const puntajes = {
  temperatura: {
    muy_caliente: { mango: 3, banano: 2, aji: 0, maiz: 1, palma: 3, sandia: 2 },
    caliente:     { mango: 2, banano: 3, aji: 3, maiz: 3, palma: 2, sandia: 3 },
    templado:     { mango: 1, banano: 0, aji: 2, maiz: 3, palma: 0, sandia: 1 },
    no_se:        { mango: 1, banano: 1, aji: 1, maiz: 1, palma: 1, sandia: 1 },
  },
  agua: {
    riego_siempre: { mango: 1, banano: 3, aji: 2, maiz: 2, palma: 3, sandia: 2 },
    solo_lluvia:   { mango: 3, banano: 0, aji: 1, maiz: 2, palma: 0, sandia: 1 },
    a_veces:       { mango: 2, banano: 1, aji: 2, maiz: 3, palma: 1, sandia: 2 },
  },
  suelo: {
    suelto_arenoso:   { mango: 2, banano: 1, aji: 2, maiz: 2, palma: 1, sandia: 3 },
    franco_normal:    { mango: 2, banano: 3, aji: 2, maiz: 3, palma: 2, sandia: 2 },
    pesado_arcilloso: { mango: 1, banano: 0, aji: 0, maiz: 1, palma: 1, sandia: 0 },
  },
  tiempo: {
    corto: { mango: 0, banano: 0, aji: 2, maiz: 3, palma: 0, sandia: 3 },
    medio: { mango: 0, banano: 3, aji: 3, maiz: 2, palma: 0, sandia: 1 },
    largo: { mango: 3, banano: 1, aji: 0, maiz: 0, palma: 3, sandia: 0 },
  },
  experiencia: {
    primero: { mango: 0, banano: 1, aji: 1, maiz: 3, palma: 0, sandia: 2 },
    algo:    { mango: 1, banano: 2, aji: 2, maiz: 2, palma: 1, sandia: 2 },
    experto: { mango: 2, banano: 2, aji: 2, maiz: 1, palma: 3, sandia: 1 },
  },
  objetivo: {
    consumo: { mango: 2, banano: 3, aji: 2, maiz: 3, palma: 0, sandia: 2 },
    venta:   { mango: 2, banano: 2, aji: 2, maiz: 1, palma: 3, sandia: 2 },
    ambos:   { mango: 2, banano: 2, aji: 2, maiz: 2, palma: 2, sandia: 2 },
  },
}

// Suma de las mejores respuestas posibles para cada cultivo
export const maxPuntaje = {
  mango:  15,
  banano: 17,
  aji:    14,
  maiz:   18,
  palma:  17,
  sandia: 15,
}

// razones[preguntaId][opcionId][cultivoId] → { positivo: 'texto' } | { advertencia: 'texto' } | null
export const razones = {
  temperatura: {
    muy_caliente: {
      mango:  { positivo: 'Aguanta muy bien el calor intenso' },
      banano: { positivo: 'Se adapta bien al calor fuerte' },
      aji:    { advertencia: 'Prefiere climas menos calurosos (máx. 28°C)' },
      maiz:   null,
      palma:  { positivo: 'El calor intenso es su zona ideal' },
      sandia: { positivo: 'Produce bien en climas muy calientes' },
    },
    caliente: {
      mango:  { positivo: 'Tu clima es ideal para el mango' },
      banano: { positivo: 'Temperatura perfecta para el banano' },
      aji:    { positivo: 'Temperatura ideal para el ají' },
      maiz:   { positivo: 'Tu temperatura es buena para el maíz' },
      palma:  { positivo: 'Temperatura dentro del rango de la palma' },
      sandia: { positivo: 'Clima ideal para una sandía dulce' },
    },
    templado: {
      mango:  { advertencia: 'El mango crece mejor con más calor' },
      banano: { advertencia: 'El banano necesita más calor del que tienes' },
      aji:    { positivo: 'El ají se maneja bien en clima fresco' },
      maiz:   { positivo: 'El maíz es perfecto para climas templados' },
      palma:  { advertencia: 'La palma necesita clima mucho más caliente' },
      sandia: { advertencia: 'La sandía prefiere más calor para ser dulce' },
    },
    no_se: {
      mango: null, banano: null, aji: null, maiz: null, palma: null, sandia: null,
    },
  },
  agua: {
    riego_siempre: {
      mango:  { advertencia: 'El mango necesita períodos secos para florecer' },
      banano: { positivo: 'El banano agradece el riego constante' },
      aji:    { positivo: 'Con riego controlado el ají produce excelente' },
      maiz:   { positivo: 'El riego garantiza mejor rendimiento' },
      palma:  { positivo: 'La palma necesita agua constante todo el año' },
      sandia: { positivo: 'Con riego controlado la sandía es muy productiva' },
    },
    solo_lluvia: {
      mango:  { positivo: 'El mango florece naturalmente con la sequía' },
      banano: { advertencia: 'El banano necesita riego adicional en verano' },
      aji:    { advertencia: 'El ají necesita agua extra en verano' },
      maiz:   { positivo: 'El maíz funciona bien con lluvias regulares' },
      palma:  { advertencia: 'La palma requiere agua todo el año — la lluvia sola puede ser insuficiente' },
      sandia: { advertencia: 'La sandía necesita control del agua al final del ciclo' },
    },
    a_veces: {
      mango:  { positivo: 'El riego ocasional le va bien al mango' },
      banano: { positivo: 'Con un poco de riego extra el banano produce bien' },
      aji:    { positivo: 'El riego parcial es suficiente para el ají' },
      maiz:   { positivo: 'Tu acceso al agua es ideal para el maíz' },
      palma:  { advertencia: 'La palma idealmente necesita agua constante todo el año' },
      sandia: { positivo: 'Con algo de riego la sandía rinde muy bien' },
    },
  },
  suelo: {
    suelto_arenoso: {
      mango:  { positivo: 'Suelo suelto perfecto para las raíces del mango' },
      banano: { advertencia: 'El suelo arenoso retiene poca agua para el banano' },
      aji:    { positivo: 'Suelo con buen drenaje, ideal para el ají' },
      maiz:   { positivo: 'Suelo suelto con buen drenaje para el maíz' },
      palma:  { advertencia: 'La palma prefiere suelo con más retención de agua' },
      sandia: { positivo: 'Suelo suelto perfecto para la sandía' },
    },
    franco_normal: {
      mango:  { positivo: 'Tu suelo tiene buen equilibrio para el mango' },
      banano: { positivo: 'Suelo franco, el mejor para el banano' },
      aji:    { positivo: 'Buen suelo equilibrado para el ají' },
      maiz:   { positivo: 'Suelo ideal para el maíz' },
      palma:  { positivo: 'Tu suelo es adecuado para la palma' },
      sandia: { positivo: 'Tu suelo funciona bien para la sandía' },
    },
    pesado_arcilloso: {
      mango:  { advertencia: 'Suelo arcilloso puede generar problemas de drenaje' },
      banano: { advertencia: 'Suelo arcilloso puede asfixiar las raíces del banano' },
      aji:    { advertencia: 'El ají sufre en suelo arcilloso — agrega materia orgánica' },
      maiz:   { advertencia: 'Suelo arcilloso dificulta la penetración de raíces' },
      palma:  { advertencia: 'Suelo muy arcilloso puede encharcarse en lluvias' },
      sandia: { advertencia: 'Suelo arcilloso es el mayor riesgo para la sandía' },
    },
  },
  tiempo: {
    corto: {
      mango:  { advertencia: 'El mango tarda 1–3 años en dar fruto' },
      banano: { advertencia: 'El primer racimo de banano sale a los 9–12 meses' },
      aji:    { positivo: 'Primera cosecha en 70–90 días' },
      maiz:   { positivo: 'Cosecharás en 4–5 meses' },
      palma:  { advertencia: 'La palma produce su primer racimo a los 3–4 años' },
      sandia: { positivo: 'En 90–110 días ya tienes sandías listas' },
    },
    medio: {
      mango:  { advertencia: 'El mango demora más — piensa en años, no meses' },
      banano: { positivo: 'Primera cosecha en 9–12 meses' },
      aji:    { positivo: 'Produce continuamente desde el tercer mes' },
      maiz:   { positivo: 'Ciclo perfecto para tu tiempo disponible' },
      palma:  { advertencia: 'La palma tarda más de 3 años en producir' },
      sandia: { positivo: 'Puedes hacer 2–3 ciclos de sandía al año' },
    },
    largo: {
      mango:  { positivo: 'Inversión perfecta — el árbol produce por décadas' },
      banano: { positivo: 'Produce continuamente desde el primer año' },
      aji:    { positivo: 'Puedes mantener la planta produciendo varios años' },
      maiz:   { positivo: 'Puedes hacer múltiples ciclos productivos en ese tiempo' },
      palma:  { positivo: 'La palma produce por 25–30 años sin resembrar' },
      sandia: { positivo: 'Con paciencia puedes hacer muchos ciclos al año' },
    },
  },
  experiencia: {
    primero: {
      mango:  { advertencia: 'El mango requiere paciencia — los errores son costosos' },
      banano: { advertencia: 'El drenaje es crítico y difícil de leer para alguien nuevo' },
      aji:    { advertencia: 'El ají es algo delicado para principiantes' },
      maiz:   { positivo: 'El maíz es ideal para quien empieza: ciclo corto y fácil de leer' },
      palma:  { advertencia: 'La palma requiere manejo técnico avanzado' },
      sandia: { positivo: 'Ciclo corto: si cometes errores, aprendes y retocas rápido' },
    },
    algo: {
      mango:  { positivo: 'Con algo de experiencia puedes manejarlo bien' },
      banano: { positivo: 'Tu experiencia es suficiente para el banano' },
      aji:    { positivo: 'Con algo de práctica el ají es muy rentable' },
      maiz:   { positivo: 'Tu experiencia es más que suficiente para el maíz' },
      palma:  { advertencia: 'La palma requiere más experiencia técnica' },
      sandia: { positivo: 'Tu nivel es ideal para la sandía' },
    },
    experto: {
      mango:  { positivo: 'Tu experiencia te permitirá sacar el máximo del mango' },
      banano: { positivo: 'Con experiencia el banano es muy rentable' },
      aji:    { positivo: 'Con experiencia maximizarás la producción de ají' },
      maiz:   { positivo: 'El maíz es sencillo con tu nivel de experiencia' },
      palma:  { positivo: 'Tu experiencia es ideal para el manejo técnico de la palma' },
      sandia: { positivo: 'Dominarás fácilmente los detalles de la sandía' },
    },
  },
  objetivo: {
    consumo: {
      mango:  { positivo: 'Un árbol produce frutas para tu familia por décadas' },
      banano: { positivo: 'El banano alimenta a tu familia todo el año' },
      aji:    { positivo: 'Siempre tendrás ají fresco para cocinar' },
      maiz:   { positivo: 'El maíz es el cultivo de consumo por excelencia' },
      palma:  { advertencia: 'La palma es industrial — no sirve para consumo directo' },
      sandia: { positivo: 'Sandías frescas para tu familia en pocos meses' },
    },
    venta: {
      mango:  { positivo: 'El mango tiene buena demanda y precio en mercados locales' },
      banano: { positivo: 'Alta demanda y precio estable en el mercado' },
      aji:    { positivo: 'Buen precio y demanda constante en el mercado' },
      maiz:   { positivo: 'Mercado garantizado para el maíz' },
      palma:  { positivo: 'Alta rentabilidad industrial y precio estable' },
      sandia: { positivo: 'Buena demanda y precio en temporada' },
    },
    ambos: {
      mango:  { positivo: 'Consumes en casa y vendes el excedente fácilmente' },
      banano: { positivo: 'Con el banano comerás en casa y venderás el excedente' },
      aji:    { positivo: 'Perfecto para consumo y venta: produce continuamente' },
      maiz:   { positivo: 'Ideal para consumo familiar y venta del resto' },
      palma:  { advertencia: 'La palma es principalmente industrial, difícil para consumo' },
      sandia: { positivo: 'La sandía funciona muy bien para los dos fines' },
    },
  },
}
