// array asociados (clases)
let persona = [];
let empresa = [];
let administrador = [];
let vehiculo = [];
let solicitud = [];

// variables globales
let adminEstaLogeado = false;
let usuarioLogeado = false; //persona o empresa
let usuarioLogeadoArray = []
let IdVehiculo = 1;
let busquedaActiva = false;
let idSolicitud = 1;

inicializar(); //Se llama a la iniciación de las funciones basicas

// funciones básicas de uso de la aplicación
function inicializar() {
  precargarDatos();
  botones();
  selectVehiculos("selectRegistroEmpresa");
  selectVehiculos("selectSolicitudesEnvios");
  registrarAdmin();
  mostrarVehiculos();
  ocultarPantallas();
  document.querySelector("#txtNombreUsuarioELogin").value = "";
  document.querySelector("#txtContraseñaIngresoE").value = "";
}

function ocultarPantallas() { //Oculta pantallas
  document.querySelector("#RegistroYLogin").style.display = "none";
  document.querySelector("#formRegistroPersona").style.display = "none";
  document.querySelector("#formRegistroEmpresa").style.display = "none";
  document.querySelector("#divLogin").style.display = "none";
  document.querySelector("#pantallaAdmin").style.display = "none";
  document.querySelector("#pantallaEmpresa").style.display = "none";
  document.querySelector("#pantallaPersona").style.display = "none";
  document.querySelector("#adminlistadoempresas").style.display = "none";
  document.querySelector("#adminlistadotransporte").style.display = "none";
  document.querySelector("#adminInformacionEstadistica").style.display = "none";
  document.querySelector("#PersonaSolicitarEnvios").style.display = "none";
  document.querySelector("#PersonaListadoSolicitudes").style.display = "none";
  document.querySelector("#PersonaInformacionEstadistica").style.display = "none";
  document.querySelector("#PersonaListadoSolicitudes").style.display = "none";
  document.querySelector("#EmpresaslistadoSolicitudes").style.display = "none";
  document.querySelector("#EmpresaslistadoSolicitudesTomadas").style.display = "none";
  document.querySelector("#EmpresasInformacionEstadistica").style.display = "none";
  document.querySelector("#PersonaListadoSolicitudes").style.display = "none";
  if (!adminEstaLogeado && !usuarioLogeado) { //Oculta botón de cerrar sesión únicamente si no hay usuarios logueados
    document.querySelector("#btnCerrarSesion").style.display = "none";
    document.querySelector("#banner").style.display = "block";

  } 
  if (adminEstaLogeado || usuarioLogeado) { // Oculta los botones de login y registro cuando hay algún usuario logeado
    document.querySelector("#listaLoginYRegistroBotones").style.display = "none";
    document.querySelector("#banner").style.display = "none";

  }
}

function botones() { //Llama a funciones al presionar botones
  // REGISTRARSE
  document.querySelector("#btnRegistrarseP").addEventListener("click", formularioPersona);
  document.querySelector("#btnRegistrarseE").addEventListener("click", formularioEmpresa);
  document.querySelector("#btnRegistroEmpresa").addEventListener("click", mostrarRegistroEmpresa);
  document.querySelector("#btnRegistroPersona").addEventListener("click", mostrarRegistroPresona);
  //Login
  document.querySelector("#btnLogin").addEventListener("click", mostrarLogin);
  document.querySelector("#btnIngresarE").addEventListener("click", login);
  document.querySelector("#btnLoginP").addEventListener("click", mostrarLogin);
  document.querySelector("#btnLoginE").addEventListener("click", mostrarLogin);

  // Pantallas Admin
  document.querySelector("#btnAdminempresas").addEventListener("click", pantallaAdminHabilitarEmpresas);
  document.querySelector("#btnAniadirTransporte").addEventListener("click", pantallaAdminAniadirTransporte);
  document.querySelector("#btnVerEstadísticasAdmin").addEventListener("click", pantallaAdminEstadistica);
  document.querySelector("#btnAgregarVehiculo").addEventListener("click", AgregarVehiculoAdmin);
  document.querySelector("#btnBuscarEmpresa").addEventListener("click", buscarEmpresa);
  document.querySelector("#btNOBuscarEmpresa").addEventListener("click", eliminarBusqueda);

  //Pantallas persona
  document.querySelector("#btnSolicitarEnvio").addEventListener("click", pantallaPersonaSolicitar);
  document.querySelector("#btnListadoPedidosP").addEventListener("click", pantallaPersonaListado);
  document.querySelector("#btnVerEstadísticasPersona").addEventListener("click", pantallaPersonaEstadisticas);
  document.querySelector("#btnSolicitarEnvioFormulario").addEventListener("click", solicitarFormularioEnvio);

  //Pantallas EMPRESA
  document.querySelector("#btnSolicitudesE").addEventListener("click", pantallaEmpresaSolicitudes);
  document.querySelector("#btnListadoPedidosE").addEventListener("click", pantallaEmpresaPedidosTomados);
  document.querySelector("#btnVerEstadísticasEmpresa").addEventListener("click", pantallaEmpresaEstadisticas);
  document.querySelector("#btnSelectInfoEstadisticaEmpresa").addEventListener("click", selectEmpresaEstadisticas);

  //CERRAR SESION Y volver a inicio
  document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);
  document.querySelector("#btnVolverAInicio").addEventListener("click", cerrarSesion); //Este botón está en la interfaz de login y registro.
  
}

function cerrarSesion() { //Cierra el usuario logueado dejando la pantalla de inicio
  adminEstaLogeado = false;
  usuarioLogeado = false;
  usuarioLogeadoArray = [];
  
  document.querySelector("#listaLoginYRegistroBotones").style.display = "block";
  ocultarPantallas();
  document.querySelector("#txtNombreUsuarioELogin").value = ""; //
  document.querySelector("#txtContraseñaIngresoE").value = "";

}
//LOGIN

function mostrarLogin() { //Muestra la pantalla de login
  ocultarPantallas()
  document.querySelector("#RegistroYLogin").style.display = "block";
  document.querySelector("#divLogin").style.display = "block";
  document.querySelector("#listaLoginYRegistroBotones").style.display = "block";
  document.querySelector("#banner").style.display = "none";
  document.querySelector("#mensajeLoginEmpresa").innerHTML = "";

}

function login() { //Para iniciar sesion
  let mensaje = "";
  let nombreUsuario = document.querySelector("#txtNombreUsuarioELogin").value.trim(); //toma los datos del usuario
  let contrasenia = document.querySelector("#txtContraseñaIngresoE").value;

  if (existeUsuarioPorUsuarioYPasswordEmpresa(nombreUsuario, contrasenia)) { //Se fija si el usario es una empressa y si su contraseña es correcta
    let empresaEncontrada = encontrarEmpresaPorUsuario(nombreUsuario); ///Busca la empresa y la guarda en una variable
    if (!empresaEncontrada.habilitado){ //Valida  que la  empresa esté validada por el adminnistrador
      mensaje = "La empresa no está habilitada";
    } else{
      usuarioLogeado = true; //Si los datos están bien y la empresa está habilitada. La variable glogal usuariologueado se pone en tru para detrminar que hay algiuien logueado
      usuarioLogeadoArray = empresaEncontrada //El usuario logeado (variable global) se carga con los datos de la empresa logueada
      mostrarPantallaEmpresa(); //Se muestra la interfaz de la empresa
    }
  } else if (existeUsuarioPorUsuarioYPasswordAdmin(nombreUsuario, contrasenia)) { //Si no es empresa, determina si es administrador
    adminEstaLogeado = true;
    mostrarPantallaAdmin();//Si los datos del admin son correctos, se cambia a true la variable global: adminestaLogeado y se muestra la interfaz del administrador

  } else if (existeUsuarioPorUsuarioYPassword(nombreUsuario, contrasenia)) { //Se fija si los datos son de una persona.
    usuarioLogeadoArray = encontrarPersonaPorUsuario(nombreUsuario); //Busca persona ingresada para pasarle los datos a variable
    usuarioLogeado = true;
    mostrarPantallaPersona(); //Muestra las pantallas de la persona
  } else {
    mensaje = "Usuario o contraseña no válido";
  }
  document.querySelector("#mensajeLoginEmpresa").innerHTML = mensaje;
}

//PRECARGAR DATOS Y REGISTRAR DATOS

function precargarDatos() {
  //Precarga datos personas
  registrarPersona("51301233", "Florencia", "Villar", "flopi_villar", "123Florencia");
  registrarPersona("12345678", "Sabrina", "Taramasco", "Chachi", "HolaMundo1");
  registrarPersona("12836273", "Esteban", "Machado", "Esteban", "Esteban1");
  registrarPersona("12836273", "Bruno", "Diaz", "Bruno", "123Bruno");
//registro de vehiculos
  registrarVehiculo("Moto");
  registrarVehiculo("Camioneta");
  registrarVehiculo("Camión");
  
  //registro de empresas
  registrarEmpresa("123456789012", "Vehiculos", "Vehiculos Geniales", "VehiGen", "VehiGen1", "2"); //0
  registrarEmpresa("123456789014", "Fantasticos", "Vehiculos Fantasticos", "VehiFan", "VehiFan1", "1");//1
  registrarEmpresa("123456789015", "Mejores", "Los Mejores", "Mejorcitos", "Mejorcitos1","3");//2
  registrarEmpresa("123456789765", "Muchos Kilometros", "Kilometros Muchos", "MuchosKm", "MuchosKm1", "2");
  registrarEmpresa("123457659014", "Rapidos", "Rapiditos", "Rapiditos", "Rapiditos1", "1");

  cambiarEstadoEmpresa(empresa[0]); //Habilitamos las empresas
  cambiarEstadoEmpresa(empresa[1]);
  cambiarEstadoEmpresa(empresa[2]);

//precarga solicitudes
  precargarSolicitud("1", 12, "caja", "caja.png", 0, 1); //0
  cambiarEstadoSolicitud(solicitud[0]); //Cada vez que se llama la función la solicitud cambia al estado siguiente.
  cambiarEstadoSolicitud(solicitud[0]);

  precargarSolicitud("2", 80, "pelota", "pelota.jpeg", 1, 0); //1
  cambiarEstadoSolicitud(solicitud[1]);
  cambiarEstadoSolicitud(solicitud[1]);
  precargarSolicitud("2", 35, "sabanas", "sabanas.jpg", 0, 0); //2
  cambiarEstadoSolicitud(solicitud[2]);
  cambiarEstadoSolicitud(solicitud[2]);

  precargarSolicitud("3", 12, "reloj", "reloj.gif", 0, 2); //3
  cambiarEstadoSolicitud(solicitud[3]);
  
  precargarSolicitud("2", 70, "computadora", "computadora.png", 0, 0); //4
  cambiarEstadoSolicitud(solicitud[4]);

  precargarSolicitud("3", 30, "silla", "silla.jpeg", 2, 2); //5
  cambiarEstadoSolicitud(solicitud[5]);

  precargarSolicitud("3", 12, "reloj", "reloj.gif", 0, null); //6
  precargarSolicitud("2", 15, "monitor", "computadora.png", 0, null); //7
  precargarSolicitud("1", 39, "silla", "silla.jpeg", 2, null); //8
  
}

// FUNCIONES REGISTRAR

function registrarPersona(pCedula,pNombre,pApellido,pNombreUsuario,pContrasenia) { 
  let nuevaPersona = new Persona(pCedula,pNombre,pApellido,pNombreUsuario,pContrasenia);
  persona.push(nuevaPersona);
}
function registrarVehiculo(pVehiculo) {
  let nuevoVehiculo = new Vehiculo(pVehiculo, IdVehiculo);
  vehiculo.push(nuevoVehiculo);
  IdVehiculo += 1;
}
function registrarSolicitud(pVehiculo, pDistancia, pDescripcion, pFoto) { //Al registrar la solicitud hay menos datos que al precargarla por lo tanto tenemos funciones distintas
  let nuevaSolicitud = new Solicitud (pVehiculo, pDistancia,pDescripcion,pFoto, usuarioLogeadoArray, null, idSolicitud);
  solicitud.push(nuevaSolicitud);
  idSolicitud++;
}
function precargarSolicitud(pVehiculo, pDistancia, pDescripcion, pFoto, pPersona, pEmpresa) {
  let nuevaSolicitud = new Solicitud (pVehiculo, pDistancia,pDescripcion,pFoto, persona[pPersona],empresa[pEmpresa],idSolicitud);
  solicitud.push(nuevaSolicitud);
  idSolicitud++;

}

function registrarAdmin() { //Hay uno solo
  let nuevoAdmin = new Admin("Admin", "Admin01");
  administrador.push(nuevoAdmin);
}
//registra empresa con los datos que se le pasan 
function registrarEmpresa(pRut,pRazonSocial,pNombreFantasia,pNombreUsuario,pContrasenia,pVehiculo) {
  let nuevaEmpresa = new Empresa(pRut,pRazonSocial,pNombreFantasia,pNombreUsuario,pContrasenia,pVehiculo);
  empresa.push(nuevaEmpresa);
}

// MOSTARR PANTALLAS REGISTRO 

function mostrarRegistroEmpresa() {
  ocultarPantallas()
  document.querySelector("#RegistroYLogin").style.display = "block";
  document.querySelector("#formRegistroEmpresa").style.display = "block";
  document.querySelector("#listaLoginYRegistroBotones").style.display = "block";
  document.querySelector("#banner").style.display = "none";
  document.querySelector("#txtRut").value ="";
  document.querySelector("#txtRazon").value="";
  document.querySelector("#txtFantasia").value="";
  document.querySelector("#txtNombreUsuarioE").value="";
  document.querySelector("#txtContraseñaE").value="";
  document.querySelector("#txtContraseñaE2").value="";
  document.querySelector("#txtselectVehiculos").value="";

}
function mostrarRegistroPresona() {
  ocultarPantallas()
  document.querySelector("#RegistroYLogin").style.display = "block";
  document.querySelector("#formRegistroPersona").style.display = "block";
  document.querySelector("#listaLoginYRegistroBotones").style.display = "block";
  document.querySelector("#banner").style.display = "none";
  document.querySelector("#txtCedula").value=""; 
  document.querySelector("#txtNombre").value="";
  document.querySelector("#txtApellido").value="";
  document.querySelector("#txtNombreUsuarioPRegistro").value="";
  document.querySelector("#txtContraseñaP").value="";
  document.querySelector("#txtContraseñaP2").value="";
}

function mostrarPantallaAdmin() { //Muestra pantalla admin
  ocultarPantallas();
  document.querySelector("#btnCerrarSesion").style.display = "block";
  document.querySelector("#pantallaAdmin").style.display = "block";

}
function mostrarPantallaPersona() { //Muestra pantalla persona
  ocultarPantallas();
  document.querySelector("#pantallaPersona").style.display = "block";
  document.querySelector("#btnCerrarSesion").style.display = "block";
}
function mostrarPantallaEmpresa() { //muestra pantalla empresa
  ocultarPantallas();
  document.querySelector("#btnCerrarSesion").style.display = "block";
  document.querySelector("#pantallaEmpresa").style.display = "block";
}

//FORMULARIOS DE REGISTRO
//Para regustrar un usuario PERSONA
function formularioPersona() { 
  document.querySelector("#listaLoginYRegistroBotones").style.display = "block";
  document.querySelector("#banner").style.display = "none";

  let mensaje = "";
  let cedula = parseInt(document.querySelector("#txtCedula").value); //se toman datos del html.
  let nombre = document.querySelector("#txtNombre").value.trim();
  let apellido = document.querySelector("#txtApellido").value.trim();
  let nombreUsuario = document.querySelector("#txtNombreUsuarioPRegistro").value.trim();
  let contrasenia = document.querySelector("#txtContraseñaP").value;
  let contrasenia2 = document.querySelector("#txtContraseñaP2").value;

  mensaje += validarCi(cedula); //Se vsalidan los atos - funciones en validaciones
  mensaje += ValidarNombreApellido(nombre, apellido);
  mensaje += validarNombreUsuario(nombreUsuario);
  mensaje += Validarcontrasenia(contrasenia, contrasenia2);

  document.querySelector("#divRegistroUsuarioMensajes").innerHTML = mensaje;

  if (mensaje == "<hr><hr><hr><hr>") { //Los mensajes tienen lineas dentro.
    registrarPersona(cedula, nombre, apellido, nombreUsuario, contrasenia); //Si los datos son correctos se registra la persona
    document.querySelector("#divRegistroUsuarioMensajes").innerHTML =
      "El usuario se ingresó correctamente";
  }
}
//Para regustrar un usuario EMPRESA
function formularioEmpresa() {
  let mensaje = "";
  let Rut = document.querySelector("#txtRut").value; //SE buscan los datos en el html
  let RazonSocial = document.querySelector("#txtRazon").value.trim();
  let Fantasia = document.querySelector("#txtFantasia").value.trim();
  let nombreUsuario = document.querySelector("#txtNombreUsuarioE").value.trim();
  let contrasenia = document.querySelector("#txtContraseñaE").value;
  let contrasenia2 = document.querySelector("#txtContraseñaE2").value;
  let tipoVehiculo = document.querySelector("#txtselectVehiculos").value;
  //Se validan datos
  mensaje += validarRut(Rut);
  mensaje += ValidarRazonFantasia(RazonSocial, Fantasia);
  mensaje += validarNombreUsuarioEmpresa(nombreUsuario);
  mensaje += Validarcontrasenia(contrasenia, contrasenia2);
  mensaje += validarSelect(tipoVehiculo);

  document.querySelector("#divRegistroEmpresaMensajes").innerHTML = mensaje;

  if (mensaje == "<hr><hr><hr><hr>") { //si no hay errores en el formulario se registra la empresa
    registrarEmpresa(Rut, RazonSocial, Fantasia, nombreUsuario, contrasenia, tipoVehiculo); //Se registra la empresa si los datos son correctos
    document.querySelector("#divRegistroEmpresaMensajes").innerHTML =
      "El empresa se ingresó correctamente";
  }
}

//MOSTRAR PANTALLAS DE EMPRESAS
// Se muestran las pantallas de empresas y sus funcionalidades


//La primer pantalla de solicitudes pendientes
function pantallaEmpresaSolicitudes() {
  ocultarPantallas()        //Oculta la pantalla abierta y muestra el listado de solicitudes pendientes
  document.querySelector("#pantallaEmpresa").style.display = "block";
  document.querySelector("#EmpresaslistadoSolicitudes").style.display = "block";
    actualizarListadoEmpresa ();
}

//Solicitudes pendientes con el vehículo de la empresa
function actualizarListadoEmpresa() {
  let tbodyHTML = ``;

  for (let i = 0; i < solicitud.length; i++) { //Recorremos las solicitudes.
    let solicitudActual = solicitud[i];       //nombramos los atributos de la solicitud actual.
    let idSolicitudActual = solicitudActual.id;
    let descripcionSolicitudActual = solicitudActual.descripcion;
    let fotoSolicitudActual = solicitudActual.obtenerImagen() ; //Esta función se encuentra dentro de la clase solicitud y es para mostrar la imagen asociada al objeto.
    let distanciaSolicitudActual = solicitudActual.distancia;
    let vehiculoSolicitudActual = solicitudActual.vehiculo;
    let vehiculoSolicitudActualParamostrar = solicitudActual.obtenerVehiculoSolicitud(); //Esta función muestra el nombre del vehículo ya que solo está asociado el id.
    let estadoSolicitudActual = solicitudActual.estado;
    let estadoSolicitudActualParaMostrar = solicitudActual.obtenerEstado(); // Obtiene el nombre del estado a partir de un id.
    
    let personaSolicitudActual = solicitudActual.obtenerNombreYApellidoPersona(); //Obtiene el nombre y  el apellido de la persona que realiza la solicitud.


    if (estadoSolicitudActual== "1" && vehiculoSolicitudActual == usuarioLogeadoArray.vehiculo){ //Solo muestra en la tabla las solicitudes pendientes que tengan el mismo vehículo que la empresa que está logueada.
     tbodyHTML += `<tr></tr>
      <td>${descripcionSolicitudActual}</td>
      <td><img  class = "fotosProducto" src="fotos/${fotoSolicitudActual}" height = "1" ></td>
      <td>${distanciaSolicitudActual}</td>
      <td>${vehiculoSolicitudActualParamostrar}</td>
      <td>${personaSolicitudActual}</td>
      <td>${estadoSolicitudActualParaMostrar}</td>
      <td><input solicitudactual ="${idSolicitudActual}" class="btnCambiarEstadoSolicitud" type="button" value="TOMAR"></td> 
      </tr>`;
    }//El botón tiene el ID de la solicitud que es específico del botón y una clase que tienen todos los botones de la lista
  }

  document.querySelector("#tablaSolicitudesPendientesEmpresa").innerHTML = tbodyHTML; //Se muestra la tabla.
  let botonesDeLaTabla = document.querySelectorAll(".btnCambiarEstadoSolicitud"); // la variable tiene los botones de la tabla ya que todos tienen la misma clase.
  for (let i = 0; i < botonesDeLaTabla.length; i++) { // Se recorre los botones de la tabla
    let botonActual = botonesDeLaTabla[i]; 
    botonActual.addEventListener("click", btncambiarEstadoSolicitud); // si se selecciona el botón actual va a la tabla.
  }
}
function btncambiarEstadoSolicitud() { 
  let nombreSolicitudDeBotonClickeado = this.getAttribute("solicitudactual"); // se obtiene el atributo del botón presionado
  let solicitudDeBotonClickeado = encontrarSolicitudPorId(nombreSolicitudDeBotonClickeado); // A partir del Id (que es el atributo del botón) se encuentra la solicitud.
  solicitudDeBotonClickeado.empresa = usuarioLogeadoArray; // Se le asigna una empresa a la solicitud encontrada
  cambiarEstadoSolicitud(solicitudDeBotonClickeado); //Se le cambia el estado al siguiente a la solicitud encontrada.
  actualizarListadoEmpresa(); //Se actualizan tablas de la mepresa
  actualizarTablaPedidosTomadosEmpresa();
}


//Muestra la pantalla de los pedidos asignados a la empresa
function pantallaEmpresaPedidosTomados() {
  ocultarPantallas()
  document.querySelector("#pantallaEmpresa").style.display = "block";
  document.querySelector("#EmpresaslistadoSolicitudesTomadas").style.display = "block";
  actualizarTablaPedidosTomadosEmpresa();
}

function actualizarTablaPedidosTomadosEmpresa(){
  let tbodyHTML = ``;

    for (let i = 0; i < solicitud.length; i++) { //Se recorren las solicitudes

    let solicitudActual = solicitud[i];  
    let descripcionSolicitudActual = solicitudActual.descripcion;
    let fotoSolicitudActual = solicitudActual.obtenerImagen() ; //Muestra la imágen de la solicitud
    let distanciaSolicitudActual = solicitudActual.distancia;
    let vehiculoSolicitudActualParamostrar = solicitudActual.obtenerVehiculoSolicitud(); //Obtiene un vehiculo de la solicitud a partir de la id
    let estadoSolicitudActualParaMostrar = solicitudActual.obtenerEstado(); //Obtiene estado solicitud a partir de un id
    let empresaSolicitudActual = solicitudActual.empresa;
    let idSolicitudActual = solicitudActual.id;
    let personaSolicitudActual = solicitudActual.obtenerNombreYApellidoPersona(); //Obtiene el nombre y apellido de la persona asociada a la solicitud

    let textoParaAcciones = "FINALIZADA"; 
    if (solicitudActual.estado  == 2) { //Si la solicitud a mostrar ya está finalizada se mostrará un texto pero sino se mostrará un botón para poder finalizarla
      textoParaAcciones = `<input solicitudactual ="${idSolicitudActual}" class="btnCambiarEstadoSolicitudTomada" type="button" value="FINALIZAR">`;
    }

    if (empresaSolicitudActual == usuarioLogeadoArray){ //Muestra solo solicitudes asociados a la empresa
    tbodyHTML += `<tr></tr>
      <td>${descripcionSolicitudActual}</td>
      <td><img  class = "fotosProducto" src="fotos/${fotoSolicitudActual}" height = "1" ></td>
      <td>${distanciaSolicitudActual}</td>
      <td>${vehiculoSolicitudActualParamostrar}</td>
      <td>${personaSolicitudActual}</td>
      <td>${estadoSolicitudActualParaMostrar}</td>
      <td>${textoParaAcciones}</td>
      </tr>`;
    }
  }
  
  document.querySelector("#tablaSolicitudesTomadasEmpresa").innerHTML = tbodyHTML; //muestra la tabla
  let botonesDeLaTabla = document.querySelectorAll(".btnCambiarEstadoSolicitudTomada"); //variable con todos los botones
  for (let i = 0; i < botonesDeLaTabla.length; i++) { //Recorrida botones
    let botonActual = botonesDeLaTabla[i];
    botonActual.addEventListener("click", btncambiarEstadoSolicitud); //cuando se apreta un botón llama a la función
  }
}

//Pantallas de información estadística de la empresa
function pantallaEmpresaEstadisticas() { //Se ocultan pantallas y muestra la información estadística
  ocultarPantallas();
  document.querySelector("#pantallaEmpresa").style.display = "block";
  document.querySelector("#EmpresasInformacionEstadistica").style.display = "block";
  actualizarEmpresaEstadistica();
}
function actualizarEmpresaEstadistica() { //Primera parte info estadística
  let estadisticas = ``;

  let personaConMasEnvios = obtenerPersonaConMasEnvios(); //La función devuelve un array con la persona con más envíos en la primera posición y la cantidad de envíos en la segunda
  let nombrePersonaMasEnvios = personaConMasEnvios[0]; //Obtenemos el primer array de la función
  let cantidadPersonaMasEnvios = personaConMasEnvios[1]; //Obtenemos  el segundo array de la función

  if (cantidadPersonaMasEnvios>0){  //Si hay personas con envíos en la empresa se muestran sus nombre.
    estadisticas = "La persona que tiene más envíos es: "+ nombrePersonaMasEnvios  + ".<br>";
    
    estadisticas += "Tiene "+ cantidadPersonaMasEnvios +" envíos con la empresa" + ".<br>";
  } else {
    estadisticas = "No hay envíos con la empresa."
  }

  document.querySelector("#divInformacionEstadisticaEmpresa").innerHTML = estadisticas;
}

function obtenerPersonaConMasEnvios() {
  let personaConMasEnvios = []; //Variable para cargar los datos de la persona con más envíos
  let mayorCantidadDeEnviosEncontrados = Number.NEGATIVE_INFINITY; 


  for (let i = 0; i < persona.length; i++) { //Se recorren las personas 
      let cantidadEnviosPersona = 0; //Se crea un contador para esta persona
      let personaActual = persona[i];

      for (let a = 0; a < solicitud.length; a++){ //Se recorren las solicitudes
        let solicitudActual = solicitud[a];
        if (solicitudActual.empresa == usuarioLogeadoArray ){ //Si la solicitud actual es del usuario se suma al contador
          if (solicitudActual.persona == personaActual){
            cantidadEnviosPersona += 1;
          }
        }
      }
    if (cantidadEnviosPersona > mayorCantidadDeEnviosEncontrados) { // Si el contador es el mayor, el nombre y apellido de la persona serán los datos del array
      mayorCantidadDeEnviosEncontrados = cantidadEnviosPersona;
      personaConMasEnvios = [personaActual.obtenerNombreYApellido()]; //Se devuelve el nombre y el apellido de la persona
    } else if (cantidadEnviosPersona == mayorCantidadDeEnviosEncontrados){ //Si los datos son iguales a otro contador se pushea otro usuario al array.
      personaConMasEnvios.push(personaActual.obtenerNombreYApellido()); //Se devuelve el nombre y apellido de LAS PERSONASS en el array
    }
     
  }
  
  return [personaConMasEnvios, mayorCantidadDeEnviosEncontrados];
}

function selectEmpresaEstadisticas(){ //Segunda parte de la info estadística select
  let selectInfoEstadistica = document.querySelector("#selectInfoEstadisticaEmpresa").value;
  let mensaje = ""

    switch (selectInfoEstadistica){ //se muestran según lo selccionado del desplegable
      case "0":
        mensaje = "Seleccione un tipo de estado del desplegable";
      break;
      case "1":
        mensaje = "Tiene "+mostrarSolicitudesSegunEstado(2) +  " solicitud/es en tránsito"; // Se obtiene el estado del número de la variable que se le pasa (1= pendiente, 2 = en tránsito, 3=finalizada)
      break;
      case "2":
        mensaje = "Tiene "+mostrarSolicitudesSegunEstado(3) +  " solicitud/es finalizadas";
      break;

    }
    document.querySelector("#divSelectInfoEmpresa").innerHTML = mensaje;
}


function mostrarSolicitudesSegunEstado(num){  //Se buscan las solicitudes del estado que se le pasa. 
  let contadorSolicitudes = 0;

  for (let i = 0; i < solicitud.length; i++){ //Recorren solicitudes
    let solicitudActual = solicitud[i];
    if (solicitudActual.empresa == usuarioLogeadoArray ){ //Si la solucitud es de la empresa logueada y tiene el estado que se le pasó a la función, el contador se le suma 1
      if (solicitudActual.estado == num){
        contadorSolicitudes +=1;
      }
    }
  }
  return contadorSolicitudes; //Se devuelve la cantidad de solicitudes en el estado pasado de la empresa logueada
}

//MOSTRAR PANTALLAS DE PERSONA

//Formulario envío - perfil persona
function pantallaPersonaSolicitar() { // Muestra la pantalla en html de formulario de solicitud de envío
  ocultarPantallas()
  document.querySelector("#pantallaPersona").style.display = "block";
  document.querySelector("#PersonaSolicitarEnvios").style.display = "block";
  document.querySelector("#mensajeSolicitudesEnvios").innerHTML = "";
}

function solicitarFormularioEnvio(){ // Toma la solicitud
  let mensaje = "";
  let descripcionEnvio = document.querySelector("#txtDescripcionenvio").value; //carga los datos
  let distanciaEnvio = parseInt(document.querySelector("#txtDistanciaEnvio").value); //DEBE SER NÚMERO PARA USAR LUEGO EN INFO ESTADISTICA
  let vehiculoEnvio = document.querySelector("#txtselectVehiculosEnvios").value; 
  let fotoEnvio = document.querySelector("#imagenEnvio").value;
  if (fotoEnvio) {
    let posicionCaracterContrabarra = obtenerPosicionDeCaracter(fotoEnvio, "\\"); //Se obtiene el caracter para saber donde empieza el nombre de la foto
    fotoEnvio = cortarStringDesdeIndice(fotoEnvio, posicionCaracterContrabarra + 1); // Se corta el nombre del archivo para mostrar solo el nombre de la foto sino no se puede mostrar
  }    

  if (descripcionEnvio && distanciaEnvio && vehiculoEnvio > 0 && fotoEnvio){ //Si todos los datos son ingresados se registra la solicitud
    registrarSolicitud (vehiculoEnvio, distanciaEnvio, descripcionEnvio, fotoEnvio, usuarioLogeadoArray);
    mensaje = "Solicitud enviada.";
  } else {
    mensaje = "Todos los datos son obligatorios";
  }
  document.querySelector("#mensajeSolicitudesEnvios").innerHTML = mensaje;
}

function obtenerPosicionDeCaracter(texto, caracter) { //Busca el caracter dentro del texto y devuelve su posición 
  let resultado = "";
    for (let i =4; i < texto.length; i++){ //Recorre el texto
        if(texto[i].toLowerCase() === caracter){ //Cuando encuentra el caracter, devuelve su posición (variable resultado = la posición)
            resultado= i;
        }  
    }
    return resultado;
}

function cortarStringDesdeIndice(texto, posicion) { //Contra un texto desde la posición que se le indica
  let retorno = "";

  for (let i = posicion; i < texto.length; i++) { //Recorre el texto desde la posición pasada y devuelve las letras recorridas.
      retorno += texto[i];
  }

  return retorno;
}

//Listado de solicitudes de la persona - perfil persona
function pantallaPersonaListado() {
  ocultarPantallas()
  document.querySelector("#pantallaPersona").style.display = "block";
  document.querySelector("#PersonaListadoSolicitudes").style.display = "block";
  actualizarListadoPersona();
}

function actualizarListadoPersona() {
  let tbodyHTML = ``;


  for (let i = 0; i < solicitud.length; i++) { //Se recorren las solicitudes y se crean variable con los atributos
    let solicitudActual = solicitud[i];
    let descripcionSolicitudActual = solicitudActual.descripcion;
    let fotoSolicitudActual = solicitudActual.obtenerImagen() ; //Muestra la imagen
    let distanciaSolicitudActual = solicitudActual.distancia;
    let vehiculoSolicitudActual = solicitudActual.obtenerVehiculoSolicitud(); //Obtiene vehiculo por id
    let estadoSolicitudActual = solicitudActual.obtenerEstado(); //Obtiene estado por id
    let empresaSolicitudActual = solicitudActual.obtenerNombreEmpresa();  //obtiene el nombre de usuario de la empresa
    let personaSolicitudActual = solicitudActual.persona;

   if (personaSolicitudActual== usuarioLogeadoArray){ //Solo muestra solicitudes de la persona logueada
     tbodyHTML += `<tr></tr>
      <td>${descripcionSolicitudActual}</td>
      <td><img  class = "fotosProducto" src="fotos/${fotoSolicitudActual}" height = "1" ></td>
      <td>${distanciaSolicitudActual}</td>
      <td>${vehiculoSolicitudActual}</td>
      <td>${estadoSolicitudActual}</td>
      <td>${empresaSolicitudActual}</td>
      </tr>`;
   } 
  }
  document.querySelector("#tablaSolicitudesPersona").innerHTML=tbodyHTML;
}

// información estadística - perfil persona

function pantallaPersonaEstadisticas() {
  ocultarPantallas()
  document.querySelector("#pantallaPersona").style.display = "block";
  document.querySelector("#PersonaInformacionEstadistica").style.display = "block";
  actualizarPersonaEstadistica();
}

function actualizarPersonaEstadistica() { //Muestra la tabla de estadísticas de la empresa
  let estadisticas = ``;

  let solicitudesEstado = obtenerEnviosEnEstado1y2y3Persona(); //devuelve canridad de solicitudes en estado 1, 2 y 3 de la persona logueada (en posiciones 0,1,2)
  let solicitudesTomadas = solicitudesEstado[1] + solicitudesEstado[2]
  let solicitudesTotales = solicitudesEstado[0] + solicitudesEstado[1] + solicitudesEstado[2];

  let porcentajeEnTomados = Math.round(solicitudesTomadas *100 /solicitudesTotales); //Se redondea el porcentaje


  if (solicitudesEstado) { //Si hay solicitudes muestra las cantidades de cada tipo y el porcentaje de envíos tomados.
    estadisticas += "Cantidad de envíos pedientes: " + solicitudesEstado[0] + ".<br>"; 
    estadisticas += "Cantidad de envíos en tránsito: " + solicitudesEstado[1] + ".<br>";
    estadisticas += "Cantidad de envíos finalizados: " + solicitudesEstado[2] + ".<br> <br>";
    estadisticas += "Porcentaje de envíos tomados: " + porcentajeEnTomados + "%.<br>";
   
  }
  document.querySelector("#mensajeInformaciónEstadistica").innerHTML = estadisticas;
}

function obtenerEnviosEnEstado1y2y3Persona() { //Devuelve la cantidad de tipos de estado de envíos hechos por el usuario
  let enviosEstado1 = 0
  let enviosEstado2 = 0;
  let enviosEstado3 = 0;

  for (let i = 0; i < solicitud.length; i++) { //Se recorren solicitudes
      let solicitudActual = solicitud[i];
      let estadoSolicitudActual = solicitudActual.estado;
      let personaSolicitudActual = solicitudActual.persona;
      //Se suman a los contadores las solicitudes que pertenecen al usuario logueado.
      if (estadoSolicitudActual == 2 && personaSolicitudActual == usuarioLogeadoArray) {
          enviosEstado2 += 1; //Suma pendientes
      } else if (estadoSolicitudActual == 3 && personaSolicitudActual == usuarioLogeadoArray){
        enviosEstado3 += 1; //Suma en tránsito
      } else if (estadoSolicitudActual == 1 && personaSolicitudActual == usuarioLogeadoArray){
        enviosEstado1 += 1; //Suma finalizados
      }
  }
  return [enviosEstado1, enviosEstado2, enviosEstado3]; //Devuelve las 3 variables en un array
}

//PANTALLAS ADMIN

function pantallaAdminHabilitarEmpresas() { //Muestra la pantalla con el listado para habilitar empresas
  ocultarPantallas()
  document.querySelector("#pantallaAdmin").style.display = "block";
  document.querySelector("#adminlistadoempresas").style.display = "block";
  eliminarBusqueda(); //Elimina datos buscados anteriormente en la tabla
  document.querySelector("#mensajeBusqueda").innerHTML = "";
  actualizarTablaEmpresas();
}

function actualizarTablaEmpresas() { //Listado empresas
  let tbodyHTML = ``;

  for (let i = 0; i < empresa.length; i++) { //Recorre empresas y crea variables con atributos
    let empresaActual = empresa[i];
    let rutEmpresaActual = empresaActual.rut;
    let razonEmpresaActual = empresaActual.razonSocial;
    let fantasiaEmpresaActual = empresaActual.nombreFantasia
    let usuarioEmpresaActual = empresaActual.nombreUsuario;
    let vehiculoEmpresaActual = empresaActual.obtenerVehiculo(); //Obtiene vehículo según ID
    let habilitadoEmpresaActual = empresaActual.obtenerHabilitado(); //Obtiene estado según booleando
    let empresaBuscada = empresaActual.buscado; //Determina si la empresa está seiendo buscada en el buscador

    let textoParaBotonDeAcciones = "Habilitar"; // cambia el texto del botón según el estado de la empresa
    if (empresaActual.habilitado) {
      textoParaBotonDeAcciones = "Deshabilitar";
    }
    if (busquedaActiva) {   //En el caso de que se esté buscando algo en el buscador la tabla se actualizará con solo las empresas que estén siendo buscadas. 
      //Esto es un atributo que se cambia en la función buscarEmpresa
      if (empresaBuscada) { //Muestra solo las empresas que tengan el atributo "buscado" en true.
         tbodyHTML += `<tr></tr>
                    <td>${rutEmpresaActual}</td>
                    <td>${razonEmpresaActual}</td>
                    <td>${fantasiaEmpresaActual}</td>
                    <td>${usuarioEmpresaActual}</td>
                    <td>${vehiculoEmpresaActual}</td>
                    <td>${habilitadoEmpresaActual}</td>
                    <td><input usuarioempresa="${usuarioEmpresaActual}" class="btnCambiarEstadoEmpresa" type="button" value="${textoParaBotonDeAcciones}"></td> 
    </tr>`; 
      } //El id del botón es el nombre de usuario de la epresa bajo el atributo "usuarioempresa" todos los botones de la tabla comparten una clase
        //Si no hay búsquedas se muestran todas las empresas
    } else { //Si no hay busqueda activa se muestran todas las empresas
       tbodyHTML += `<tr></tr>
      <td>${rutEmpresaActual}</td>
      <td>${razonEmpresaActual}</td>
      <td>${fantasiaEmpresaActual}</td>
      <td>${usuarioEmpresaActual}</td>
      <td>${vehiculoEmpresaActual}</td>
      <td>${habilitadoEmpresaActual}</td>
      <td><input usuarioempresa="${usuarioEmpresaActual}" class="btnCambiarEstadoEmpresa" type="button" value="${textoParaBotonDeAcciones}"></td>
      </tr>`;
    }
  }

  document.querySelector("#tablaHabilitarEmpresas").innerHTML = tbodyHTML;
  let botonesDeLaTabla = document.querySelectorAll(".btnCambiarEstadoEmpresa"); //Variable con todos los botones
  for (let i = 0; i < botonesDeLaTabla.length; i++) {
    let botonActual = botonesDeLaTabla[i];
    botonActual.addEventListener("click", btnCambiarEstadoEmpresa); //Si se apreta el botón actual se llama a función para cambiar el estado de la empresa
  }
}

function btnCambiarEstadoEmpresa() {  
  let nombreUsuarioDeBotonClickeado = this.getAttribute("usuarioempresa"); //busca el atributo de usuarioempresa para determinar el id del botón actual
  let empresaDeBotonClickeado = encontrarEmpresaPorUsuario(nombreUsuarioDeBotonClickeado); //se encuentra la empresa clickeada
  cambiarEstadoEmpresa(empresaDeBotonClickeado); //Se cambia el estado
  actualizarTablaEmpresas();
}

//Buscador de empresas
function buscarEmpresa() {
  document.querySelector("#mensajeBusqueda").innerHTML = "";
  let mensaje = "";
  let textoParaBuscar = document.querySelector("#txtBuscarEmpresa").value;
  document.querySelector("#txtBuscarEmpresa").value= "";
  busquedaActiva = true; //Activa la búsqueda cambiando la variable global a true
  let busquedaTuvoResultados = false; //variable para detrminar si hay resultados de búsqueda


  for (let i = 0; i < empresa.length; i++) { //Recorre las empresas
    
    let empresaActual = empresa[i]
    let razonEmpresaActual = empresaActual.razonSocial;
    let fantasiaEmpresaActual = empresaActual.nombreFantasia;
    let razonEmpresaActualRecortada = encontrarBusqueda(razonEmpresaActual, textoParaBuscar).toLowerCase().trim();  //Acorta la razón social y el nombre de fantasía a la misma cantidad de letras que lo que se ingresó en el input a buscar.
    let fantasiaEmpresaActualRecortada = encontrarBusqueda(fantasiaEmpresaActual, textoParaBuscar).toLowerCase().trim();
    empresaActual.buscado = false; //Se inicia en estado false - solo se necesita este atributo al mostrar la tabla con búsqueda activa
    //Aquí se recorren las empresas y se marcan todas como false - luego se cambia si coincide la búsqueda
    //Para encontrar subcadena se acorta la razón social y la fantasía a la cantidad de letras de lo que se haya ingresado en la búsqueda

    if (textoParaBuscar.toLowerCase().trim() == razonEmpresaActualRecortada ) { //Compara razón con lo buscado y si coincide cambia el estado de búsqueda de la empresa
      empresaActual.buscado = true; //Se le cambia el atributo "buscado en la clase" para luego mostrarla en la tabla
      busquedaTuvoResultados = true; //Si hay resultados se cambia la variable

    } else if ( textoParaBuscar.toLowerCase().trim() == fantasiaEmpresaActualRecortada) { //si no coincide con razón busca con fantasía.
      empresaActual.buscado = true;
      busquedaTuvoResultados = true; //Si hay resultados se cambia la variable
    } 
  }
  if (!busquedaTuvoResultados){  
    mensaje = "No hay resultados que coincidan con la búsqueda"; 
    //Si la varibale "busquedaTuvoResultados" no fue cambiada es que no hay empresas que coincidan con la búsqueda, muestra mensaje
  }
  actualizarTablaEmpresas();
  document.querySelector("#mensajeBusqueda").innerHTML = mensaje;
}

function encontrarBusqueda(texto, busqueda){ //La palabra a coincidir se reduce a misma cantidad de letras que tiene la búsqueda.
  let resultado="";
    for (let i =0; i < busqueda.length;i++){ //Recorre texto hasta la cantidad de letras de la búsqueda
      resultado += texto[i]; //suma los caracteres recorridos (cantidad de caracteres de la búsqueda)
    }
  return resultado;
}

function eliminarBusqueda(){ //Se elimina la búsqueda para que la tabla vuelva a mostrar todo.
  busquedaActiva = false;
  actualizarTablaEmpresas();
  document.querySelector("#mensajeBusqueda").innerHTML = "";

}

function pantallaAdminAniadirTransporte() { // Se muestra la pantalla de vehículos
  ocultarPantallas()
  document.querySelector("#pantallaAdmin").style.display = "block";
  document.querySelector("#adminlistadotransporte").style.display = "block";
  document.querySelector("#mensajeAltaVehiculo").innerHTML = "";
  document.querySelector("#ingresarVehiculo").value = "";
}

function AgregarVehiculoAdmin() { //Función para agregar un vehiculo
  let vehiculo = document.querySelector("#ingresarVehiculo").value.trim(); //se toma el dato del vehiculo a ingresar
  document.querySelector("#ingresarVehiculo").value = "";
  if (existeVehiculo(vehiculo)) { //Se corrobora si ya existe el vehículo.
    AltaVehiculo = "El vehiculo ingresado ya existe."
  } else {
    AltaVehiculo = "El vehiculo ha sido ingresado."
    registrarVehiculo(vehiculo); //Se registra el vehículo.
    mostrarVehiculos(); //Se actualiza la tabla que muestra los vehículos.
    selectVehiculos("selectRegistroEmpresa"); //Se actualiza el select de registro de empresas.
    selectVehiculos("selectSolicitudesEnvios"); // Se actualiza el select de registro de solicitudes.

  }
  document.querySelector("#mensajeAltaVehiculo").innerHTML = AltaVehiculo;
}

function mostrarVehiculos() { //Muestra los vehículos existentes en la tabla de administrador
  let vehiculosParaMostrarEnHTML = "";

  if (vehiculo.length > 0) { //Pone head a la tabla de vehiculos
    vehiculosParaMostrarEnHTML = `
        <table border="1">
            <thead>
                <tr>
                    <th>Vehiculo</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (let i = 0; i < vehiculo.length; i++) { //Recorre el array asociativo vehiculo
      let vehiculoActual = vehiculo[i];
      //Muestra todos los vehiculos en la columna

      vehiculosParaMostrarEnHTML += ` 
      <tr>
       <td>${vehiculoActual.vehiculo}</td>
      </tr>
      `; 
    }
    vehiculosParaMostrarEnHTML += `
            </tbody>
        </table>
    `;
  } //cierra tabla
  document.querySelector("#tablaVehiculosAdmin").innerHTML = vehiculosParaMostrarEnHTML;
}

function pantallaAdminEstadistica() { //muestra pantalla de info estadística al presionar botón
  ocultarPantallas()
  document.querySelector("#pantallaAdmin").style.display = "block";
  document.querySelector("#adminInformacionEstadistica").style.display = "block";
  actualizarAdminEstadistica()
}

// Información estadística - TOTAL DE KILOMETROS RECORRIDOS POR EMPRESA

function actualizarAdminEstadistica(){
  let tbodyHTML = ``;
  let arrayKilometrosYEmpresas = kilometrosPorEmpresa(); //Llama a función y recibe 2 arrays uno con los nombres de las empresas y el segundo con sus km respectivos.
  let empresasPorKilometros = arrayKilometrosYEmpresas[0]; //Separamos los arrays
  let kilometrosPorEmpresas = arrayKilometrosYEmpresas[1];

  for (let i = 0; i < empresasPorKilometros.length; i++) { 
    //Recorre los arrays, sabemos que tienen el mismo largo y que las posiciones corresponen a ambos
    let empresaActual = empresasPorKilometros[i];
    let kilometroActual = kilometrosPorEmpresas[i]; 
   
    //Se muestra en tabla los datos de ambos arrays
    tbodyHTML += `<tr></tr>
    <td>${empresaActual}</td>
    <td>${kilometroActual}</td>
    </tr>`;
  }
  document.querySelector("#tablaAdminInformacionEstadistica").innerHTML = tbodyHTML;
}

function kilometrosPorEmpresa(){ //Función para debolver empresas y sus km.
  //Se definen 2 variables como arrays, uno para nombres de las empresas otro para los km recorridos
  let nombreEmpresas = []; 
  let kilometrosRecorridos = [];

  for (let i = 0; i < empresa.length; i++) { //Recorre las empresas cargadas.
    let kilometrosDeCadaEmpresa = 0; //se crea variable para suma los km de la empresa recorrida
    let empresaActual = empresa[i];
      for (let a = 0; a < solicitud.length; a++){ //Recorre las solicitudes
        let solicitudActual = solicitud[a];
        if (solicitudActual.empresa == empresaActual && solicitudActual.estado == "3"){ 
          //Si la solicitud está finalizada y es de la empresa que se está recorriendo se suma a un contador los km recorridos por esa empresa
          kilometrosDeCadaEmpresa += solicitudActual.distancia; 
        }
      }
      nombreEmpresas.push(empresaActual.nombreUsuario); 
      //En el primer array se pushea el nombre de usuario de la empresa y en el segundo sus km.
      kilometrosRecorridos.push(kilometrosDeCadaEmpresa);
  }
  return [nombreEmpresas, kilometrosRecorridos]; //Devuelve ambos arrays que corresponden el uno con el otro
}


// FUNCIONES DE SELECT VEHÍCULOS A VEHICULOS para formulario empresa y solicitud

function selectVehiculos(idHTML) { 
  //muestra el select con los vehiculos precargados y registrados por el admin en el formulario de registro empresa

  let vehiculosParaMostrarEnHTML = `
    <select id="txtselectVehiculosEnvios">
      <option value ="0">
        Seleccione un vehiculo...
      </option>
    `;
  for (let i = 0; i < vehiculo.length; i++) { //Recorre vehiculos
    let vehiculoActual = vehiculo[i];
          //Muestra el nombre del vehiculo en el desplegable y le da el value de su ID para usar cuando se selecciona
    vehiculosParaMostrarEnHTML += `
           <option value = "${vehiculoActual.idVehiculo}">
           ${vehiculoActual.vehiculo}
           </option>
    `;
  }
  //cierra etiqueta html
  vehiculosParaMostrarEnHTML += `
              </select>
      `;
  document.querySelector(`#${idHTML}`).innerHTML = vehiculosParaMostrarEnHTML;
}











