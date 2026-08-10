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
const loginRecordar = document.querySelector("#loginRecordar");
const loginUsuarioError = document.querySelector("#loginUsuarioError");
const loginContrasenaError = document.querySelector("#loginContrasenaError");;

const systemModal = document.querySelector("#systemModal");
const modalIcon = document.querySelector("#modalIcon");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");
const modalCancel = document.querySelector("#modalCancel");
const modalConfirm = document.querySelector("#modalConfirm");
const modalClose = document.querySelector("#modalClose");
const logoutButton = document.querySelector("#logoutButton");
const avatarButton = document.querySelector("#avatarButton");
const userDropdown = document.querySelector("#userDropdown");
const profileOption = document.querySelector("#profileOption");
const profileModal = document.querySelector("#profileModal");
const profileClose = document.querySelector("#profileClose");
const themeToggle = document.querySelector("#themeToggle");
const CLAVE_TEMA = "sistema_tema";

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
const CLAVE_USUARIO_RECORDADO = "sistema_usuario_recordado";
const CLAVE_SESION_ACTIVA = "sistema_sesion_activa";

let clientes = [];
let productos = [];
let proveedores = [];

let clienteEnEdicion = null;
let productoEnEdicion = null;
let proveedorEnEdicion = null;


let accionModalPendiente = null;
let elementoFocoAnterior = null;

// 4. Funciones de LocalStorage

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

function obtenerIconoModal(tipo) {
  const iconos = {
    success: "✓",
    error: "×",
    warning: "!",
    info: "i",
    confirm: "!"
  };

  return iconos[tipo] || "i";
}

function mostrarModal(tipo, titulo, mensaje) {
  elementoFocoAnterior = document.activeElement;

  accionModalPendiente = null;

  systemModal.dataset.type = tipo;

  modalIcon.textContent = obtenerIconoModal(tipo);
  modalTitle.textContent = titulo;
  modalMessage.textContent = mensaje;

  modalCancel.classList.add("is-hidden");
  modalConfirm.classList.add("is-hidden");
  modalClose.classList.remove("is-hidden");

  modalClose.textContent = "Aceptar";

  if (!systemModal.open) {
    systemModal.showModal();
  }}
function mostrarMensaje(elemento, mensaje, tipo) {
  if (!elemento) return;
  elemento.textContent = mensaje;
  elemento.classList.remove("is-error", "is-success");
  if (tipo) {
    elemento.classList.add(tipo === "error" ? "is-error" : "is-success");
  }

  modalClose.focus();
}

function mostrarConfirmacion(titulo, mensaje, accionConfirmada) {
  elementoFocoAnterior = document.activeElement;
  accionModalPendiente = accionConfirmada;

  systemModal.dataset.type = "confirm";

  modalIcon.textContent = obtenerIconoModal("confirm");
  modalTitle.textContent = titulo;
  modalMessage.textContent = mensaje;

  modalClose.classList.add("is-hidden");
  modalCancel.classList.remove("is-hidden");
  modalConfirm.classList.remove("is-hidden");

  modalCancel.textContent = "Cancelar";
  modalConfirm.textContent = "Eliminar";

  if (!systemModal.open) {
    systemModal.showModal();
  }

  modalCancel.focus();
}

function cerrarModal() {
  if (systemModal.open) {
    systemModal.close();
  }

  accionModalPendiente = null;

  if (
    elementoFocoAnterior &&
    typeof elementoFocoAnterior.focus === "function"
  ) {
    elementoFocoAnterior.focus();
  }

  elementoFocoAnterior = null;
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
}

function cargarUsuarioRecordado() {
  if (!loginUsuario || !loginRecordar) return;

  const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO_RECORDADO);
  loginUsuario.value = usuarioGuardado || "";
  loginRecordar.checked = Boolean(usuarioGuardado);

  if (usuarioGuardado) {
    loginContrasena.focus();
  } else {
    loginUsuario.focus();
  }
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
  mostrarModal(
    "error",
    "Datos incompletos",
    "Revisa los campos indicados."
  );

  return;
}

  const credencialesCorrectas =
    usuarioIngresado === usuarioAdministrador.usuario &&
    contrasenaIngresada === usuarioAdministrador.contrasena;

if (!credencialesCorrectas) {
  mostrarModal(
    "error",
    "No fue posible iniciar sesión",
    "Usuario o contraseña incorrectos."
  );

  return;
}

  if (loginRecordar) {
    if (loginRecordar.checked) {
      localStorage.setItem(CLAVE_USUARIO_RECORDADO, usuarioIngresado);
      localStorage.setItem(CLAVE_SESION_ACTIVA, "true");
    } else {
      localStorage.removeItem(CLAVE_USUARIO_RECORDADO);
      localStorage.removeItem(CLAVE_SESION_ACTIVA);
    }
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
}
function cerrarMenuUsuario() {
  userDropdown.classList.add("is-hidden");
  avatarButton.setAttribute("aria-expanded", "false");
}

function alternarMenuUsuario(evento) {
  evento.stopPropagation();

  if (userDropdown.classList.contains("is-hidden")) {
    userDropdown.classList.remove("is-hidden");
    avatarButton.setAttribute("aria-expanded", "true");
    return;
  }

  cerrarMenuUsuario();
}

function abrirPerfil() {
  cerrarMenuUsuario();
  profileModal.classList.remove("is-hidden");
  profileModal.setAttribute("aria-hidden", "false");
}

function cerrarPerfil() {
  profileModal.classList.add("is-hidden");
  profileModal.setAttribute("aria-hidden", "true");
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION_ACTIVA);

  dashboardView.classList.add("is-hidden");
  loginView.classList.remove("is-hidden");

  loginForm.reset();
  limpiarErroresLogin();
  mostrarSeccion("inicio");
  cargarUsuarioRecordado();
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
  mostrarModal(
    "error",
    "Datos incompletos",
    "Revisa los campos indicados."
  );

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
mostrarModal(
  "success",
  "Cliente registrado",
  "Cliente registrado correctamente."
);
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
mostrarModal(
  "success",
  "Cliente actualizado",
  "Cliente actualizado correctamente."
);
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
  clienteNombre.focus();
}

function eliminarCliente(id) {
  const cliente = clientes.find((item) => item.id === id);

  
  if (!cliente || !window.confirm(`¿Deseas eliminar a ${cliente.nombre}?`)) return;

  mostrarConfirmacion(
    "Eliminar cliente",
    `¿Deseas eliminar a ${cliente.nombre}?`,
    () => {
      clientes = clientes.filter((item) => item.id !== id);

      guardarEnLocalStorage(CLAVE_CLIENTES, clientes);
      renderizarClientes();
      actualizarResumen();

      if (clienteEnEdicion === id) {
        limpiarFormularioCliente();
      }

      mostrarModal(
        "success",
        "Cliente eliminado",
        "El cliente fue eliminado correctamente."
      );
    }
  );
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
    mostrarModal(
      "error",
      "Datos incompletos",
      "Revisa los campos indicados."
    );
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
    mostrarModal(
      "success",
      "Producto registrado",
      "Producto registrado correctamente."
    );
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
mostrarModal(
  "success",
  "Producto actualizado",
  "Producto actualizado correctamente."
);
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
  productoNombre.focus();
}

function eliminarProducto(id) {
  const producto = productos.find((p) => p.id === id);
  if (!producto || !window.confirm(`¿Deseas eliminar ${producto.nombre}?`)) return;


  if (!producto) {
    return;
  }

  mostrarConfirmacion(
    "Eliminar producto",
    `¿Deseas eliminar el producto ${producto.nombre}?`,
    () => {
      productos = productos.filter((item) => item.id !== id);


      guardarEnLocalStorage(CLAVE_PRODUCTOS, productos);
      renderizarProductos();
      actualizarResumen();

      if (productoEnEdicion === id) {
        limpiarFormularioProducto();
      }

      mostrarModal(
        "success",
        "Producto eliminado",
        "El producto fue eliminado correctamente."
      );
    }
  );
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
mostrarModal(
  "error",
  "Datos incompletos",
  "Revisa los campos indicados."
);
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
        mostrarModal(
  "success",
  "Proveedor registrado",
  "Proveedor registrado correctamente."
);
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
mostrarModal(
  "success",
  "Proveedor actualizado",
  "Proveedor actualizado correctamente."
);
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
  proveedorEmpresa.focus();
}

function eliminarProveedor(id) {
  const proveedor = proveedores.find((p) => p.id === id);
  if (!proveedor || !window.confirm(`¿Deseas eliminar a ${proveedor.empresa}?`)) return;


  if (!proveedor) {
    return;
  }

  mostrarConfirmacion(
    "Eliminar proveedor",
    `¿Deseas eliminar al proveedor ${proveedor.empresa}?`,
    () => {
      proveedores = proveedores.filter((item) => item.id !== id);


      guardarEnLocalStorage(CLAVE_PROVEEDORES, proveedores);
      renderizarProveedores();
      actualizarResumen();

      if (proveedorEnEdicion === id) {
        limpiarFormularioProveedor();
      }

      mostrarModal(
        "success",
        "Proveedor eliminado",
        "El proveedor fue eliminado correctamente."
      );
    }
  );
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

// 12. Gestión del tema (claro / oscuro)
function aplicarTema(tema) {
  const cuerpo = document.body;
  const esOscuro = tema === "oscuro";

  cuerpo.classList.toggle("theme-dark", esOscuro);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(esOscuro));
    themeToggle.setAttribute(
      "aria-label",
      esOscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
  }
}

function inicializarTema() {
  let tema = localStorage.getItem(CLAVE_TEMA);

  if (!tema) {
    tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "oscuro"
      : "claro";
  }

  aplicarTema(tema);
}

function alternarTema() {
  const esOscuro = document.body.classList.contains("theme-dark");
  const nuevoTema = esOscuro ? "claro" : "oscuro";

  aplicarTema(nuevoTema);
  localStorage.setItem(CLAVE_TEMA, nuevoTema);
}

// 13. Listeners de eventos
function registrarEventos() {
  if (loginForm) loginForm.addEventListener("submit", procesarLogin);
  if (themeToggle) themeToggle.addEventListener("click", alternarTema);

  // Eventos del Logout y Modal
  if (logoutButton) logoutButton.addEventListener("click", abrirModalLogout);
  if (cancelLogout) cancelLogout.addEventListener("click", cerrarModalLogout);
  if (confirmLogout) confirmLogout.addEventListener("click", procesarCerrarSesion);

  loginForm.addEventListener("submit", procesarLogin);
  logoutButton.addEventListener("click", () => {
    cerrarMenuUsuario();
    cerrarSesion();
  });
  avatarButton.addEventListener("click", alternarMenuUsuario);
  userDropdown.addEventListener("click", (evento) => evento.stopPropagation());
  profileOption.addEventListener("click", abrirPerfil);
  profileClose.addEventListener("click", cerrarPerfil);
  profileModal.addEventListener("click", (evento) => {
    if (evento.target === profileModal) {
      cerrarPerfil();
    }
  });
  document.addEventListener("click", (evento) => {
    if (!userDropdown.contains(evento.target) && evento.target !== avatarButton) {
      cerrarMenuUsuario();
    }
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarMenuUsuario();
      cerrarPerfil();
    }
  });
  themeToggle.addEventListener("click", alternarTema);
  
  modalClose.addEventListener("click", () => {
    cerrarModal();
  });

  modalCancel.addEventListener("click", () => {
    cerrarModal();
  });

  modalConfirm.addEventListener("click", () => {
    const accion = accionModalPendiente;

    cerrarModal();

    if (typeof accion === "function") {
      accion();
    }
  });

  systemModal.addEventListener("cancel", (evento) => {
    evento.preventDefault();
    cerrarModal();
  });

  botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", () => {
      mostrarSeccion(boton.dataset.section);
    });
  });

  clienteForm.addEventListener("submit", guardarCliente);

  clienteCancel.addEventListener("click", () => {
    limpiarFormularioCliente();

    mostrarModal(
      "info",
      "Edición cancelada",
      "La edición del cliente fue cancelada."
    );
  });

  clientesTableBody.addEventListener("click", (evento) => {
    procesarAccionTabla(evento, "cliente");
  });

  productoForm.addEventListener("submit", guardarProducto);

  productoCancel.addEventListener("click", () => {
    limpiarFormularioProducto();

    mostrarModal(
      "info",
      "Edición cancelada",
      "La edición del producto fue cancelada."
    );
  });

  productosTableBody.addEventListener("click", (evento) => {
    procesarAccionTabla(evento, "producto");
  });

  proveedorForm.addEventListener("submit", guardarProveedor);

  proveedorCancel.addEventListener("click", () => {
    limpiarFormularioProveedor();

    mostrarModal(
      "info",
      "Edición cancelada",
      "La edición del proveedor fue cancelada."
    );
  });

  proveedoresTableBody.addEventListener("click", (evento) => {
    procesarAccionTabla(evento, "proveedor");
  });

}

// 14. Inicialización
function inicializarApp() {
  clientes = leerArregloDeLocalStorage(CLAVE_CLIENTES);
  productos = leerArregloDeLocalStorage(CLAVE_PRODUCTOS);
  proveedores = leerArregloDeLocalStorage(CLAVE_PROVEEDORES);

  renderizarClientes();
  renderizarProductos();
  renderizarProveedores();
  actualizarResumen();
  cargarUsuarioRecordado();

  const sesionActiva = localStorage.getItem(CLAVE_SESION_ACTIVA) === "true";
  if (sesionActiva) {
    loginView.classList.add("is-hidden");
    dashboardView.classList.remove("is-hidden");
    mostrarSeccion("inicio");
  }

  inicializarTema();
  registrarEventos();
}

document.addEventListener("DOMContentLoaded", inicializarApp);
