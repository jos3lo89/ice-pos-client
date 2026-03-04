# ICE POS — Cliente Web

Sistema de punto de venta (POS) para restaurantes. Interfaz en español con tres roles de usuario.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **TanStack Query** — data fetching y caché
- **Zustand** — estado global (auth, carrito)
- **Tailwind CSS 4** — tema oscuro con acentos cyan
- **Shadcn/Radix UI** — componentes primitivos
- **Axios** — cliente HTTP (`withCredentials: true`)
- **Zod** — validación de formularios
- **Sonner** — notificaciones toast

## Roles

| Rol | Acceso |
|---|---|
| `admin` | Empleados, categorías, productos, pisos, mesas |
| `mesero` | Pisos, mesas, gestión de órdenes |
| `cajero` | Sesiones de caja, POS, pagos, cobros |

## Arquitectura

Clean Architecture en 4 capas:

```
core/entities → core/repositories → infrastructure/api → application/hooks → presentation/features
```

## Configuración

```bash
cp .env.example .env
# Editar VITE_API_BASE_URL con la URL del backend
```

## Comandos

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build de producción (tsc + vite)
pnpm lint       # ESLint
pnpm preview    # Vista previa del build
```
