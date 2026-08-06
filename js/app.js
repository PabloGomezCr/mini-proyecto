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

// 4. Funciones de LocalStorage
function leerArregloDeLocalStorage(clave) {
  try {
    const contenido = localStorage.getItem(clave);

    if (contenido === null) {
      return [];
    }

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
  elemento.textContent = mensaje;
  elemento.classList.remove("is-error", "is-success");

  if (tipo) {
    elemento.classList.add(tipo === "error" ? "is-error" : "is-success");
  }
}

function establecerError(input, elementoError, mensaje) {
  elementoError.textContent = mensaje;
  input.setAttribute("aria-invalid", mensaje ? "true" : "false");
}

// 5. Funciones del login
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
function cerrarSesion() {
  dashboardView.classList.add("is-hidden");
  loginView.classList.remove("is-hidden");

  loginForm.reset();
  limpiarErroresLogin();
  mostrarSeccion("inicio");

  loginUsuario.focus();
}


// 6. Navegación del dashboard
function mostrarSeccion(nombreSeccion) {
  secciones.forEach((seccion) => {
    seccion.classList.toggle("is-hidden", seccion.id !== `section-${nombreSeccion}`);
  });

  botonesNavegacion.forEach((boton) => {
    boton.classList.toggle("is-active", boton.dataset.section === nombreSeccion);
  });
}

// 7. CRUD de clientes
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
      telefono: resultado.telefono
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

  if (!cliente) {
    return;
  }

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

  if (!cliente || !window.confirm(`¿Deseas eliminar a ${cliente.nombre}?`)) {
    return;
  }

  clientes = clientes.filter((item) => item.id !== id);
  guardarEnLocalStorage(CLAVE_CLIENTES, clientes);
  renderizarClientes();
  actualizarResumen();

  if (clienteEnEdicion === id) {
    limpiarFormularioCliente();
  }
}

function renderizarClientes() {
  clientesTableBody.innerHTML = clientes
    .map((cliente) => `
      <tr>
        <td>${escaparHTML(cliente.nombre)}</td>
        <td>${escaparHTML(cliente.correo)}</td>
        <td>${escaparHTML(cliente.telefono)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${cliente.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${cliente.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  clientesEmpty.classList.toggle("is-hidden", clientes.length > 0);
}

// 8. CRUD de productos
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
  const precio = Number(productoPrecio.value);
  const cantidad = Number(productoCantidad.value);
  let valido = true;

  if (!nombre) {
    establecerError(productoNombre, productoNombreError, "El nombre es obligatorio.");
    valido = false;
  }

  if (!categoria) {
    establecerError(productoCategoria, productoCategoriaError, "La categoría es obligatoria.");
    valido = false;
  }

  if (productoPrecio.value === "" || precio <= 0) {
    establecerError(productoPrecio, productoPrecioError, "El precio debe ser mayor que cero.");
    valido = false;
  }

  if (productoCantidad.value === "" || cantidad < 0 || !Number.isInteger(cantidad)) {
    establecerError(productoCantidad, productoCantidadError, "La cantidad debe ser un número entero mayor o igual que cero.");
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
      cantidad: resultado.cantidad
    });
    mostrarMensaje(productoMessage, "Producto registrado correctamente.", "success");
  } else {
    const indice = productos.findIndex((producto) => producto.id === productoEnEdicion);

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
  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return;
  }

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
  const producto = productos.find((item) => item.id === id);

  if (!producto || !window.confirm(`¿Deseas eliminar el producto ${producto.nombre}?`)) {
    return;
  }

  productos = productos.filter((item) => item.id !== id);
  guardarEnLocalStorage(CLAVE_PRODUCTOS, productos);
  renderizarProductos();
  actualizarResumen();

  if (productoEnEdicion === id) {
    limpiarFormularioProducto();
  }
}

function formatearColones(valor) {
  return `₡${Number(valor).toLocaleString("es-CR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function renderizarProductos() {
  productosTableBody.innerHTML = productos
    .map((producto) => `
      <tr>
        <td>${escaparHTML(producto.nombre)}</td>
        <td>${escaparHTML(producto.categoria)}</td>
        <td>${formatearColones(producto.precio)}</td>
        <td>${escaparHTML(producto.cantidad)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${producto.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${producto.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  productosEmpty.classList.toggle("is-hidden", productos.length > 0);
}

// 9. CRUD de proveedores
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
    establecerError(proveedorEmpresa, proveedorEmpresaError, "El nombre de la empresa es obligatorio.");
    valido = false;
  }

  if (!contacto) {
    establecerError(proveedorContacto, proveedorContactoError, "El nombre del contacto es obligatorio.");
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
      telefono: resultado.telefono
    });
    mostrarMensaje(proveedorMessage, "Proveedor registrado correctamente.", "success");
  } else {
    const indice = proveedores.findIndex((proveedor) => proveedor.id === proveedorEnEdicion);

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
  const proveedor = proveedores.find((item) => item.id === id);

  if (!proveedor) {
    return;
  }

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
  const proveedor = proveedores.find((item) => item.id === id);

  if (!proveedor || !window.confirm(`¿Deseas eliminar al proveedor ${proveedor.empresa}?`)) {
    return;
  }

  proveedores = proveedores.filter((item) => item.id !== id);
  guardarEnLocalStorage(CLAVE_PROVEEDORES, proveedores);
  renderizarProveedores();
  actualizarResumen();

  if (proveedorEnEdicion === id) {
    limpiarFormularioProveedor();
  }
}

function renderizarProveedores() {
  proveedoresTableBody.innerHTML = proveedores
    .map((proveedor) => `
      <tr>
        <td>${escaparHTML(proveedor.empresa)}</td>
        <td>${escaparHTML(proveedor.contacto)}</td>
        <td>${escaparHTML(proveedor.correo)}</td>
        <td>${escaparHTML(proveedor.telefono)}</td>
        <td>
          <div class="table-actions">
            <button class="button button--secondary button--small" type="button" data-action="editar" data-id="${proveedor.id}">Editar</button>
            <button class="button button--danger button--small" type="button" data-action="eliminar" data-id="${proveedor.id}">Eliminar</button>
          </div>
        </td>
      </tr>
    `)
    .join("");

  proveedoresEmpty.classList.toggle("is-hidden", proveedores.length > 0);
}

// 10. Tarjetas de resumen
function actualizarResumen() {
  totalClientes.textContent = clientes.length;
  totalProductos.textContent = productos.length;
  totalProveedores.textContent = proveedores.length;
}

// 11. Eventos
function procesarAccionTabla(evento, tipoRegistro) {
  const boton = evento.target.closest("button[data-action]");

  if (!boton) {
    return;
  }

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.action;

  if (tipoRegistro === "cliente") {
    accion === "editar" ? iniciarEdicionCliente(id) : eliminarCliente(id);
  }

  if (tipoRegistro === "producto") {
    accion === "editar" ? iniciarEdicionProducto(id) : eliminarProducto(id);
  }

  if (tipoRegistro === "proveedor") {
    accion === "editar" ? iniciarEdicionProveedor(id) : eliminarProveedor(id);
  }
}

function registrarEventos() {
  loginForm.addEventListener("submit", procesarLogin);
  logoutButton.addEventListener("click", cerrarSesion);
  
  botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", () => mostrarSeccion(boton.dataset.section));
  });

  clienteForm.addEventListener("submit", guardarCliente);
  clienteCancel.addEventListener("click", () => {
    limpiarFormularioCliente();
    mostrarMensaje(clienteMessage, "Edición cancelada.", "");
  });
  clientesTableBody.addEventListener("click", (evento) => procesarAccionTabla(evento, "cliente"));

  productoForm.addEventListener("submit", guardarProducto);
  productoCancel.addEventListener("click", () => {
    limpiarFormularioProducto();
    mostrarMensaje(productoMessage, "Edición cancelada.", "");
  });
  productosTableBody.addEventListener("click", (evento) => procesarAccionTabla(evento, "producto"));

  proveedorForm.addEventListener("submit", guardarProveedor);
  proveedorCancel.addEventListener("click", () => {
    limpiarFormularioProveedor();
    mostrarMensaje(proveedorMessage, "Edición cancelada.", "");
  });
  proveedoresTableBody.addEventListener("click", (evento) => procesarAccionTabla(evento, "proveedor"));
}

// 12. Inicialización de la aplicación
function inicializarAplicacion() {
  clientes = leerArregloDeLocalStorage(CLAVE_CLIENTES);
  productos = leerArregloDeLocalStorage(CLAVE_PRODUCTOS);
  proveedores = leerArregloDeLocalStorage(CLAVE_PROVEEDORES);

  renderizarClientes();
  renderizarProductos();
  renderizarProveedores();
  actualizarResumen();
  registrarEventos();
}

inicializarAplicacion();
