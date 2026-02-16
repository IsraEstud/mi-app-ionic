# Ionic Application

Proyecto de práctica para la carrera de Desarrollo de Software.

## Descripción

Aplicación móvil desarrollada con Ionic y Vue.js que implementa autenticación de usuarios mediante API REST con JWT (JSON Web Tokens).

## Funcionalidades

- **Login**: Autenticación de usuarios existentes con email y contraseña
- **Register**: Registro de nuevos usuarios
- **Logout**: Cierre de sesión seguro
- **Protección de rutas**: Acceso solo a usuarios autenticados
- **Gestión de estado de autenticación**: Persistencia de sesión

## Tech Stack

- **Frontend**: Ionic 8 + Vue 3
- **Language**: TypeScript
- **Routing**: Vue Router + Ionic Vue Router
- **State**: Vue Reactivity (Composition API)
- **Testing**: Cypress (E2E) + Vitest (Unit)
- **Build**: Vite
- **Auth**: Custom API con JWT

## Requisitos Previos

- Node.js 18+
- npm 9+
- Ionic CLI (`npm install -g @ionic/cli`)

## Instalación

```bash
# Instalar dependencias
npm install
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Estructura del Proyecto

```
src/
├── api/                # Axios instances y configuración de interceptores
├── assets/             # Imágenes, fuentes, iconos
├── components/         # Componentes UI atómicos (Botones, Inputs)
│   ├── common/         # Componentes globales
│   └── layout/         # Header, Footer, SideMenu (Específicos de layout)
├── composables/        # Lógica reutilizable (useAuth, useToast, etc.)
├── constants/          # Enums, IDs de Kinde, configuraciones fijas
├── guards/             # Route guards para proteger vistas (AuthGuard)
├── layouts/            # Wrappers de página (MainLayout.vue, AuthLayout.vue)
├── router/             # Definición de rutas y navegación
├── services/           # Lógica de negocio y llamadas a Kinde/API
├── stores/             # Estado global (Pinia)
├── theme/              # Variables de Ionic y Tailwind/HeroUI
├── types/              # Interfaces y tipos de TypeScript
├── utils/              # Funciones de ayuda (formateo de fechas, etc.)
└── views/              # Páginas de Ionic (Home, Login, Profile)
    ├── auth/           # Login, Register
    └── dashboard/      # Vistas protegidas
```

## Autenticación

La app se conecta a una API personalizada que debe proporcionar los siguientes endpoints:

| Método | Endpoint             | Descripción             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Registrar nuevo usuario |
| POST   | `/api/auth/login`    | Iniciar sesión          |
| POST   | `/api/auth/logout`   | Cerrar sesión           |
| GET    | `/api/auth/me`       | Obtener usuario actual  |

### Flujo de Autenticación

1. Usuario se registra en `/register`
2. Usuario inicia sesión en `/login`
3. API retorna JWT token
4. Token se almacena y se incluye en requests subsiguientes
5. Rutas protegidas verifican token válido

## API Esperada

La aplicación espera un backend con la siguiente estructura de respuestas:

```json
// POST /api/auth/login
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "Usuario"
  }
}
```

## Testing

```bash
# Tests E2E
npm run test:e2e

# Tests Unitarios
npm run test:unit
```

## Linting

```bash
npm run lint
```
