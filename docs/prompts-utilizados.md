# Prompts utilizados durante el desarrollo

Este documento contiene ejemplos editables. El equipo debe adaptar cada entrada para que refleje los prompts que realmente utilizó, los cambios que realizó y lo que aprendió.

## 1. Planificación del alcance

### Objetivo

Definir qué funciones debe incluir el proyecto y cuáles deben quedar fuera.

### Prompt inicial

> Ayúdame a planificar un sistema administrativo web con login, dashboard y módulos de clientes, productos y proveedores usando HTML, CSS, JavaScript y LocalStorage.

### Posible problema de la respuesta

La IA podría proponer backend, roles, reportes o funciones no solicitadas.

### Prompt de mejora

> Limita la planificación a login, dashboard, CRUD de clientes, productos y proveedores, LocalStorage y Git. No agregues backend, APIs, roles, reportes ni frameworks.

### Adaptación realizada por el equipo

Revisar la propuesta y eliminar cualquier actividad que esté fuera del enunciado oficial.

### Aprendizaje obtenido

Un prompt mejora cuando define claramente el alcance y las restricciones.

---

## 2. Estructura HTML

### Objetivo

Crear una estructura semántica para el login y el dashboard.

### Prompt inicial

> Genera el HTML de un sistema administrativo con formularios y tablas.

### Posible problema de la respuesta

La estructura podría incluir varias páginas, campos adicionales o elementos innecesarios.

### Prompt de mejora

> Genera un único index.html semántico con login, menú lateral, encabezado, tarjetas y secciones de clientes, productos y proveedores. Usa un solo h1 y no agregues campos distintos a los requeridos.

### Adaptación realizada por el equipo

Comprobar que los `id`, `name`, `label` y atributos `required` coincidan con la lógica de JavaScript.

### Aprendizaje obtenido

Es importante especificar la estructura y los campos antes de solicitar el código.

---

## 3. Diseño CSS

### Objetivo

Crear una interfaz profesional, limpia y responsive.

### Prompt inicial

> Diseña el CSS de un dashboard moderno.

### Posible problema de la respuesta

La IA podría usar librerías, fuentes externas o animaciones complejas.

### Prompt de mejora

> Crea CSS3 sin librerías ni fuentes externas. Diseña login centrado, menú lateral, tarjetas, formularios y tablas. En móviles, adapta el menú, coloca las tarjetas en una columna y permite desplazamiento horizontal únicamente dentro de las tablas.

### Adaptación realizada por el equipo

Revisar contrastes, tamaños, espaciados y estados de foco para mantener legibilidad.

### Aprendizaje obtenido

Las condiciones de responsive y accesibilidad deben describirse desde el prompt.

---

## 4. Validación del login

### Objetivo

Validar usuario y contraseña sin recargar la página.

### Prompt inicial

> Crea un login con JavaScript.

### Posible problema de la respuesta

La respuesta podría incluir backend, sesiones reales, registro o recuperación de contraseña.

### Prompt de mejora

> Implementa un login educativo en JavaScript vanilla usando un objeto con usuario admin y contraseña Admin123. Valida campos vacíos y credenciales incorrectas, muestra mensajes en el DOM y no uses alert, backend, registro ni recuperación de contraseña.

### Adaptación realizada por el equipo

Verificar que el dashboard esté oculto al inicio y que solo aparezca con credenciales correctas.

### Aprendizaje obtenido

La autenticación del navegador sirve para practicar lógica, pero no debe confundirse con una solución segura de producción.

---

## 5. CRUD de clientes

### Objetivo

Registrar, consultar, editar y eliminar clientes.

### Prompt inicial

> Crea un CRUD de clientes.

### Posible problema de la respuesta

La IA podría agregar dirección, identificación, búsqueda o paginación.

### Prompt de mejora

> Crea únicamente la lógica del CRUD de clientes con ID, nombre completo, correo y teléfono. Usa un arreglo, eventos del DOM, validaciones, edición del registro seleccionado, confirmación antes de eliminar y LocalStorage.

### Adaptación realizada por el equipo

Ajustar los selectores para que coincidan con los elementos reales del HTML y comprobar la actualización de la tarjeta del dashboard.

### Aprendizaje obtenido

Un CRUD necesita sincronizar el arreglo, LocalStorage, la tabla y los contadores.

---

## 6. CRUD de productos

### Objetivo

Administrar productos con precio y cantidad.

### Prompt inicial

> Programa un formulario para productos.

### Posible problema de la respuesta

Podría agregar impuestos, descuentos, inventario avanzado o categorías automáticas.

### Prompt de mejora

> Implementa un CRUD de productos con ID, nombre, categoría, precio y cantidad disponible. Valida precio mayor que cero y cantidad entera mayor o igual que cero. Muestra el precio con el símbolo ₡. No agregues impuestos ni cálculos adicionales.

### Adaptación realizada por el equipo

Comprobar la conversión de valores de los inputs a números antes de almacenarlos.

### Aprendizaje obtenido

Los valores de los formularios llegan como texto y deben convertirse cuando representan números.

---

## 7. CRUD de proveedores

### Objetivo

Administrar los datos básicos de proveedores.

### Prompt inicial

> Haz el módulo de proveedores.

### Posible problema de la respuesta

La respuesta podría incluir productos suministrados, cuentas bancarias o direcciones.

### Prompt de mejora

> Implementa únicamente un CRUD de proveedores con ID, nombre de empresa, nombre de contacto, correo y teléfono. Valida los campos, guarda en LocalStorage y permite editar y eliminar.

### Adaptación realizada por el equipo

Revisar la validación del correo y los textos de confirmación para que sean comprensibles.

### Aprendizaje obtenido

Limitar los campos reduce complejidad y mantiene el proyecto dentro del alcance.

---

## 8. LocalStorage

### Objetivo

Conservar la información después de recargar la página.

### Prompt inicial

> Guarda los datos del sistema en el navegador.

### Posible problema de la respuesta

La respuesta podría guardar credenciales, estado de sesión o información adicional.

### Prompt de mejora

> Usa LocalStorage únicamente para clientes, productos y proveedores con las claves sistema_clientes, sistema_productos y sistema_proveedores. Usa JSON.stringify al guardar, JSON.parse al recuperar y maneja errores si el contenido no es válido.

### Adaptación realizada por el equipo

Comprobar que cada operación CRUD actualice primero el arreglo y después LocalStorage.

### Aprendizaje obtenido

LocalStorage guarda texto, por lo que los objetos y arreglos deben transformarse a JSON.

---

## 9. Revisión de errores

### Objetivo

Encontrar inconsistencias entre HTML, CSS y JavaScript.

### Prompt inicial

> Revisa mi proyecto y corrige los errores.

### Posible problema de la respuesta

La IA podría reescribir todo el proyecto o agregar nuevas funciones.

### Prompt de mejora

> Revisa únicamente errores de selectores, sintaxis, eventos, validaciones y LocalStorage. No cambies el alcance ni agregues funciones. Explica cada error antes de proponer la corrección mínima necesaria.

### Adaptación realizada por el equipo

Aplicar cada corrección por separado, ejecutar nuevamente el proyecto y verificar la consola.

### Aprendizaje obtenido

Dar contexto y pedir cambios mínimos facilita comprender la solución.

---

## 10. README

### Objetivo

Documentar la instalación, uso y limitaciones del proyecto.

### Prompt inicial

> Escribe un README para mi sistema.

### Posible problema de la respuesta

La IA podría inventar integrantes, enlaces o dependencias.

### Prompt de mejora

> Genera un README para un proyecto educativo de HTML, CSS, JavaScript y LocalStorage. Incluye credenciales, estructura, ejecución con Live Server, pruebas de CRUD, limitaciones y espacios vacíos para integrantes y repositorio. No inventes nombres, URLs ni comandos de npm.

### Adaptación realizada por el equipo

Completar únicamente los datos reales del equipo y del repositorio.

### Aprendizaje obtenido

La documentación debe describir lo que realmente funciona y no afirmar evidencias inexistentes.

---

## Prompts importantes — Kevin Ortiz

En esta sección se documentan los prompts clave que utilicé para las funciones adicionales del proyecto: cambio de tema, avatar con menú desplegable y "remember me" en el inicio de sesión administrativo.

### 11. Cambio de tema

### Objetivo

Implementar un selector de tema que permita alternar entre un modo claro y un modo oscuro en el dashboard.

### Prompt inicial

> Añade un cambio de tema claro/oscuro en el sistema administrativo usando CSS y JavaScript.

### Posible problema de la respuesta

La IA podría proponer librerías externas, soluciones con demasiados estilos o un almacenamiento de tema inexistente.

### Prompt de mejora

> Implementa un cambio de tema claro/oscuro con CSS personalizado y JavaScript vanilla. Guarda la preferencia en LocalStorage para que el tema se conserve al recargar la página, sin usar librerías externas.

### Adaptación realizada por el equipo

Verifiqué que el tema se aplicara al cargar la página y que el estado guardado en LocalStorage se recuperara correctamente.

### Aprendizaje obtenido

Guardar la preferencia del usuario en LocalStorage mejora la experiencia; este prompt fue importante porque añadió personalización persistente al dashboard.

---

### 12. Avatar + dropdown menu

### Objetivo

Mostrar el avatar del usuario con un menú desplegable para acceder a opciones administrativas.

### Prompt inicial

> Agrega un avatar con un dropdown menu en la cabecera del dashboard.

### Posible problema de la respuesta

La respuesta podría incluir componentes externos, HTML complejo o acciones que no existieran en el proyecto.

### Prompt de mejora

> Crea un avatar en la cabecera con un menú desplegable simple en JavaScript vanilla. Incluye opciones como perfil, configuración y cerrar sesión, y asegúrate de que el menú se abra y cierre correctamente.

### Adaptación realizada por el equipo

Confirmé que el desplegable se mostrara y ocultara al hacer clic, y que el avatar mantuviera la consistencia visual del diseño.

### Aprendizaje obtenido

Un menú desplegable bien integrado mejora la navegación del usuario; este prompt fue clave para darle al dashboard una experiencia más profesional.

---

### 13. Remember me en el inicio de sesión administrativo

### Objetivo

Agregar una función "remember me" que recuerde el usuario en el formulario de login administrativo.

### Prompt inicial

> Implementa un checkbox "remember me" en el login que conserve el usuario.

### Posible problema de la respuesta

La IA podría implementar almacenamiento inseguro de contraseñas, usar cookies innecesarias o extender la funcionalidad más allá del alcance.

### Prompt de mejora

> Agrega un checkbox "remember me" en el login administrativo y guarda solo el usuario en LocalStorage. Al volver a cargar la página, el campo de usuario debe recuperarse, pero no la contraseña.

### Adaptación realizada por el equipo

Verifiqué que el usuario se guardara correctamente y que el campo se rellenara automáticamente en la siguiente visita sin recuperar la contraseña.

### Aprendizaje obtenido

Recordar sólo el usuario protege mejor la seguridad y mejora la usabilidad; este prompt fue importante porque hizo el login más cómodo sin comprometer la autenticación.
