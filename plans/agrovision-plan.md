# Implementation Plan: AgroVision — Frontend

**Date**: 2026-05-16
**Spec**: views (features)/agrovision-ux.md

## Summary

App web de guía visual de cultivos agrícolas. Frontend puro con React + Vite + Tailwind CSS. Los datos viven en un archivo JSON local. La navegación principal es un sidebar acordeón persistente donde cada cultivo se puede expandir para ver sus secciones, y el área principal muestra el contenido del cultivo o sección seleccionada.

## Technical Context

**Language/Version**: JavaScript (React 18)
**Primary Dependencies**: React, Vite, Tailwind CSS, React Router DOM
**Storage**: JSON local (src/data/cultivos.json)
**Testing**: Manual en navegador
**Target Platform**: Web (desktop + mobile responsive)
**Project Type**: Frontend SPA
**Constraints**: Sin backend, sin autenticación, sin APIs externas. Todo el contenido viene del JSON.

## Project Structure

```text
agrovision/
  public/
  src/
    data/
      cultivos.json
    components/
      Sidebar.jsx
      CultivoCard.jsx
      DatosPendientes.jsx
      TemperaturaCard.jsx
      FenologiaTimeline.jsx
    pages/
      Home.jsx
      DetalleCultivo.jsx
    App.jsx
    main.jsx
  vercel.json
  vite.config.js
  package.json
  .gitignore
  README.md
```

---

## Phase 1 — Setup

**Propósito**: Dejar el proyecto corriendo con la estructura base.

- [ ] T001 Inicializar proyecto con Vite + React
- [ ] T002 Instalar y configurar Tailwind CSS
- [ ] T003 Instalar React Router DOM
- [ ] T004 Configurar fuentes Nunito y Nunito Sans en index.html
- [ ] T005 Aplicar colores de la paleta Agro Moderno en tailwind.config.js
- [ ] T006 Crear el archivo cultivos.json con los 6 cultivos y placeholders
- [ ] T007 Crear vercel.json y .gitignore

---

## Phase 2 — Layout base (bloqueante)

**Propósito**: El shell visual que necesitan todas las demás vistas.

- [ ] T008 Crear el layout principal: header fijo + sidebar izquierdo + área de contenido
- [ ] T009 Implementar el Sidebar con la lista de cultivos colapsados
- [ ] T010 Implementar el acordeón del sidebar: flecha expande sub-ítems, nombre carga contenido
- [ ] T011 Lógica para que solo un cultivo esté expandido a la vez
- [ ] T012 Conectar React Router para las rutas / y /cultivo/:id y /cultivo/:id/:seccion

**Checkpoint**: El sidebar funciona. Se puede expandir/colapsar cultivos. La navegación no rompe.

---

## Phase 3 — US1 y US2 — Catálogo y vista completa del cultivo

**Goal**: El usuario puede explorar el catálogo y ver el contenido completo de un cultivo.

- [ ] T013 Crear página Home.jsx con las 6 tarjetas en grid
- [ ] T014 Crear componente CultivoCard.jsx (emoji, nombre, botón)
- [ ] T015 Crear página DetalleCultivo.jsx que muestra las 4 secciones apiladas
- [ ] T016 Crear componente DatosPendientes.jsx para campos null o placeholder
- [ ] T017 Mostrar sección Suelo con sus campos
- [ ] T018 Mostrar sección Clima con tarjetas de temperatura (TemperaturaCard.jsx)
- [ ] T019 Mostrar sección Nutrición
- [ ] T020 Mostrar sección Fenología como timeline vertical (FenologiaTimeline.jsx)

**Checkpoint**: Se puede navegar a cualquier cultivo y ver toda su información. Los campos pendientes muestran el badge correcto.

---

## Phase 4 — US3 y US4 — Navegación por sección y cambio de cultivo

**Goal**: El usuario puede ir directo a una sección y cambiar de cultivo fluidamente.

- [ ] T021 Clic en sub-ítem del sidebar navega a la sección correspondiente
- [ ] T022 El área principal muestra solo la sección si viene de un sub-ítem
- [ ] T023 Al cambiar de cultivo: colapsar anterior, expandir nuevo, actualizar contenido
- [ ] T024 El sidebar refleja siempre el estado activo (cultivo y sección resaltados)

**Checkpoint**: Navegación completa funciona. El sidebar siempre orienta al usuario.

---

## Phase 5 — Responsive y pulido visual

**Propósito**: Que se vea bien y funcione en móvil.

- [ ] T025 Sidebar colapsable en móvil (botón hamburger)
- [ ] T026 Revisar paleta de colores y tipografía en todos los componentes
- [ ] T027 Verificar que nunca aparece null, undefined o campo vacío
- [ ] T028 Ajustar espaciados, bordes y badges "Datos pendientes"
- [ ] T029 Probar build de producción (npm run build)

---

## Dependencies & Execution Order

- **Phase 1**: Sin dependencias. Arrancar aquí.
- **Phase 2**: Depende de Phase 1. Bloquea todo lo demás — no hay app sin layout.
- **Phase 3**: Depende de Phase 2. Es el valor central de la app.
- **Phase 4**: Depende de Phase 2 y 3. Mejora la navegación.
- **Phase 5**: Depende de todas las anteriores. Se hace al final.

## Notes

- El JSON es la única fuente de verdad. Cualquier cambio de contenido es solo editar el JSON.
- Los placeholders "[Aquí iría...]" y los valores null se tratan igual: badge "Datos pendientes".
- No agregar features fuera de las US definidas en el spec hasta terminar estas fases.
