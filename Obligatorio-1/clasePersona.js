class Persona {// Clase Persona con su constructor.
  constructor(pCedula, pNombre, pApellido, pNombreUsuario, pContrasenia) {
    this.cedula = pCedula;
    this.nombre = pNombre;
    this.apellido = pApellido;
    this.nombreUsuario = pNombreUsuario;
    this.contrasenia = pContrasenia;
  }

  obtenerNombreYApellido() {
    let personaParaMostrar = this.nombre + " " + this.apellido;
    return personaParaMostrar;
  }
}

class Solicitud{//Clase Solicitud con su constructor.
  constructor(pVehiculo, pDistancia, pDescripcion, pFoto, pPersona, pEmpresa, pId) {
    this.vehiculo = pVehiculo;
    this.distancia = pDistancia;
    this.descripcion = pDescripcion;
    this.foto = pFoto;
    this.persona = pPersona;
    this.estado = "1";
    this.id = pId;


    this.empresa = pEmpresa;

  }


  obtenerEstado(){// Método para obtener el estado de la solicitud
    let estadoParaMostrar='';
    if (this.estado == "1"){
      estadoParaMostrar = "Pendiente";
    } else if (this.estado == "2"){
      estadoParaMostrar = "En tránsito";
    }else{
      estadoParaMostrar = "Finalizado";
    }
    return estadoParaMostrar;
  }

  obtenerVehiculoSlicitud() {
    let vehiculoParaMostrar = '';
    let i = 0;
      while (!vehiculoParaMostrar && i < vehiculo.length) {
        let vehiculoActual = vehiculo[i];
        if (this.vehiculo == vehiculoActual.idVehiculo){
          vehiculoParaMostrar = vehiculoActual.vehiculo;
        }
        i++;
      }
      return vehiculoParaMostrar;
  }
  obtenerVehiculoSolicitud() {
    let vehiculoParaMostrar = '';
    let i = 0;
      while (!vehiculoParaMostrar && i < vehiculo.length) {
        let vehiculoActual = vehiculo[i];
        if (this.vehiculo == vehiculoActual.idVehiculo){
          vehiculoParaMostrar = vehiculoActual.vehiculo;
        }
        i++;
      }
      return vehiculoParaMostrar;
  }
  
  obtenerImagen() {
    let imagenParaDevolver = '';
  
    if (this.foto) {
        imagenParaDevolver = this.foto;
  
    }
    return imagenParaDevolver;
  }
  
  obtenerNombreYApellidoPersona() {
    let personaParaMostrar = '';
    let i = 0;
      while (!personaParaMostrar && i < persona.length) {
        let personaActual = persona[i];
        if (this.persona == personaActual){
          personaParaMostrar = personaActual.nombre + " " + personaActual.apellido;
        }
        i++;
      }
      return personaParaMostrar;
  }

  obtenerNombreEmpresa() {
    let empresaParaMostrar = '';
    let i = 0;
      while (!empresaParaMostrar && i < empresa.length) {
        let empresaActual = empresa[i];
        if (this.empresa == empresaActual){
          empresaParaMostrar = empresaActual.nombreUsuario;
        }
        i++;
      }
      return empresaParaMostrar;
  }
}

