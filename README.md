# 👥 Gestor de Usuarios - Demo ReqRes

Aplicación web moderna para la gestión de usuarios construida con React, TypeScript y Vite. Integra la API de [ReqRes](https://reqres.in/) con funcionalidades avanzadas de filtrado, asignación de roles y modo de desarrollo.

## ✨ Características Principales

### 🎯 Gestión de Usuarios
- **Listado de usuarios** con paginación
- **Búsqueda en tiempo real** por nombre y email
- **Filtrado por roles** (Admin, Developer, Designer)
- **Creación de nuevos usuarios**
- **Edición de usuarios existentes**
- **Eliminación de usuarios** con confirmación
- **Vista detallada** de cada usuario

### 🎨 Asignación de Roles
- **Selector de roles visual** con iconos
- Asignación desde la lista de usuarios (modo compacto)
- Asignación desde el detalle del usuario (modo completo)
- Asignación durante la creación/edición de usuarios
- **Persistencia en localStorage**
- Tooltips informativos en modo compacto

### 🔍 Sistema de Filtrado
- Búsqueda por nombre y email con debounce
- Filtrado por roles con botones interactivos
- Combinación de filtros (búsqueda + rol)
- Interfaz responsive en una sola fila

### 🌐 Internacionalización (i18n)
- **3 idiomas soportados**: Español, Inglés, Galego
- Cambio de idioma en tiempo real
- Traducciones completas en toda la aplicación
- Accesible desde la paleta de comandos

### 🎨 Temas y UI
- **Modo claro y oscuro** con persistencia
- Diseño moderno con **shadcn/ui**
- Estilizado con **Tailwind CSS**
- Animaciones suaves y transiciones
- Componentes accesibles (ARIA)
- Diseño totalmente responsive

### ⚡ Paleta de Comandos
- Acceso rápido con `Ctrl+K` / `Cmd+K`
- Navegación rápida a usuarios
- Cambio de tema
- Cambio de idioma
- Creación rápida de usuarios

### 🛠️ Modo de Desarrollo
- **Mock data** para desarrollo offline
- Indicador visual de modo dev
- Configuración mediante variable de entorno
- Servicios mock completos (CRUD)

### 🔒 Validación y Manejo de Errores
- Validación de formularios con **Zod**
- Mensajes de error personalizados
- Manejo de rate limiting
- Validación de token API
- Notificaciones toast con **Sonner**

### ♿ Accesibilidad
- Skip to content link
- Etiquetas ARIA apropiadas
- Navegación por teclado
- Contraste de colores adecuado

## 🚀 Stack Tecnológico

### Frontend Framework
- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server

### Routing y Estado
- **React Router v6** - Enrutamiento
- **TanStack Query (React Query)** - Gestión de estado del servidor
- **React Hook Form** - Gestión de formularios

### UI y Estilos
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Primitivos accesibles
- **Lucide React** - Iconos

### Validación y Utilidades
- **Zod** - Validación de esquemas
- **clsx** - Utilidad para clases CSS
- **tailwind-merge** - Merge de clases Tailwind

### Internacionalización
- **react-i18next** - Framework i18n
- **i18next** - Core i18n

### Notificaciones
- **Sonner** - Sistema de toasts

### Calidad de Código
- **ESLint** - Linter
- **Prettier** - Formateador de código
- **Husky** - Git hooks
- **lint-staged** - Linting en archivos staged

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **pnpm** (recomendado) o npm

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd demo-berto
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://reqres.in/api
VITE_API_TOKEN=tu_token_aqui
VITE_DEV_MODE=false
```

**Variables disponibles:**
- `VITE_API_URL`: URL base de la API de ReqRes
- `VITE_API_TOKEN`: Token de autenticación (**obligatorio**). Puedes obtenerlo en [https://reqres.in/#authentication](https://reqres.in/#authentication)
- `VITE_DEV_MODE`: `true` para usar datos mock, `false` para API real

> **⚠️ Importante:** El token de autenticación es **obligatorio** para operar con la aplicación. Sin él, la aplicación mostrará un mensaje de error solicitando que configures el token.

## 🎮 Comandos Disponibles

### Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm dev

# El servidor estará disponible en http://localhost:5173
```

### Build
```bash
# Crear build de producción
pnpm build

# Los archivos se generarán en la carpeta /dist
```

### Preview
```bash
# Previsualizar build de producción
pnpm preview
```

### Linting y Formateo
```bash
# Ejecutar ESLint
pnpm lint

# Formatear código con Prettier
pnpm format
```

### Testing
```bash
# Ejecutar tests (si están configurados)
pnpm test
```

## 📁 Estructura del Proyecto

```
demo-berto/
├── public/                 # Archivos estáticos
├── src/
│   ├── api/               # Servicios API
│   │   ├── endpoints.ts   # Endpoints de la API
│   │   └── services.ts    # Funciones de servicio
│   ├── assets/            # Recursos (imágenes, etc.)
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── command-palette/
│   │   ├── RoleSelector.tsx
│   │   └── ...
│   ├── hooks/            # Custom hooks
│   ├── locales/          # Archivos de traducción
│   │   ├── en.json       # Inglés
│   │   ├── es.json       # Español
│   │   └── gl.json       # Galego
│   ├── mocks/            # Datos y servicios mock
│   ├── pages/            # Páginas/Vistas
│   │   ├── UserList.tsx
│   │   ├── UserDetail.tsx
│   │   └── UserForm.tsx
│   ├── schemas/          # Esquemas de validación Zod
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Utilidades
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── .env                  # Variables de entorno
├── .husky/              # Git hooks
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Características de UI

### Roles Disponibles
- **👑 Admin** - Color rojo
- **💻 Developer** - Color azul
- **🎨 Designer** - Color morado

### Temas
- **Light** - Tema claro
- **Dark** - Tema oscuro
- **System** - Sigue la preferencia del sistema

### Idiomas
- **Español**
- **English**
- **Galego **

## 🔑 Atajos de Teclado

- `Ctrl+K` / `Cmd+K` - Abrir paleta de comandos
- `Esc` - Cerrar paleta de comandos o diálogos

## 🌐 Modo de Desarrollo

Para trabajar sin conexión o sin API:

1. Configura `VITE_DEV_MODE=true` en `.env`
2. Reinicia el servidor de desarrollo
3. La aplicación usará datos mock automáticamente
4. Verás un indicador "Dev Mode" en el header

## 📝 Notas Importantes

- Los **roles se almacenan en localStorage** del navegador
- La **paginación** está limitada por la API de ReqRes
- El **token API** es opcional para ReqRes (la API es pública)
- Los **datos mock** incluyen operaciones CRUD completas

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- [ReqRes](https://reqres.in/) - API REST de prueba
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide](https://lucide.dev/) - Iconos
