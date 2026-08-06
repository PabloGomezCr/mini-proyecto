# Investigación previa

## 1. ¿Qué es la autenticación?

La autenticación es el proceso de comprobar que una persona es quien afirma ser. Normalmente se realiza mediante datos como un usuario y una contraseña.

**Ejemplo en el proyecto:** el sistema compara el usuario y la contraseña escritos en el formulario con las credenciales guardadas en un objeto de JavaScript.

## 2. ¿Cuál es la diferencia entre autenticación y autorización?

La autenticación responde a la pregunta “¿quién eres?”. La autorización responde a “¿qué puedes hacer?”. Primero se identifica al usuario y después se determinan sus permisos.

**Ejemplo en el proyecto:** se implementa autenticación básica para permitir el ingreso al dashboard. No se implementan roles ni permisos porque están fuera del alcance.

## 3. ¿Por qué es importante implementar un inicio de sesión?

Un inicio de sesión ayuda a limitar el acceso a la información de un sistema. En una aplicación real también permite identificar usuarios y aplicar medidas de seguridad.

**Ejemplo en el proyecto:** el dashboard permanece oculto hasta que se ingresan las credenciales correctas.

## 4. ¿Qué ventajas ofrece un sistema administrativo?

Un sistema administrativo centraliza información, facilita las consultas y reduce errores de procesos manuales. También permite actualizar datos de manera más ordenada.

**Ejemplo en el proyecto:** clientes, productos y proveedores se administran desde una sola interfaz.

## 5. ¿Qué es LocalStorage?

LocalStorage es un espacio de almacenamiento del navegador que permite conservar datos aunque la página se recargue. Guarda información en forma de texto.

**Ejemplo en el proyecto:** los arreglos de clientes, productos y proveedores se convierten con `JSON.stringify()` y se guardan en LocalStorage.

LocalStorage no es una base de datos segura. La información puede verse o modificarse desde el navegador y no se comparte entre dispositivos.

## 6. ¿Qué es el DOM?

El DOM es la representación que el navegador crea a partir del HTML. JavaScript puede utilizarla para leer, modificar, mostrar u ocultar elementos de la página.

**Ejemplo en el proyecto:** JavaScript actualiza las tablas, las tarjetas de resumen y las secciones visibles sin recargar la página.

## 7. ¿Qué es Git?

Git es un sistema de control de versiones. Permite guardar un historial de cambios, trabajar en ramas y recuperar versiones anteriores del proyecto.

**Ejemplo en el proyecto:** cada integrante puede trabajar en una rama distinta para separar las funcionalidades.

## 8. ¿Cómo funcionan las ramas?

Una rama es una línea de trabajo separada. Sirve para desarrollar una funcionalidad sin modificar directamente la rama principal.

**Ejemplo en el proyecto:** el login puede desarrollarse en `feat-login` y el CRUD de clientes en `feat-clientes`.

## 9. ¿Qué es un commit?

Un commit es un registro de cambios guardado en el historial de Git. Debe tener un mensaje breve que explique qué se modificó.

**Ejemplo en el proyecto:** `feat: implementar CRUD de clientes`.

## 10. ¿Qué es un pull request?

Un pull request es una solicitud para revisar e integrar los cambios de una rama en otra. Facilita la revisión del código y la colaboración.

**Ejemplo en el proyecto:** después de terminar `feat-productos`, el integrante crea un pull request hacia `main`.

## 11. Buenas prácticas para construir prompts efectivos

Un prompt efectivo debe indicar el objetivo, el contexto, las tecnologías, las limitaciones y el formato esperado. También debe evitar solicitudes ambiguas y pedir una solución que el equipo pueda comprender.

**Ejemplo en el proyecto:** solicitar únicamente un CRUD de productos con HTML, CSS, JavaScript y LocalStorage, sin agregar backend ni frameworks.

## Relación de la investigación con el proyecto

La autenticación se aplica en el login; el DOM se utiliza para cambiar secciones y construir tablas; los objetos representan registros; los arreglos almacenan la información; LocalStorage conserva los datos; y Git organiza el trabajo colaborativo mediante ramas, commits y pull requests. Los prompts se utilizan como apoyo para planificar, revisar y mejorar el código, pero cada integrante debe comprender y poder explicar la solución completa.
