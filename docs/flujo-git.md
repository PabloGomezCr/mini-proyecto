# Flujo de Git

## Rama principal

La rama `main` debe contener únicamente cambios revisados y funcionales.

## Ramas por funcionalidad

Utilizar solamente estas ramas:

- `feat-login`
- `feat-dashboard`
- `feat-clientes`
- `feat-productos`
- `feat-proveedores`
- `docs-proyecto`

## Flujo recomendado

1. Actualizar la rama `main`.
2. Crear una rama para la funcionalidad asignada.
3. Realizar cambios pequeños y comprensibles.
4. Probar antes de guardar cada avance.
5. Crear commits descriptivos.
6. Subir la rama al repositorio remoto.
7. Abrir un pull request hacia `main`.
8. Solicitar revisión a otro integrante.
9. Corregir observaciones si existen.
10. Integrar los cambios cuando estén aprobados.

## Ejemplos de commits

- `feat: agregar validación del login`
- `feat: crear estructura del dashboard`
- `feat: implementar CRUD de clientes`
- `feat: implementar CRUD de productos`
- `feat: implementar CRUD de proveedores`
- `docs: agregar documentación del proyecto`
- `fix: corregir validación de formulario`

Estos mensajes son ejemplos. El equipo debe utilizar mensajes que correspondan con los cambios realmente realizados.

## Plantilla de pull request

```markdown
## ¿Qué hace este PR?

## ¿Por qué?

## ¿Cómo se probó?

## Checklist

- [ ] El código corre sin errores
- [ ] Los cambios fueron revisados
- [ ] La funcionalidad fue probada
- [ ] La documentación fue actualizada si aplica
```

## Responsabilidad del equipo

Los integrantes deben crear las ramas, commits y pull requests en su propio repositorio. Este documento no representa un historial real ni confirma que esas acciones ya se realizaron.
