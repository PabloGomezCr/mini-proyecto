"use strict";

// 1. Credenciales del administrador
const usuarioAdministrador = {
  usuario: "admin",
  contrasena: "Admin123"
};

// 2. Referencias del DOM
const loginView = document.querySelector("#loginView");
const dashboardView = document.querySelector("#dashboardView");
const loginForm = document.querySelector("#loginForm");
const loginUsuario = document.querySelector("#loginUsuario");
const loginContrasena = document.querySelector("#loginContrasena");
const loginUsuarioError = document.querySelector("#loginUsuarioError");
const loginContrasenaError = document.querySelector("#loginContrasenaError");
const loginMessage = document.querySelector("#loginMessage");
const logoutButton = document.querySelector("#logoutButton");
const botonesNavegacion = document.querySelectorAll("[data-section]");
const secciones = document.querySelectorAll(".content-section");
const totalClientes = document.querySelector("#totalClientes");
const totalProductos = document.querySelector("#totalProductos");
const totalProveedores = document.querySelector("#totalProveedores");
const valorInventario = document.querySelector("#valorInventario");
const productoMasCaro = document.querySelector("#productoMasCaro");

// Referencias del Modal de Logout
const logoutModal = document.querySelector("#logoutModal");
const cancelLogout = document.querySelector("#cancelLogout");
const confirmLogout = document.querySelector("#confirmLogout");

const clienteForm = document.querySelector("#clienteForm");
const clienteNombre = document.querySelector("#clienteNombre");
const clienteCorreo = document.querySelector("#clienteCorreo");
const clienteTelefono = document.querySelector("#clienteTelefono");
const clienteNombreError = document.querySelector("#clienteNombreError");
const clienteCorreoError = document.querySelector("#clienteCorreoError");
const clienteTelefonoError = document.querySelector("#clienteTelefonoError");
const clienteMessage = document.querySelector("#clienteMessage");
const clienteFormTitle = document.querySelector("#clienteFormTitle");
const clienteSubmit = document.querySelector("#clienteSubmit");
const clienteCancel = document.querySelector("#clienteCancel");
const clientesTableBody = document.querySelector("#clientesTableBody");
const clientesEmpty = document.querySelector("#clientesEmpty");
const clienteExportar = document.querySelector("#clienteExportar");

const productoForm = document.querySelector("#productoForm");
const productoNombre = document.querySelector("#productoNombre");
const productoCategoria = document.querySelector("#productoCategoria");
const productoPrecio = document.querySelector("#productoPrecio");
const productoCantidad = document.querySelector("#productoCantidad");
const productoNombreError = document.querySelector("#productoNombreError");
const productoCategoriaError = document.querySelector("#productoCategoriaError");
const productoPrecioError = document.querySelector("#productoPrecioError");
const productoCantidadError = document.querySelector("#productoCantidadError");
const productoMessage = document.querySelector("#productoMessage");
const productoFormTitle = document.querySelector("#productoFormTitle");
const productoSubmit = document.querySelector("#productoSubmit");
const productoCancel = document.querySelector("#productoCancel");
const productosTableBody = document.querySelector("#productosTableBody");
const productosEmpty = document.querySelector("#productosEmpty");
const productoExportar = document.querySelector("#productoExportar");

const proveedorForm = document.querySelector("#proveedorForm");
const proveedorEmpresa = document.querySelector("#proveedorEmpresa");
const proveedorContacto = document.querySelector("#proveedorContacto");
const proveedorCorreo = document.querySelector("#proveedorCorreo");
const proveedorTelefono = document.querySelector("#proveedorTelefono");
const proveedorEmpresaError = document.querySelector("#proveedorEmpresaError");
const proveedorContactoError = document.querySelector("#proveedorContactoError");
const proveedorCorreoError = document.querySelector("#proveedorCorreoError");
const proveedorTelefonoError = document.querySelector("#proveedorTelefonoError");
const proveedorMessage = document.querySelector("#proveedorMessage");
const proveedorFormTitle = document.querySelector("#proveedorFormTitle");
const proveedorSubmit = document.querySelector("#proveedorSubmit");
const proveedorCancel = document.querySelector("#proveedorCancel");
const proveedoresTableBody = document.querySelector("#proveedoresTableBody");
const proveedoresEmpty = document.querySelector("#proveedoresEmpty");
const proveedorExportar = document.querySelector("#proveedorExportar");

// 3. Estado de la aplicación
const CLAVE_CLIENTES = "sistema_clientes";
const CLAVE_PRODUCTOS = "sistema_productos";
const CLAVE_PROVEEDORES = "sistema_proveedores";

let clientes = [];
let productos = [];
let proveedores = [];

let clienteEnEdicion = null;
let productoEnEdicion = null;
let proveedorEnEdicion = null;

// 4. Funciones de LocalStorage y Utilidades
function leerArregloDeLocalStorage(clave) {
  try {
    const contenido = localStorage.getItem(clave);
    if (contenido === null) return [];
    const datos = JSON.parse(contenido);
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error(`No fue posible leer la clave ${clave} de LocalStorage.`, error);
    return [];
  }
}

function guardarEnLocalStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function generarId() {
  return Date.now();
}

function escaparHTML(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function mostrarMensaje(elemento, mensaje, tipo) {
  if (!elemento) return;
  elemento.textContent = mensaje;
  elemento.classList.remove("is-error", "is-success");
  if (tipo) {
    elemento.classList.add(tipo === "error" ? "is-error" : "is-success");
  }
}

function establecerError(input, elementoError, mensaje) {
  if (elementoError) elementoError.textContent = mensaje;
  if (input) input.setAttribute("aria-invalid", mensaje ? "true" : "false");
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "—";
  return new Date(fechaISO).toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// 5. Funciones de Exportación a CSV
function convertirACSV(datos, columnas) {
  const encabezados = columnas.map(col => `"${col.etiqueta}"`).join(",");
  const filas = datos.map(item => {
    return columnas.map(col => {
      let valor = item[col.clave];
      if (col.clave === "fechaCreacion") {
        valor = formatearFecha(valor);
      }
      if (valor === undefined || valor === null) valor = "";
      return `"${String(valor).replaceAll('"', '""')}"`;
    }).join(",");
  });
  return [encabezados, ...filas].join("\n");
}

function descargarCSV(nombreArchivo, contenidoCSV) {
  const blob = new Blob(["\uFEFF" + contenidoCSV], { type: "text/csv;charset=utf-8;" });
  const enlace = document.createElement("a");
  const url = URL.createObjectURL(blob);
  enlace.setAttribute("href", url);
  enlace.setAttribute("download", nombreArchivo);
  enlace.style.visibility = "hidden";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
}

// 6. Funciones del Login y Logout (Modal)
function limpiarErroresLogin() {
  establecerError(loginUsuario, loginUsuarioError, "");
  establecerError(loginContrasena, loginContrasenaError, "");
  mostrarMensaje(loginMessage, "", "");
}

function procesarLogin(evento) {
  evento.preventDefault();
  limpiarErroresLogin();

  const usuarioIngresado = loginUsuario.value.trim();
  const contrasenaIngresada = loginContrasena.value;
  let formularioValido = true;

  if (!usuarioIngresado) {
    establecerError(loginUsuario, loginUsuarioError, "El usuario es obligatorio.");
    formularioValido = false;
  }

  if (!contrasenaIngresada) {
    establecerError(loginContrasena, loginContrasenaError, "La contraseña es obligatoria.");
    formularioValido = false;
  }

  if (!formularioValido) {
    mostrarMensaje(loginMessage, "Revisa los campos indicados.", "error");
    return;
  }

  const credencialesCorrectas =
    usuarioIngresado === usuarioAdministrador.usuario &&
    contrasenaIngresada === usuarioAdministrador.contrasena;

  if (!credencialesCorrectas) {
    mostrarMensaje(loginMessage, "Usuario o contraseña incorrectos.", "error");
    return;
  }

  loginView.classList.add("is-hidden");
  dashboardView.classList.remove("is-hidden");
  mostrarSeccion("inicio");
  loginForm.reset();
}

function abrirModalLogout() {
  if (logoutModal) logoutModal.classList.remove("is-hidden");
}

function cerrarModalLogout() {
  if (logoutModal) logoutModal.classList.add("is-hidden");
}

function procesarCerrarSesion() {
  cerrarModalLogout();

  dashboardView.classList.add("is-hidden");
  loginView.classList.remove("is-hidden");

  loginForm.reset();
  limpiarErroresLogin();
  mostrarSeccion("inicio");

  loginUsuario.focus();
}

// 7. Navegación
function mostrarSeccion(nombreSeccion) {
  secciones.forEach((seccion) => {
    seccion.classList.toggle("is-hidden", seccion.id !== `section-${nombreSeccion}`);
  });

  botonesNavegacion.forEach((boton) => {
    boton.classList.toggle("is-active", boton.dataset.section === nombreSeccion);
  });
}

// 8. CRUD Clientes
function limpiarFormularioCliente() {
  clienteForm.reset();
  clienteEnEdicion = null;
  clienteFormTitle.textContent = "Registrar cliente";
  clienteSubmit.textContent = "Registrar cliente";
  clienteCancel.classList.add("is-hidden");
  establecerError(clienteNombre, clienteNombreError, "");
  establecerError(clienteCorreo, clienteCorreoError, "");
  establecerError(clienteTelefono, clienteTelefonoError, "");
}

function validarCliente() {
  establecerError(clienteNombre, clienteNombreError, "");
  establecerError(clienteCorreo, clienteCorreoError, "");
  establecerError(clienteTelefono, clienteTelefonoError, "");
  mostrarMensaje(clienteMessage, "", "");

  const nombre = clienteNombre.value.trim();
  const correo = clienteCorreo.value.trim();
  const telefono = clienteTelefono.value.trim();
  let valido = true;

  if (!nombre) {
    establecerError(clienteNombre, clienteNombreError, "El nombre es obligatorio.");
    valido = false;
  }

  if (!correo) {
    establecerError(clienteCorreo, clienteCorreoError, "El correo es obligatorio.");
    valido = false;
  } else if (!esCorreoValido(correo)) {
    establecerError(clienteCorreo, clienteCorreoError, "Ingresa un correo válido.");
    valido = false;
  }

  if (!telefono) {
    establecerError(clienteTelefono, clienteTelefonoError, "El teléfono es obligatorio.");
    valido = false;
  }

  return { valido, nombre, correo, telefono };
}

function guardarCliente(evento) {
  evento.preventDefault();
  const resultado = validarCliente();

  if (!resultado.valido) {
    mostrarMensaje(clienteMessage, "Revisa los campos indicados.", "error");
    return;
  }

  if (clienteEnEdicion === null) {
    clientes.push({
      id: generarId(),
      nombre: resultado.nombre,
      correo: resultado.correo,
      telefono: resultado.telefono,
      fechaCreacion: new Date().toISOString()
    });
    mostrarMensaje(clienteMessage, "Cliente registrado correctamente.", "success");
  } else {
    const indice = clientes.findIndex((cliente) => cliente.id === clienteEnEdicion);
    if (indice !== -1) {
      clientes[indice] = {
        ...clientes[indice],
        nombre: resultado.nombre,
        correo: resultado.correo,
        telefono: resultado.telefono
      };
    }
  }

  guardarEnLocalStorage(CLAVE_CLIENTES, clientes);
  renderizarClientes();
  actualizarResumen();

  if (clienteEnEdicion !== null) {
    limpiarFormularioCliente();
    mostrarMensaje(clienteMessage, "Cliente actualizado correctamente.", "success");
  } else {
    clienteForm.reset();
  }
}

function iniciarEdicionCliente(id) {
  const cliente = clientes.find((item) => item.id === id);
  if (!cliente) return;

  clienteEnEdicion = id;
  clienteNombre.value = cliente.nombre;
  clienteCorreo.value = cliente.correo;
  clienteTelefono.value = cliente.telefono;
  clienteFormTitle.textContent = "Editar cliente";
  clienteSubmit.textContent = "Guardar cambios";
  clienteCancel.classList.remove("is-hidden");
  mostrarMensaje(clienteMessage, "", "");
  clienteNombre.focus();
}

function eliminarCliente(id) {
  const cliente = clientes.find((item) => item.id === id);
  if (!cliente || !window.confirm(`¿Deseas eliminar a ${cliente.nombre}?`)) return;

  clientes = clientes.filter((item) => item.id !== id);
  guardarEnLocalStorage(CLAVE_CLIENTES, clientes);
  renderizarClientes();
  actualizarResumen();

  if (clienteEnEdicion === id) {
    limpiarFormularioCliente();
  }
}

function renderizarClientes() {
  if (!clientesTableBody) return;
  clientesTableBody.innerHTML = clientes
    .map((cliente) => `
      <tr>
        <td>${escaparHTML(cliente.nombre)}</td>
        <td>${escaparHTML(cliente.correo)}</td>
        <td>${escaparHTML(cliente.telefono)}</td>
        <td>${formatearFecha(cliente.fechaCreacion)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${cliente.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${cliente.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  if (clientesEmpty) {
    clientesEmpty.classList.toggle("is-hidden", clientes.length > 0);
  }
}

function exportarClientesCSV() {
  if (clientes.length === 0) {
    mostrarMensaje(clienteMessage, "No hay clientes para exportar.", "error");
    return;
  }
  const csv = convertirACSV(clientes, [
    { clave: "nombre", etiqueta: "Nombre" },
    { clave: "correo", etiqueta: "Correo" },
    { clave: "telefono", etiqueta: "Teléfono" },
    { clave: "fechaCreacion", etiqueta: "Fecha de registro" }
  ]);
  descargarCSV("clientes.csv", csv);
}

// 9. CRUD Productos
function limpiarFormularioProducto() {
  productoForm.reset();
  productoEnEdicion = null;
  productoFormTitle.textContent = "Registrar producto";
  productoSubmit.textContent = "Registrar producto";
  productoCancel.classList.add("is-hidden");
  establecerError(productoNombre, productoNombreError, "");
  establecerError(productoCategoria, productoCategoriaError, "");
  establecerError(productoPrecio, productoPrecioError, "");
  establecerError(productoCantidad, productoCantidadError, "");
}

function validarProducto() {
  establecerError(productoNombre, productoNombreError, "");
  establecerError(productoCategoria, productoCategoriaError, "");
  establecerError(productoPrecio, productoPrecioError, "");
  establecerError(productoCantidad, productoCantidadError, "");
  mostrarMensaje(productoMessage, "", "");

  const nombre = productoNombre.value.trim();
  const categoria = productoCategoria.value.trim();
  const precio = parseFloat(productoPrecio.value);
  const cantidad = parseInt(productoCantidad.value, 10);
  let valido = true;

  if (!nombre) {
    establecerError(productoNombre, productoNombreError, "El nombre es obligatorio.");
    valido = false;
  }

  if (!categoria) {
    establecerError(productoCategoria, productoCategoriaError, "La categoría es obligatoria.");
    valido = false;
  }

  if (isNaN(precio) || precio <= 0) {
    establecerError(productoPrecio, productoPrecioError, "Ingresa un precio mayor a 0.");
    valido = false;
  }

  if (isNaN(cantidad) || cantidad < 0) {
    establecerError(productoCantidad, productoCantidadError, "Ingresa una cantidad válida.");
    valido = false;
  }

  return { valido, nombre, categoria, precio, cantidad };
}

function guardarProducto(evento) {
  evento.preventDefault();
  const resultado = validarProducto();

  if (!resultado.valido) {
    mostrarMensaje(productoMessage, "Revisa los campos indicados.", "error");
    return;
  }

  if (productoEnEdicion === null) {
    productos.push({
      id: generarId(),
      nombre: resultado.nombre,
      categoria: resultado.categoria,
      precio: resultado.precio,
      cantidad: resultado.cantidad,
      fechaCreacion: new Date().toISOString()
    });
    mostrarMensaje(productoMessage, "Producto registrado correctamente.", "success");
  } else {
    const indice = productos.findIndex((p) => p.id === productoEnEdicion);
    if (indice !== -1) {
      productos[indice] = {
        ...productos[indice],
        nombre: resultado.nombre,
        categoria: resultado.categoria,
        precio: resultado.precio,
        cantidad: resultado.cantidad
      };
    }
  }

  guardarEnLocalStorage(CLAVE_PRODUCTOS, productos);
  renderizarProductos();
  actualizarResumen();

  if (productoEnEdicion !== null) {
    limpiarFormularioProducto();
    mostrarMensaje(productoMessage, "Producto actualizado correctamente.", "success");
  } else {
    productoForm.reset();
  }
}

function iniciarEdicionProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto) return;

  productoEnEdicion = id;
  productoNombre.value = producto.nombre;
  productoCategoria.value = producto.categoria;
  productoPrecio.value = producto.precio;
  productoCantidad.value = producto.cantidad;
  productoFormTitle.textContent = "Editar producto";
  productoSubmit.textContent = "Guardar cambios";
  productoCancel.classList.remove("is-hidden");
  mostrarMensaje(productoMessage, "", "");
  productoNombre.focus();
}

function eliminarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto || !window.confirm(`¿Deseas eliminar ${producto.nombre}?`)) return;

  productos = productos.filter((p) => p.id !== id);
  guardarEnLocalStorage(CLAVE_PRODUCTOS, productos);
  renderizarProductos();
  actualizarResumen();

  if (productoEnEdicion === id) {
    limpiarFormularioProducto();
  }
}

function renderizarProductos() {
  if (!productosTableBody) return;
  productosTableBody.innerHTML = productos
    .map((p) => `
      <tr>
        <td>${escaparHTML(p.nombre)}</td>
        <td>${escaparHTML(p.categoria)}</td>
        <td>₡${Number(p.precio).toFixed(2)}</td>
        <td>${p.cantidad}</td>
        <td>${formatearFecha(p.fechaCreacion)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${p.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${p.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  if (productosEmpty) {
    productosEmpty.classList.toggle("is-hidden", productos.length > 0);
  }
}

function exportarProductosCSV() {
  if (productos.length === 0) {
    mostrarMensaje(productoMessage, "No hay productos para exportar.", "error");
    return;
  }
  const csv = convertirACSV(productos, [
    { clave: "nombre", etiqueta: "Nombre" },
    { clave: "categoria", etiqueta: "Categoría" },
    { clave: "precio", etiqueta: "Precio" },
    { clave: "cantidad", etiqueta: "Cantidad" },
    { clave: "fechaCreacion", etiqueta: "Fecha de registro" }
  ]);
  descargarCSV("productos.csv", csv);
}

// 10. CRUD Proveedores
function limpiarFormularioProveedor() {
  proveedorForm.reset();
  proveedorEnEdicion = null;
  proveedorFormTitle.textContent = "Registrar proveedor";
  proveedorSubmit.textContent = "Registrar proveedor";
  proveedorCancel.classList.add("is-hidden");
  establecerError(proveedorEmpresa, proveedorEmpresaError, "");
  establecerError(proveedorContacto, proveedorContactoError, "");
  establecerError(proveedorCorreo, proveedorCorreoError, "");
  establecerError(proveedorTelefono, proveedorTelefonoError, "");
}

function validarProveedor() {
  establecerError(proveedorEmpresa, proveedorEmpresaError, "");
  establecerError(proveedorContacto, proveedorContactoError, "");
  establecerError(proveedorCorreo, proveedorCorreoError, "");
  establecerError(proveedorTelefono, proveedorTelefonoError, "");
  mostrarMensaje(proveedorMessage, "", "");

  const empresa = proveedorEmpresa.value.trim();
  const contacto = proveedorContacto.value.trim();
  const correo = proveedorCorreo.value.trim();
  const telefono = proveedorTelefono.value.trim();
  let valido = true;

  if (!empresa) {
    establecerError(proveedorEmpresa, proveedorEmpresaError, "La empresa es obligatoria.");
    valido = false;
  }

  if (!contacto) {
    establecerError(proveedorContacto, proveedorContactoError, "El contacto es obligatorio.");
    valido = false;
  }

  if (!correo) {
    establecerError(proveedorCorreo, proveedorCorreoError, "El correo es obligatorio.");
    valido = false;
  } else if (!esCorreoValido(correo)) {
    establecerError(proveedorCorreo, proveedorCorreoError, "Ingresa un correo válido.");
    valido = false;
  }

  if (!telefono) {
    establecerError(proveedorTelefono, proveedorTelefonoError, "El teléfono es obligatorio.");
    valido = false;
  }

  return { valido, empresa, contacto, correo, telefono };
}

function guardarProveedor(evento) {
  evento.preventDefault();
  const resultado = validarProveedor();

  if (!resultado.valido) {
    mostrarMensaje(proveedorMessage, "Revisa los campos indicados.", "error");
    return;
  }

  if (proveedorEnEdicion === null) {
    proveedores.push({
      id: generarId(),
      empresa: resultado.empresa,
      contacto: resultado.contacto,
      correo: resultado.correo,
      telefono: resultado.telefono,
      fechaCreacion: new Date().toISOString()
    });
    mostrarMensaje(proveedorMessage, "Proveedor registrado correctamente.", "success");
  } else {
    const indice = proveedores.findIndex((p) => p.id === proveedorEnEdicion);
    if (indice !== -1) {
      proveedores[indice] = {
        ...proveedores[indice],
        empresa: resultado.empresa,
        contacto: resultado.contacto,
        correo: resultado.correo,
        telefono: resultado.telefono
      };
    }
  }

  guardarEnLocalStorage(CLAVE_PROVEEDORES, proveedores);
  renderizarProveedores();
  actualizarResumen();

  if (proveedorEnEdicion !== null) {
    limpiarFormularioProveedor();
    mostrarMensaje(proveedorMessage, "Proveedor actualizado correctamente.", "success");
  } else {
    proveedorForm.reset();
  }
}

function iniciarEdicionProveedor(id) {
  const proveedor = proveedores.find((p) => p.id === id);
  if (!proveedor) return;

  proveedorEnEdicion = id;
  proveedorEmpresa.value = proveedor.empresa;
  proveedorContacto.value = proveedor.contacto;
  proveedorCorreo.value = proveedor.correo;
  proveedorTelefono.value = proveedor.telefono;
  proveedorFormTitle.textContent = "Editar proveedor";
  proveedorSubmit.textContent = "Guardar cambios";
  proveedorCancel.classList.remove("is-hidden");
  mostrarMensaje(proveedorMessage, "", "");
  proveedorEmpresa.focus();
}

function eliminarProveedor(id) {
  const proveedor = proveedores.find((p) => p.id === id);
  if (!proveedor || !window.confirm(`¿Deseas eliminar a ${proveedor.empresa}?`)) return;

  proveedores = proveedores.filter((p) => p.id !== id);
  guardarEnLocalStorage(CLAVE_PROVEEDORES, proveedores);
  renderizarProveedores();
  actualizarResumen();

  if (proveedorEnEdicion === id) {
    limpiarFormularioProveedor();
  }
}

function renderizarProveedores() {
  if (!proveedoresTableBody) return;
  proveedoresTableBody.innerHTML = proveedores
    .map((p) => `
      <tr>
        <td>${escaparHTML(p.empresa)}</td>
        <td>${escaparHTML(p.contacto)}</td>
        <td>${escaparHTML(p.correo)}</td>
        <td>${escaparHTML(p.telefono)}</td>
        <td>${formatearFecha(p.fechaCreacion)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${p.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${p.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  if (proveedoresEmpty) {
    proveedoresEmpty.classList.toggle("is-hidden", proveedores.length > 0);
  }
}

function exportarProveedoresCSV() {
  if (proveedores.length === 0) {
    mostrarMensaje(proveedorMessage, "No hay proveedores para exportar.", "error");
    return;
  }
  const csv = convertirACSV(proveedores, [
    { clave: "empresa", etiqueta: "Empresa" },
    { clave: "contacto", etiqueta: "Contacto" },
    { clave: "correo", etiqueta: "Correo" },
    { clave: "telefono", etiqueta: "Teléfono" },
    { clave: "fechaCreacion", etiqueta: "Fecha de registro" }
  ]);
  descargarCSV("proveedores.csv", csv);
}

// 11. Cálculos e Indicadores
function calcularValorInventario() {
  return productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
}

function obtenerProductoMasCaro() {
  if (productos.length === 0) return null;
  return productos.reduce((max, p) => p.precio > max.precio ? p : max, productos[0]);
}

function actualizarResumen() {
  if (totalClientes) totalClientes.textContent = clientes.length;
  if (totalProductos) totalProductos.textContent = productos.length;
  if (totalProveedores) totalProveedores.textContent = proveedores.length;

  const totalValor = calcularValorInventario();
  if (valorInventario) valorInventario.textContent = `₡${totalValor.toFixed(2)}`;

  const masCaro = obtenerProductoMasCaro();
  if (productoMasCaro) {
    productoMasCaro.textContent = masCaro ? `${masCaro.nombre} (₡${Number(masCaro.precio).toFixed(2)})` : "—";
  }
}

// 12. Listeners de eventos
function registrarEventos() {
  if (loginForm) loginForm.addEventListener("submit", procesarLogin);
  
  // Eventos del Logout y Modal
  if (logoutButton) logoutButton.addEventListener("click", abrirModalLogout);
  if (cancelLogout) cancelLogout.addEventListener("click", cerrarModalLogout);
  if (confirmLogout) confirmLogout.addEventListener("click", procesarCerrarSesion);

  botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.section);
    });
  });

  if (clienteForm) clienteForm.addEventListener("submit", guardarCliente);
  if (clienteCancel) clienteCancel.addEventListener("click", limpiarFormularioCliente);
  if (clienteExportar) clienteExportar.addEventListener("click", exportarClientesCSV);
  if (clientesTableBody) {
    clientesTableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      if (btn.dataset.action === "editar") iniciarEdicionCliente(id);
      if (btn.dataset.action === "eliminar") eliminarCliente(id);
    });
  }

  if (productoForm) productoForm.addEventListener("submit", guardarProducto);
  if (productoCancel) productoCancel.addEventListener("click", limpiarFormularioProducto);
  if (productoExportar) productoExportar.addEventListener("click", exportarProductosCSV);
  if (productosTableBody) {
    productosTableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      if (btn.dataset.action === "editar") iniciarEdicionProducto(id);
      if (btn.dataset.action === "eliminar") eliminarProducto(id);
    });
  }

  if (proveedorForm) proveedorForm.addEventListener("submit", guardarProveedor);
  if (proveedorCancel) proveedorCancel.addEventListener("click", limpiarFormularioProveedor);
  if (proveedorExportar) proveedorExportar.addEventListener("click", exportarProveedoresCSV);
  if (proveedoresTableBody) {
    proveedoresTableBody.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      if (btn.dataset.action === "editar") iniciarEdicionProveedor(id);
      if (btn.dataset.action === "eliminar") eliminarProveedor(id);
    });
  }
}

// 13. Inicialización
function inicializarApp() {
  clientes = leerArregloDeLocalStorage(CLAVE_CLIENTES);
  productos = leerArregloDeLocalStorage(CLAVE_PRODUCTOS);
  proveedores = leerArregloDeLocalStorage(CLAVE_PROVEEDORES);

  renderizarClientes();
  renderizarProductos();
  renderizarProveedores();
  actualizarResumen();

  registrarEventos();
}

document.addEventListener("DOMContentLoaded", inicializarApp);