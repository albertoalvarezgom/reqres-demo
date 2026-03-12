# Aplicación CRUD de Usuarios - React + TypeScript

Aplicación web desarrollada con React y TypeScript que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre usuarios utilizando la API REST de [reqres.in](https://reqres.in/).

## 🚀 Características

- ✅ **Listado de usuarios** con paginación
- ✅ **Visualización detallada** de información de usuario
- ✅ **Creación de nuevos usuarios**
- ✅ **Edición de usuarios existentes**
- ✅ **Eliminación de usuarios**
- ✅ **Validación de formularios**
- ✅ **Diseño responsive** (adaptado para desktop y móvil)
- ✅ **Interfaz moderna** con Tailwind CSS
- ✅ **Navegación con React Router**
- ✅ **TypeScript** para type safety

## 🛠️ Tecnologías Utilizadas

- **React 19.2** - Framework de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.3** - Build tool y dev server
- **React Router DOM 6.22** - Enrutamiento
- **Tailwind CSS 3.4** - Framework CSS para estilos
- **reqres.in API** - API REST para datos de usuarios

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm, yarn o pnpm

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd demo-berto
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

## 🚀 Ejecución

### Modo Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilación para Producción
```bash
npm run build
# o
yarn build
# o
pnpm build
```

### Vista Previa de Producción
```bash
npm run preview
# o
yarn preview
# o
pnpm preview
```

## 📁 Estructura del Proyecto

```
demo-berto/
├── src/
│   ├── api/
│   │   ├── endpoints.ts      # Definición de endpoints de la API
│   │   └── services.ts       # Servicios para llamadas a la API
│   ├── components/
│   │   ├── UserList.tsx      # Componente de listado de usuarios
│   │   ├── UserDetail.tsx    # Componente de detalle de usuario
│   │   └── UserForm.tsx      # Componente de formulario (crear/editar)
│   ├── types/
│   │   └── user.ts           # Interfaces TypeScript para usuarios
│   ├── utils/
│   │   └── constants.ts      # Constantes de configuración
│   ├── App.tsx               # Componente principal con rutas
│   ├── App.css               # Estilos globales
│   ├── index.css             # Estilos base con Tailwind
│   └── main.tsx              # Punto de entrada
├── .env                      # Variables de entorno
├── tailwind.config.js        # Configuración de Tailwind CSS
├── postcss.config.js         # Configuración de PostCSS
└── package.json              # Dependencias y scripts
```

## 🎯 Funcionalidades Implementadas

### 1. Listado de Usuarios
- Muestra tarjetas con avatar, nombre y email
- Paginación funcional (navegación entre páginas)
- Botón para crear nuevo usuario
- Click en tarjeta para ver detalles

### 2. Detalle de Usuario
- Muestra toda la información del usuario
- Botón para editar usuario
- Botón para eliminar usuario
- Confirmación antes de eliminar

### 3. Crear/Editar Usuario
- Formulario con validaciones:
  - Nombre (mínimo 2 caracteres)
  - Apellido (mínimo 2 caracteres)
  - Email (formato válido)
- Mensajes de error en tiempo real
- Feedback visual de validación

## 🎨 Diseño

La aplicación cuenta con:
- **Diseño responsive** que se adapta a diferentes tamaños de pantalla
- **Gradientes modernos** y efectos visuales
- **Animaciones suaves** en hover y transiciones
- **Tarjetas con sombras** y efectos de elevación
- **Paleta de colores** profesional (azul, púrpura, gris)
- **Componentes reutilizables** con Tailwind CSS

## 🔌 API Utilizada

La aplicación consume la API pública de [reqres.in](https://reqres.in/):

- `GET /api/users?page={page}` - Listar usuarios con paginación
- `GET /api/users/{id}` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/{id}` - Actualizar usuario
- `DELETE /api/users/{id}` - Eliminar usuario

## 📝 Notas Adicionales

- La API de reqres.in es una API de prueba que simula operaciones CRUD
- Las operaciones de creación, actualización y eliminación retornan respuestas exitosas pero no persisten los datos
- Los usuarios creados no aparecerán en el listado (limitación de la API de prueba)
- La aplicación incluye manejo de errores y estados de carga

## 👨‍💻 Desarrollo

El proyecto utiliza:
- **ESLint** para linting
- **TypeScript** para type checking
- **Vite** para hot module replacement (HMR)
- **SWC** para compilación rápida de React

## 📄 Licencia

Este proyecto fue desarrollado como prueba técnica.
