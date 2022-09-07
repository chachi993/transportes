// VALIDACIONES REGISTRO Y LOGIN

function Validarcontrasenia(contra1, contra2) { //función para validar contraseña
  let mensaje = "<hr>";
  if (contra1 != contra2) { //Se verifica que las 2 contraseñas ingresadas sean iguales.
    mensaje += "<br>Las contraseñas no son iguales.";
  } else { //si son iguales valida lo demás
    if (contra1 == "") {
      mensaje += "<br>La contraseña está vacía."; //La contraseña no puede estar vacía.
    } else if (contra1.trim() == "") {
      mensaje += "<br>La contraseña no puede tener únicamente espacios."; //No puede tener solo espacios
    }
    if (contra1.length < 6) {
      mensaje += "<br>La contraseña debe tener un mínimo de 6 caracteres."; //Debe tener 6 o más caracteteres
    }
    if (contra1.toLowerCase() == contra1 || contra1.toUpperCase() == contra1) { //Debe haber minúsculas y mayusculas
      mensaje += "<br>La contraseña debe tener mayúsculas y minúsculas.";
    }
    if (!palabraTieneNum(contra1)){ //Llama a la función.
      mensaje += "<br>La contraseña debe tener un número."; //Debe tener por lo menos un número

    }
    
  }
  return mensaje;
}

function palabraTieneNum(palabra){ //Función que verifica si una palabra contiene un número
  let numEncontrado = false;
  let i = 0;
  while (!numEncontrado && i < palabra.length) { // Se recorre hasta que encuentre un número
    if (!isNaN(palabra[i])) {
      numEncontrado = true;
    }
    i++;
  }
  return numEncontrado;

}

function validarCi(cedula) { //Validar cédula.
  let mensaje = "<hr>";
  if (isNaN(cedula)) { //Deben ser todo números
    mensaje += "<br>La cedula deben ser dígitos numéricos";
  }
  if (cedula.length == "") { //No puede ser vacío
    mensaje += "<br> El campo de la cedula no puede estar vacío";
  }
  return mensaje;
}

function ValidarNombreApellido(nombre, apellido) { //Verificar que el nombre y apellido no sean vacíos
  let mensaje = "<hr>";
  if (nombre == "") {
    mensaje += "<br>El nombre está vacío";
  }
  if (apellido == "") {
    mensaje += "<br>El apellido está vacío";
  }
  return mensaje;
}

function validarNombreUsuario(usuario) { //Validar nombre usuario persona
  let mensaje = "<hr>";
  if (encontrarUsuarioPersona(usuario)) { //verificar que no exista
    mensaje += "<br>El nombre de usuario ya existe";
  }
  if (usuario == "") { //verificar que no esté vacío
    mensaje += "<br>El usuario está vacío";
  }
  return mensaje;
}

function validarRut(Rut) { //Validar nro de Rut
  let mensaje = "<hr>";
  if (isNaN(Rut)) { //Que sean números
    mensaje += "<br>La RUT deben ser dígitos numéricos";
  }
  if (Rut == "") { //Que no esté vacío
    mensaje += "<br> El campo del RUT está vacío";
  }
  return mensaje;
}
function validarNombreUsuarioEmpresa(usuario) { //Validar usuario empresa
  let mensaje = "<hr>";
  if (encontrarUsuarioEmpresa(usuario)) { //Verificar que el usuario no exista
    mensaje += "<br>El nombre de usuario ya existe";
  }
  if (usuario == "") { //que no esté vacío
    mensaje += "<br>El usuario está vacío";
  }

  return mensaje;
}
function ValidarRazonFantasia(nombre, apellido) { // Valida que no estén vacíos
  let mensaje = "<hr>";
  if (nombre == "") {
    mensaje += "<br>La Razón Social está vacía";
  }
  if (apellido == "") {
    mensaje += "<br>El Nombre Fantasía está vacío";
  }
  return mensaje;
}

function validarSelect (tipoVehiculo){ //Valida que se selccione un vehículo en el select
  let mensaje = "";
  if(tipoVehiculo == 0){ //El vehículo 0 no existe, el contador arranca de a 1
    mensaje += "<br> Debe seleccionar un vehiculo" 
  }
  return mensaje;
}



///////////////////////////////////////////////////////
//UTILIDADES Y FUNCIONES ESPECÍFICAS
///////////////////////////////////////////////////////


function existeUsuarioPorUsuarioYPassword(usuario, contrasenia) { //Verifica que exista un usuario personay la contraseña ingresada sea la correspondiente a este
  let existe = false;
  let i = 0;
  let nombreUsuarioEncontrado = false;
  while (!nombreUsuarioEncontrado && i < persona.length) { //Recorre mientras haya usuarios y no se encuentre el ingresado
    let usuarioGuardado = persona[i];
    if (usuario.toLowerCase() === usuarioGuardado.nombreUsuario.toLowerCase()) { //Si el usuario ingresado es el recorrido actual se marca como encontrado y se valida la comtraseña
      nombreUsuarioEncontrado = true;
      let contraseniaGuardada = usuarioGuardado.contrasenia;
      if (contrasenia === contraseniaGuardada) { //Si la contraseña es la contraseñna del usuario de esa persona entonces se devuelve que existe y corresponde
        existe = true;
      }
    }
    i++;
  }
  return existe;
}

function existeUsuarioPorUsuarioYPasswordEmpresa(usuario, contrasenia) { //Verifica que exista un usuario empresa y la contraseña ingresada sea la correspondiente a este
  let existe = false;
  let i = 0;
  let nombreUsuarioEncontrado = false;
  while (!nombreUsuarioEncontrado && i < empresa.length) { //Recorre mientras haya usuarios y no se encuentre el ingresado
    let usuarioGuardado = empresa[i];
    if (usuario.toLowerCase() === usuarioGuardado.nombreUsuario.toLowerCase()) { ////Si el usuario ingresado es el recorrido actual se marca como encontrado y se valida la comtraseña
      nombreUsuarioEncontrado = true;
      let contraseniaGuardada = usuarioGuardado.contrasenia;
      if (contrasenia === contraseniaGuardada) {
        existe = true;
      }
    }
    i++;
  }
  return existe;
}

function encontrarUsuarioPersona(usuario) { //devuelve todos los datos de la persona por el nombre de usuario
  let i = 0;
  let nombreUsuarioEncontrado = false;
  while (!nombreUsuarioEncontrado && i < persona.length) { //Recorre personas
    let usuarioGuardado = persona[i];
    if (usuario === usuarioGuardado.nombreUsuario) { //Si el usuario es igual al de la persona recorrida actual se devuelven todos los datos de la persona en un array
      nombreUsuarioEncontrado = true;
    }
    i++;
  }
  return nombreUsuarioEncontrado;
}

function encontrarUsuarioEmpresa(usuario) {//devuelve todos los datos de la empresa por el nombre de usuario
  let i = 0;
  let nombreUsuarioEncontrado = false;
  while (!nombreUsuarioEncontrado && i < empresa.length) {  //Recorre empresas
    let usuarioGuardado = empresa[i];
    if (usuario === usuarioGuardado.nombreUsuario) {//Si el usuario es igual al de la empresa recorrida actual se devuelven todos los datos de la empresa en un array
      nombreUsuarioEncontrado = true;
    }
    i++;
  }
  return nombreUsuarioEncontrado;
}



function existeUsuarioPorUsuarioYPasswordAdmin(usuario, contrasenia) { //Verifica que el admin tenga su contraseña adecuada
  let existe = false;
  //La función sirve si hay más de un usuario administrador, que en este caso no hay.
  let i = 0;
  let nombreUsuarioEncontrado = false;
  while (!nombreUsuarioEncontrado && i < administrador.length) { //recorre admin
    let usuarioGuardado = administrador[i];
    if (usuario === usuarioGuardado.nombre){ //Si usuario es el de admin corrobora que la contraseña sea la misma
      nombreUsuarioEncontrado = true;
      let contraseniaGuardada = usuarioGuardado.contrasenia;
      if (contrasenia === contraseniaGuardada) {
        existe = true;
      }
    }
    i++;
  }
  return existe;
}

function existeVehiculo(palabra) { //Verifica si el texto ingresado es uno de losvehiculos del array vehiculo.
  
  let i = 0;
  let palabraEncontrado = false;
  while (!palabraEncontrado && i < vehiculo.length) { //Recorre vehiculos
    let vehiculoActual = vehiculo[i];
    if (palabra == vehiculoActual.vehiculo) { //Si lo encuentra devuelve que ya existe = true
      palabraEncontrado = true;
    }
    i++;
  }
  return palabraEncontrado;
}

function cambiarEstadoEmpresa(empresa) { //La función le cambia el estado a una empresa. 
  
  let empresaEstaHabilitado = empresa.habilitado;
  
  if (empresaEstaHabilitado) { //Si la empresa está deshabilitada, la habilita
    empresa.habilitado = false;
  } else {
    empresa.habilitado = true; //Si la empresa está habilitada, la deshabilita
  }
  
}

function encontrarEmpresaPorUsuario(nombreUsuario) { //Busca una empresa por el usuario y devuelve los datos de esta
  let empresaEncontrada = null;             
  let i = 0;
  while (!empresaEncontrada && i < empresa.length) { //Recorre empresas
    let empresaActual = empresa[i];
    if (nombreUsuario == empresaActual.nombreUsuario) { //Si lo encuentra devuelve el array de la empresa encontrada
      empresaEncontrada = empresaActual;
    }
    i++;
  }
  return empresaEncontrada;
}

function encontrarPersonaPorUsuario(usuario) { //Busca una persona por el usuario y devuelve los datos de esta
  let personaEncontrada = null;
  let i = 0;
  while (!personaEncontrada && i < persona.length) { //Recorre personas
      let personaActual = persona[i];
      if (usuario == personaActual.nombreUsuario) { //Si lo encuentra devuelve el array de la persona encontrada
        personaEncontrada = personaActual;
      }
      i++;
  }
  return personaEncontrada;
}

function encontrarSolicitudPorId(id) { //Busca una solicitud por el ID
  let solicitudEncontrada = null;
  let i = 0;
  while (!solicitudEncontrada && i < solicitud.length) { //Recorre solicitudes
      let solicitudActual = solicitud[i];
      if (id == solicitudActual.id) { //Si la encuentra devueleve los datos de la solicitud
        solicitudEncontrada = solicitudActual;
      }
      i++;
  }
  return solicitudEncontrada;
}

function cambiarEstadoSolicitud(solicitud) { //Cambia estado solicitud

  if (solicitud.estado == "1") { //Si la solicitud está en pendiente (1 )se cambia a "en tránsito" (2), y "en tránsito" cambia a "finalizada" (3)
    solicitud.estado = "2";
  } else{
    solicitud.estado = "3";
  }

}





