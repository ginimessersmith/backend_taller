create table tallers (
	uid UUID primary key,
	nombre varchar(100) not null,
	direccion varchar(100) not null,
	correo varchar(100) not null,
	password_user varchar(100) not null,
	telefono integer not null,
	latitud double precision,
	longitud double precision	
);

create table personas(
	uid UUID primary key,
	nombre varchar(100) not null,
	correo varchar(100) not null,
	password_user varchar(100) not null,
	telefono integer,
	latitud double precision,
	longitud double precision,	
	disponibilidad_tecnico boolean not null,
	tipo_persona varchar(50) not null,
	uid_taller UUID references tallers(uid)
);

create table vehiculos(
	uid UUID primary key,
	marca varchar(100) not null,
	modelo varchar(100) not null,
	placa varchar(6) not null,
	year_vehiculo integer not null,
	img_url varchar(2000),
	uid_cliente UUID references personas(uid)
);

create table solicitad_asistencias(
	uid UUID primary key,
	fecha date not null,
	hora time not null,
	latitud double precision,
	longitud double precision,
	estado boolean,
	uid_taller UUID references tallers(uid),
	uid_cliente UUID references personas(uid),
	uid_vehiculo UUID references vehiculos(uid)
);

create table servicio_imgs(
	uid UUID primary key,
	img_url varchar(200) not null,
	uid_solicitud_asistencia UUID references solicitad_asistencias(uid)
);

create table servicios(
	uid UUID primary key,
	descripcion varchar(200) not null
);

create table servicios_solicitudes(
	uid_servicio UUID references servicios(uid),
	uid_solicitud_asistencia UUID references solicitad_asistencias(uid),
	primary key (uid_servicio,uid_solicitud_asistencia)
);

create table tecnico_asistencias(
	uid_tecnico UUID references personas(uid),
	uid_solicitud_asistencia UUID references solicitad_asistencias(uid),
	primary key (uid_tecnico,uid_solicitud_asistencia)
);


drop table servicos;

select * from personas;
select * from taller;