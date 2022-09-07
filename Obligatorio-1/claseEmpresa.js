class Empresa {//clase Empresa con su constructor y datos requeridos
  constructor(pRut,pRazonSocial,pNombreFantasia,pNombreUsuario,pContrasenia,pVehiculo) {
    this.rut = pRut;
    this.razonSocial = pRazonSocial;
    this.nombreFantasia = pNombreFantasia;
    this.nombreUsuario = pNombreUsuario;
    this.contrasenia = pContrasenia;
    this.vehiculo = pVehiculo;
    this.habilitado = false;
    this.buscado = false;
  }
  obtenerVehiculo() {// Método para obtener el vehículo de la empresa.
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

  obtenerHabilitado(){// Método para obtener el estado de la empresa (habilitado/deshabilitado).
    let habilitadoParaMostrar='';
    if (this.habilitado){
      habilitadoParaMostrar = "Habilitada";
    }else{
      habilitadoParaMostrar = "Deshabilitada";
    }
    return habilitadoParaMostrar;
  }
}

class Vehiculo {// clase Veículo con su constructor
  constructor(pTipoVehiculo, pIdVehiculo) {
    this.vehiculo = pTipoVehiculo;
    this.idVehiculo = pIdVehiculo;
  }
}
