# Sistema Administrativo Web

## Descripción

Proyecto académico desarrollado con HTML5, CSS3 y JavaScript vanilla. Permite iniciar sesión y administrar clientes, productos y proveedores desde un dashboard de una sola página.

## Objetivo

Aplicar los conceptos vistos en el curso mediante una solución sencilla y funcional que utilice formularios, eventos, objetos, arreglos, condicionales, métodos de arreglos, manipulación del DOM y LocalStorage.

## Tecnologías

- HTML5
- CSS3
- JavaScript vanilla
- LocalStorage
- Git

No utiliza frameworks, librerías externas, backend ni bases de datos externas.

## Funcionalidades

- Login educativo con validación de usuario y contraseña.
- Dashboard con menú lateral y tres tarjetas de resumen.
- CRUD de clientes.
- CRUD de productos.
- CRUD de proveedores.
- Persistencia de datos en LocalStorage.
- Diseño responsive para computadora, tableta y teléfono.

CRUD significa crear, consultar, editar y eliminar registros.

## Estructura de carpetas

```text
sistema-administrativo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── docs/
│   ├── investigacion-previa.md
│   ├── planificacion.md
│   ├── prompts-utilizados.md
│   ├── flujo-git.md
│   └── pruebas-y-capturas.md
└── README.md
```

## Credenciales del login

- Usuario: `admin`
- Contraseña: `Admin123`

Estas credenciales se encuentran en `js/app.js` y se utilizan únicamente con fines educativos.

## Instrucciones para ejecutar

1. Descargar o clonar el proyecto.
2. Abrir la carpeta `sistema-administrativo` en Visual Studio Code.
3. Abrir `index.html` con la extensión Live Server.
4. Iniciar sesión con las credenciales indicadas.
5. Probar cada módulo desde el menú lateral.

No es necesario ejecutar `npm install` ni instalar dependencias.

## Cómo probar los CRUD

### Clientes

1. Abrir el módulo **Clientes**.
2. Completar nombre, correo y teléfono.
3. Presionar **Registrar cliente**.
4. Comprobar que el registro aparece en la tabla.
5. Presionar **Editar**, modificar un dato y guardar los cambios.
6. Presionar **Eliminar** y confirmar la acción.

### Productos

1. Abrir el módulo **Productos**.
2. Completar nombre, categoría, precio y cantidad.
3. Registrar el producto.
4. Verificar que el precio se muestre en colones.
5. Editar y eliminar el registro.

### Proveedores

1. Abrir el módulo **Proveedores**.
2. Completar empresa, contacto, correo y teléfono.
3. Registrar el proveedor.
4. Editar y eliminar el registro.

## Funcionamiento de LocalStorage

LocalStorage es un almacenamiento incluido en el navegador. El proyecto utiliza estas claves:

- `sistema_clientes`
- `sistema_productos`
- `sistema_proveedores`

Los arreglos se convierten a texto con `JSON.stringify()` antes de guardarse y se recuperan con `JSON.parse()`.

Para comprobar la persistencia:

1. Registrar un cliente, producto o proveedor.
2. Recargar la página.
3. Iniciar sesión nuevamente.
4. Verificar que el registro continúa visible.

## Limitaciones

- El login funciona únicamente en el navegador.
- Las credenciales se encuentran en JavaScript.
- LocalStorage puede verse o modificarse desde las herramientas del navegador.
- Los datos no se comparten entre dispositivos ni navegadores.
- El sistema no tiene backend.
- No existe una base de datos externa.
- No debe utilizarse en producción.
- Es un proyecto educativo.

## Flujo de Git

El flujo recomendado utiliza una rama `main` y ramas por funcionalidad:

- `feat-login`
- `feat-dashboard`
- `feat-clientes`
- `feat-productos`
- `feat-proveedores`
- `docs-proyecto`

Cada cambio debe integrarse mediante commits descriptivos y pull requests revisados por el equipo. La guía completa está en `docs/flujo-git.md`.

## Integrantes

- Integrante 1: ____________________
- Integrante 2: ____________________
- Integrante 3: ____________________

## Repositorio

URL del repositorio: ____________________

## Evidencias

Las capturas deben tomarse manualmente después de ejecutar y probar el sistema. La lista de evidencias requeridas se encuentra en `docs/pruebas-y-capturas.md`.
