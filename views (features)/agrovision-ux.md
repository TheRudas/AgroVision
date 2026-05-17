# Feature Specification: AgroVision — Navegación y Vistas

**Created**: 2026-05-16
**Actualizado**: 2026-05-17

## User Scenarios & Testing

### User Story 1 — Explorar el catálogo de cultivos (Priority: P1)

El usuario entra a la app por primera vez. El sidebar está expandido y muestra los 6 cultivos. El área principal muestra una pantalla de bienvenida con una tarjeta por cultivo. Puede entrar a cualquier cultivo desde la tarjeta o desde el sidebar.

**Why this priority**: Es la puerta de entrada. Sin esto, no hay app.

**Independent Test**: Abrir la app, ver las 6 tarjetas, hacer clic en una y llegar al detalle del cultivo.

**Acceptance Scenarios**:

1. **Scenario**: Entrada por primera vez
   - **Given** el usuario abre la app
   - **When** no ha seleccionado ningún cultivo
   - **Then** ve la pantalla de bienvenida con las 6 tarjetas y el sidebar expandido con los nombres de los cultivos

2. **Scenario**: Entrar a un cultivo desde la tarjeta
   - **Given** el usuario está en la pantalla de bienvenida
   - **When** hace clic en una tarjeta de cultivo
   - **Then** el área principal muestra el detalle del cultivo y el sidebar se colapsa al modo iconos

---

### User Story 2 — Consultar la información de un cultivo (Priority: P1)

El usuario selecciona un cultivo y ve su información organizada en 4 secciones desplegables: Suelo, Clima, Nutrición y Fenología. Cada sección puede abrirse o cerrarse individualmente con un clic en su título.

**Why this priority**: Es el propósito central de la app.

**Independent Test**: Seleccionar Mango → ver las 4 secciones abiertas → cerrar "Clima" → la sección desaparece y las demás permanecen intactas.

**Acceptance Scenarios**:

1. **Scenario**: Ver cultivo completo
   - **Given** el usuario selecciona un cultivo
   - **When** el área principal carga
   - **Then** muestra el nombre, descripción y las 4 secciones abiertas por defecto

2. **Scenario**: Colapsar una sección
   - **Given** el usuario está viendo el detalle de un cultivo
   - **When** hace clic en el título de una sección (ej. "Clima")
   - **Then** el contenido de esa sección se oculta; el resto permanece visible

3. **Scenario**: Campos sin datos
   - **Given** un campo del cultivo aún no tiene dato real
   - **When** el usuario ve esa sección
   - **Then** aparece un badge "Datos pendientes" en lugar de un valor vacío o nulo

---

### User Story 3 — Navegar entre cultivos desde el sidebar (Priority: P1)

Cuando hay un cultivo seleccionado, el sidebar se colapsa a una versión compacta que muestra solo los emojis de los cultivos. El usuario puede cambiar de cultivo desde ahí. Al pasar el mouse sobre el sidebar, este se expande temporalmente mostrando los nombres.

**Why this priority**: Es la navegación principal entre cultivos una vez que el usuario está dentro de la app.

**Independent Test**: Seleccionar Mango → sidebar se colapsa a iconos → pasar mouse por sidebar → se expande con nombres → clic en Banano → el contenido cambia.

**Acceptance Scenarios**:

1. **Scenario**: Sidebar se colapsa al seleccionar un cultivo
   - **Given** el usuario selecciona cualquier cultivo
   - **When** el detalle carga en el área principal
   - **Then** el sidebar se colapsa mostrando solo los emojis de los 6 cultivos

2. **Scenario**: Hover expande el sidebar temporalmente
   - **Given** el sidebar está en modo icono
   - **When** el usuario pasa el mouse sobre él
   - **Then** el sidebar se expande suavemente mostrando los nombres; al retirar el mouse vuelve a iconos

3. **Scenario**: Cambiar de cultivo
   - **Given** el sidebar está en modo icono (o expandido por hover)
   - **When** el usuario hace clic en otro cultivo
   - **Then** el área principal cambia al nuevo cultivo; el emoji del cultivo activo tiene un indicador visual

4. **Scenario**: Deseleccionar un cultivo
   - **Given** hay un cultivo seleccionado y el sidebar está en modo icono
   - **When** el usuario hace clic en el emoji del cultivo activo
   - **Then** vuelve a la pantalla de bienvenida y el sidebar se expande de nuevo

---

### User Story 4 — Identificar datos faltantes (Priority: P2)

El equipo de investigación puede identificar visualmente qué campos todavía no tienen datos reales. Los campos pendientes muestran un badge con borde punteado que diferencia claramente el contenido confirmado del contenido por confirmar.

**Why this priority**: La app se construye con datos parciales. Distinguir pendientes de reales es crítico para el equipo.

**Independent Test**: Abrir cualquier cultivo con campos vacíos → ver el badge "Datos pendientes" en los campos correspondientes → no ver ningún campo vacío ni el texto "null".

**Acceptance Scenarios**:

1. **Scenario**: Campo sin dato
   - **Given** un campo tiene valor `null` o texto placeholder (`[Aquí iría...]`)
   - **When** el usuario ve esa sección
   - **Then** aparece el badge "Datos pendientes" con borde punteado

2. **Scenario**: Campo con dato real
   - **Given** un campo tiene un valor real en el JSON
   - **When** el usuario ve esa sección
   - **Then** se muestra el valor directamente, sin badge

---

### Edge Cases

- Si todos los campos de un cultivo son pendientes, el cultivo se muestra igual con todos los badges — no se oculta.
- Si el usuario cierra todas las secciones, la pantalla queda solo con el encabezado del cultivo y los títulos de las secciones cerradas.
- En móvil, el sidebar se abre con un botón hamburger y se cierra al seleccionar un cultivo o tocar fuera.

---

## Requirements

### Functional Requirements

- **FR-001**: El sidebar siempre está presente en pantalla — nunca desaparece completamente.
- **FR-002**: Cuando no hay cultivo seleccionado, el sidebar está expandido mostrando nombre y emoji de cada cultivo.
- **FR-003**: Cuando hay un cultivo seleccionado, el sidebar se colapsa a modo icono (solo emojis).
- **FR-004**: En modo icono, pasar el mouse sobre el sidebar lo expande temporalmente con los nombres.
- **FR-005**: El cultivo activo tiene un indicador visual en el sidebar (línea o resaltado) en modo icono.
- **FR-006**: Clic en el cultivo activo en el sidebar → deselecciona y vuelve al home.
- **FR-007**: Clic en otro cultivo en el sidebar → cambia el contenido al nuevo cultivo.
- **FR-008**: El detalle de un cultivo muestra: descripción general + 4 secciones colapsables (Suelo, Clima, Nutrición, Fenología).
- **FR-009**: Cada sección se abre o cierra con clic en su título. Por defecto todas abiertas.
- **FR-010**: Ningún campo muestra `null`, vacío o texto técnico — siempre el badge "Datos pendientes".
- **FR-011**: El contenido del JSON es la única fuente de datos. Editar el JSON actualiza la app sin tocar código.
- **FR-012**: En móvil, el sidebar se controla con un botón hamburger y un overlay de cierre.

### Entidades principales

- **Cultivo**: Identificador, nombre, emoji, descripción, imagen (opcional) y 4 secciones de datos.
- **Sección**: Suelo (humedad, textura, profundidad, pH), Clima (temperatura, horas luz, humedad ambiental), Nutrición (requerimientos, fertilizantes), Fenología (lista de etapas con nombre, duración y descripción).
- **Campo**: Tiene un valor real (texto, número) o está pendiente (null / placeholder).
- **Etapa fenológica**: Parte de la sección Fenología — nombre, duración y descripción, mostrados como timeline.

---

## Success Criteria

- **SC-001**: El usuario puede llegar al detalle de cualquier cultivo en 1 clic desde el home.
- **SC-002**: El usuario puede cerrar y abrir cualquier sección sin perder el contexto de las otras.
- **SC-003**: Nunca aparece `null`, `undefined` ni texto vacío en pantalla en ninguna condición.
- **SC-004**: Editar solo el JSON actualiza todo el contenido sin modificar ningún archivo de código.
- **SC-005**: El sidebar siempre indica visualmente en qué cultivo está el usuario.
