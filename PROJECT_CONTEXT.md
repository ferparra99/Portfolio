# Project Context - Portfolio Personal

## Descripcion General

Portafolio personal desarrollado con Angular 21. Es una aplicacion web de una sola pagina (SPA) que展示了 habilidades, proyectos y informacion de contacto de un desarrollador.

## Stack Tecnologico

- **Framework:** Angular 21.2.0
- **Lenguaje:** TypeScript 5.9.2
- **Estilos:** SCSS con Angular Material (tema azure/blue)
- **UI Components:** Angular Material CDK 21.2.9
- **Animaciones:** GSAP 3.x
- **Gestor de Paquetes:** npm 11.13.0
- **Variables de Estilo:** `src/styles/_variables.scss`

## Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── about/          # Seccion sobre mi
│   │   │   ├── contact/        # Formulario de contacto
│   │   │   ├── footer/         # Pie de pagina
│   │   │   ├── hero/           # Seccion principal/heroe
│   │   │   ├── navbar/         # Navegacion principal
│   │   │   ├── projects/       # Galeria de proyectos
│   │   │   └── skills/         # Habilidades técnicas
│   │   ├── pages/
│   │   │   └── home/           # Pagina principal
│   │   ├── app.ts              # Componente raiz
│   │   ├── app.html            # Template raiz
│   │   ├── app.scss            # Estilos raiz
│   │   ├── app.routes.ts       # Configuracion de rutas
│   │   └── app.config.ts       # Configuracion global
│   ├── styles.scss             # Estilos globales
│   ├── main.ts                 # Punto de entrada
│   └── index.html              # HTML principal
├── public/
│   └── assets/                 # Recursos estaticos
├── angular.json                # Configuracion de Angular
├── package.json                # Dependencias
└── tsconfig.json               # Configuracion de TypeScript
```

## Comandos Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para produccion |
| `npm run watch` | Compila en modo observador |
| `npm run test` | Ejecuta pruebas |

## Patrones de Codigo

### Componentes Angular Modernos (Standalone)

Los componentes siguen el patron standalone de Angular 21:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [...],
  templateUrl: './component-name.html',
  styleUrl: './component-name.scss'
})
export class ComponentName {
  // Logica del componente
}
```

### Estructura de Componentes

Cada componente tiene su propia carpeta con 3 archivos:
- `nombre.ts` - Logica y metadata
- `nombre.html` - Template
- `nombre.scss` - Estilos especificos

### Signals

El proyecto utiliza Angular Signals para gestionar estado reactivo:
```typescript
protected readonly title = signal('portfolio');
```

### Rutas

Rutas configuradas en `app.routes.ts`:
- `/` - Home (unica ruta activa)
- `**` - Redirect a Home

## Configuracion de Estilos

- **Tema:** Angular Material con paleta Azure primaria y Blue terciaria
- **Tipografia:** Roboto
- **Reset CSS:** Normalizado con box-sizing border-box
- **Scroll:** Smooth behavior habilitado

## Extensiones Recomendadas

- Angular schematics configurados para generar componentes con SCSS y sin tests
- Prettier configurado para formateo de codigo

## Notas para IA

1. **GSAP instalado** - Usar `import gsap from 'gsap'` para animaciones. Los componentes que usan GSAP deben implementar `AfterViewInit` y usar `@ViewChild` para referenciar elementos del DOM.
2. **Scroll animations** - Usar `@HostListener('window:scroll')` para detectar scroll y `gsap.set()` para mover elementos.
3. **Tema oscuro** - Agregar clase `dark-theme` al body. Los estilos se definen en `styles.scss`.
4. **Variables de color** - Todos los colores están centralizados en `src/styles/_variables.scss`. Para usar en componentes: `@use '../../../styles/variables' as *;` y luego usar `$variable`.
5. **No modificar directamente `app.html`** - Esta vacio, el contenido va en los componentes page/component
2. **Cada componente es independiente** - Tienen su propia logica, template y estilos
3. **Usar imports de Angular Material** - Si se necesitan componentes de Material, importarlos en el componente
4. **SCSS** - Los estilos usan SCSS con variables y nesting
5. **Rutas futuras** - Si se agregarn mas paginas, agregarlas en `app.routes.ts`

## Estado Actual

Proyecto base con componentes estructurales creados (navbar, footer, hero, about, skills, projects, contact, home). La pagina principal esta en desarrollo.