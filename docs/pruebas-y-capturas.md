# Pruebas y capturas

## Pruebas manuales

### Login

- Probar los dos campos vacíos.
- Probar un usuario incorrecto.
- Probar una contraseña incorrecta.
- Probar las credenciales correctas.

### Clientes

- Registrar un cliente.
- Consultar el cliente en la tabla.
- Editar un cliente.
- Eliminar un cliente.
- Validar campos vacíos y correo incorrecto.

### Productos

- Registrar un producto.
- Consultar el producto en la tabla.
- Editar un producto.
- Eliminar un producto.
- Validar precio mayor que cero.
- Validar cantidad mayor o igual que cero.

### Proveedores

- Registrar un proveedor.
- Consultar el proveedor en la tabla.
- Editar un proveedor.
- Eliminar un proveedor.
- Validar el formato del correo.

### Persistencia

- Crear información.
- Recargar la página.
- Iniciar sesión nuevamente.
- Comprobar que los datos continúan almacenados.

### Responsive

- Revisar en computadora.
- Revisar en tableta.
- Revisar en teléfono.

### Consola

- Abrir las herramientas del navegador.
- Comprobar que no existan errores en la consola.

## Tabla de pruebas

| N.° | Módulo | Acción | Resultado esperado | Resultado obtenido | Estado |
|---:|---|---|---|---|---|
| 1 | Login | Enviar campos vacíos | Se muestran mensajes de campos obligatorios |  |  |
| 2 | Login | Usar usuario incorrecto | Se muestra mensaje de credenciales incorrectas |  |  |
| 3 | Login | Usar contraseña incorrecta | Se muestra mensaje de credenciales incorrectas |  |  |
| 4 | Login | Usar credenciales correctas | Se muestra el dashboard |  |  |
| 5 | Clientes | Registrar datos válidos | El cliente aparece en la tabla |  |  |
| 6 | Clientes | Registrar correo inválido | El formulario muestra un error |  |  |
| 7 | Clientes | Editar un registro | La tabla muestra los datos actualizados |  |  |
| 8 | Clientes | Eliminar un registro | El registro desaparece de la tabla |  |  |
| 9 | Productos | Registrar datos válidos | El producto aparece en la tabla |  |  |
| 10 | Productos | Registrar precio igual a cero | El formulario muestra un error |  |  |
| 11 | Productos | Registrar cantidad negativa | El formulario muestra un error |  |  |
| 12 | Productos | Editar un registro | La tabla muestra los datos actualizados |  |  |
| 13 | Productos | Eliminar un registro | El registro desaparece de la tabla |  |  |
| 14 | Proveedores | Registrar datos válidos | El proveedor aparece en la tabla |  |  |
| 15 | Proveedores | Registrar correo inválido | El formulario muestra un error |  |  |
| 16 | Proveedores | Editar un registro | La tabla muestra los datos actualizados |  |  |
| 17 | Proveedores | Eliminar un registro | El registro desaparece de la tabla |  |  |
| 18 | Persistencia | Recargar después de registrar datos | Los datos continúan almacenados |  |  |
| 19 | Dashboard | Agregar o eliminar registros | Las tarjetas actualizan sus totales |  |  |
| 20 | Responsive | Revisar en pantalla pequeña | El contenido se adapta sin desbordar la página |  |  |
| 21 | Consola | Navegar y usar los CRUD | No aparecen errores de JavaScript |  |  |

## Capturas que deben tomarse manualmente

1. Pantalla de login.
2. Error de credenciales.
3. Dashboard.
4. CRUD de clientes.
5. CRUD de productos.
6. CRUD de proveedores.
7. Vista responsive.
8. LocalStorage en las herramientas del navegador.
9. Historial de Git.
10. Pull request.

Las capturas deben obtenerse después de ejecutar y probar el proyecto. Este documento no indica que ya existan.
