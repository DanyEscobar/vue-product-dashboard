# Lumina Store - E-Commerce Dashboard

Un moderno y responsivo dashboard de productos para e-commerce construido con **Vue 3**, **TypeScript**, y **Vite**.

🚀 **Demo en vivo:** [https://vue-product-dashboard.netlify.app/](https://vue-product-dashboard.netlify.app/)

## Características

- 🛍️ **Listado de Productos**: Mosaico responsivo para visualizar productos.
- 🔍 **Búsqueda Avanzada**: Barra de búsqueda en tiempo real.
- 🏷️ **Filtro por Categorías**: Organización de productos mediante categorías.
- 📄 **Paginación Inteligente**: Navegación fluida entre diferentes páginas.
- ℹ️ **Vista Detallada**: Página dedicada con galería de imágenes, descripción completa y manejo de stock.
- ✨ **Diseño Glassmorphism**: Interfaz UI moderna con elementos translúcidos y un exclusivo **Modo Oscuro Premium (Dark Mode)** con malla animada.

## API Utilizada

Esta aplicación utiliza la API pública [DummyJSON](https://dummyjson.com/) para proveer los datos (productos, búsqueda, categorías, paginación).

## Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm o yarn

## Instalación y Ejecución Local

Sigue estos pasos para iniciar el proyecto en tu máquina local:

1. **Clona el repositorio** o navega a la carpeta del proyecto:
   ```bash
   cd vue-product-dashboard
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abre tu navegador** y visita la URL proporcionada en la terminal (por defecto, normalmente es `http://localhost:5173/`).

## Despliegue en Producción (Deploy) 🚀

La aplicación está completamente lista para ser desplegada en plataformas en la nube como **Netlify** o **Vercel**. 
Al ser una *Single Page Application* (SPA) basada en Vue Router, se ha incluido en la raíz pública el archivo de configuración `public/_redirects` (con la regla `/* /index.html 200`) para garantizar que la navegación directa por URL y los refrescos de página funcionen a la perfección sin arrojar errores `404 Not Found`.

## Tecnologías Principales

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router** para navegación
- **TypeScript** para un código seguro y tipado
- **Vite** para una carga y empaquetado ultra veloces
- **Vanilla CSS** con sistema de variables personalizadas (sin librerías pesadas)

## Decisiones de Arquitectura 🏗️

Para demostrar madurez técnica y un patrón escalable que se acerca a implementaciones empresariales reales, el proyecto aplica las siguientes decisiones de diseño:

### 1. Separación de Lógica y Vista (Composables)
Se optó por extraer el estado reactivo, la paginación y la interacción con la API de `HomeView.vue` a un composable independiente (`src/composables/useProducts.ts`). Esto obedece a buenas prácticas de diseño de software (Single Responsibility Principle) en **Vue 3**, permitiendo:
- Componentes de UI más limpios y declarativos.
- Gran facilidad para el testing unitario de la lógica de negocio subyacente.
- Reutilización de la lógica en otras vistas si es necesario.

### 2. Contratos y Disciplina de Tipado (TypeScript)
Todo el ecosistema de datos está modelado a través de interfaces TypeScript estrictas en el directorio `src/types/`. 
- Se definen entidades como `Product`, `Category` y el objeto conector de paginación de la API (`ProductsResponse`).
- La persistencia en la tipificación garantiza predictibilidad, previniendo excepciones en tiempo de ejecución ("undefined is not an object").

### 3. Paginación Real vs. Simulación
El consumo de la API ([DummyJSON](https://dummyjson.com/)) respeta el esquema de persistencia mediante consultas por lotes. En lugar de descargar todo el set de productos y paginarlos en memoria (lo cual no escala), la interfaz emplea interactividad real enviando parámetros `limit` y `skip` por servidor en las peticiones GET, reduciendo carga de red y optimizando rendimiento.

### 4. Renderizado Perceptivo (Skeleton Loaders)
Para mejorar sustancialmente la métrica de *Perceived Performance* (rendimiento percibido) y evitar saltos abruptos de contenido de la página vacía, la interfaz principal adopta un renderizado de **Skeleton Loaders** (`ProductSkeleton.vue`). Este proyecta un mapa topográfico de sombra con animaciones mientras los componentes asíncronos esperan su resolución.

### 5. Interfaz Premium Orgánica (Custom Glassmorphism)
Desarrollada **sin uso de frameworks o librerías CSS externas**.  
- En su núcleo opera con un modo oscuro y fondos dinámicos (*Rotating Mesh Gradient*).
- Las tarjetas operan con un acabado de cristal real (`backdrop-filter: blur`), que escala visualmente (`transform`) de la mano de transiciones muy suaves que proveen una experiencia de e-commerce moderna, premium y de gama altísima.

### 6. Sistema Híbrido de Filtrado 
Superando el límite propio de las APIs REST simplificadas, donde no es posible combinar `endpoints` de búsqueda abierta con los de categoría específica de forma nativa:
- El `useProducts.ts` ejecuta de forma implícita un *algoritmo dual*: Cuando el usuario cruza ambos tipos de filtros asincrónicamente por primera vez, rescata el inventario entero de la categoría desde la API y realiza una intersección algorítmica y paginación en local. Así el usuario jamás experimenta "bloqueos" al intentar acotar búsquedas.

### 7. Búsqueda Estricta por Título
Por defecto, la API de pruebas realizaba búsquedas ambiguas rastreando el término en la *descripción* general de los productos, causando retornos de "falsos positivos" (ej. buscar "Mascara" y obtener "Comida" porque un ingrediente era enmascarado).
Para resolver esto y elevar la UX, se interceptó el servicio de búsqueda global: ahora extrae un bloque masivo de coincidencias ambiguas por red, y aplica de inmediato un colador interno estricto (`filter` a nivel de Frontend) para limpiar y reconstruir la cuadrícula garantizando que **solo se liste lo que estrictamente coincide con el nombre real del producto**.

