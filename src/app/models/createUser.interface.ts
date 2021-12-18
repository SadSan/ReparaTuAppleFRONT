export interface CreateUserModel{
  cedula: string;
  nombre: string;
  apellido: string;
  codigo: string;
  fechanacimiento: string;
  id_rol: number;
  tipocontrato: string;
  correo: string;
  telefono: string;
  clave: string;
  id_estado: number;
}

export interface UpdateUserModel{
  idusuario: number,
  nombre: string,
  apellido: string,
  clave?: string,
  codigo: string,
  cedula: string,
  fechanacimiento: string,
  tipocontrato: string,
  correo: string,
  id_estado: number,
  id_rol: number,
  telefono: string
}
