/* eslint-disable no-unused-vars */
'use strict';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection,SpellCheckingInspection,JSUnusedLocalSymbols
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query(
      `
            do $$
              begin
            
                insert into disabilities (name, active, created_at, updated_at, deleted_at)
                values ('sordera', false, now(), now(), null),
                       ('ceguera', true, now(), now(), null),
                       ('sindrome de down', true, now(), now(), null),
                       ('autismo', true, now(), now(), null),
                       ('amputacion', true, now(), now(), now())
                on conflict do nothing;
            
                insert into derivation_types (name, codes, active, created_at, updated_at, deleted_at)
                values 
                ('Hospital', 'ABC', true, now(), now(), null),
                ('Bomberos', 'ABC', true, now(), now(), null),
                ('Servicio de Orientacion Jurídica (SOJ) del Poder Judicial', 'ABC', true, now(), now(), null),
                ('Defensoría de los Derechos del Niñe y Adolescente', 'AB', true, now(), now(), null),
                ('Defensoría del Pueblo', 'C', true, now(), now(), null),
                ('Centro de Atencion a Victima del Delito (CAVD)', 'B', true, now(), now(), null),
                ('Dirección Gral. De Discapacidad y Atencion Especial del Ministerio de Desarrollo Social', 'B', true, now(), now(), null),
                ('Dirección de Adultos Mayores', 'BC', true, now(), now(), null),
                ('Dirección de Diversidad de la Subsecretaria de Derechos Humanos', 'C', true, now(), now(), null),
                ('Fiscalia', 'AB', true, now(), now(), null),
                ('Fortalecimiento Familiar', 'BC', true, now(), now(), null),
                ('INADI', 'C', true, now(), now(), null),
                ('Juzgado de Familia', 'AB', true, now(), now(), null),
                ('Linea 102 de Htal. Castro Rendón (maltrato y abuso sexual infantil)', 'AB', true, now(), now(), null),
                ('Linea 145 (Victimas de Trata)', 'AB', true, now(), now(), null),
                ('Oficina de Violencia (Poder Judicial)', 'AB', true, now(), now(), null),
                ('PAMI', 'C', true, now(), now(), null),
                ('Subsecretaría de Familia', 'AB', true, now(), now(), null),
                ('Subsecretaría de Discapacidad', 'C', true, now(), now(), null),
                ('Servicio de Prevención de Violencia Familiar (SPVF)', 'AB', true, now(), now(), null),
                ('Juzgado de Paz', 'C', true, now(), now(), null),
                ('Ruca Quimey (Asistencia para Victimas de Violencia Familiar)', 'ABC', true, now(), now(), null),
                ('Colegio de Abogados y Procuradores de Neuquén', 'C', true, now(), now(), null),
                ('Sien', 'AB', true, now(), now(), null),
                ('Equipo de asesoramiento personalizado', 'C', true, now(), now(), null),
                ('Consultorio para adolescentes Linea 148', 'C', true, now(), now(), null),
                ('Sin Derivación', 'C', true, now(), now(), null),
                ('Equipo de asesoramiento personalizado en sede', 'C', true, now(), now(), null),
                ('Equipo de asesoramiento personalizado movil', 'C', true, now(), now(), null),
                ('Centro de Salud', 'BC', true, now(), now(), null),
                ('Desarrollo Social equipo de sede', 'A', true, now(), now(), null),
                ('Defensorias Civiles', 'C', true, now(), now(), null),
                ('Juzgado Civil', 'C', true, now(), now(), null),
                ('Subsecretaria de Desarrollo Social y Derechos Humanos - Municipalidad de NQN', 'C', true, now(), now(), null),
                ('Guardia de Admisión (Desarrollo Social)', 'A', true, now(), now(), null),
                ('Guardia de la Mujer y Familia (Plottier)', 'B', true, now(), now(), null),
                ('Admisión', 'A', true, now(), now(), null),
                ('Policia', 'AB', true, now(), now(), null),
                ('Ministerio de Desarrollo Social (Admisión)', 'AB', true, now(), now(), null),
                ('Area municipal de Senillosa de Niñez, mujer y familia', 'BC', true, now(), now(), null),
                ('Dir. De Orientacion y atencion en violencias hacia personas con discapacidad-Desarrollo', 'B', true, now(), now(), null),
                ('Dir. Gral de Prevención de las Violencias (MSDS)', 'AB', true, now(), now(), null),
                ('Ayutún', 'BC', true, now(), now(), null),
                ('Refugio', 'A', true, now(), now(), null),
                ('Area Mujer Municipalidad de CutralCo', 'C', true, now(), now(), null),
                ('Escuela', 'BC', true, now(), now(), null),
                ('Mediación comunitaria', 'C', true, now(), now(), null),
                ('Guardia Juzgado', 'A', true, now(), now(), null),
                ('subsecretaria de trabajo', 'C', true, now(), now(), null),
                ('consejo provincial de educacion', 'BC', true, now(), now(), null),
                ('Asuntos Internos - Jefatura de Policia', 'BC', true, now(), now(), null),
                ('Oficina de Violencia Oeste', 'AB', true, now(), now(), null),
                ('Defensa Civil', 'C', true, now(), now(), null),
                ('Unidad de delitos informáticos', 'BC', true, now(), now(), null),
                ('Ministerio de Seguridad (Boton Antipanico)', 'AB', true, now(), now(), null),
                ('EAP Cutral CO', 'C', true, now(), now(), null),
                ('EAP ZAPALA', 'C', true, now(), now(), null),
                ('EAP Junin de los Andes', 'C', true, now(), now(), null),
                ('EAP Chos Malal', 'C', true, now(), now(), null),
                ('EAP Rincon de los sauces', 'C', true, now(), now(), null),
                ('Dispositivo de atencion a varones', 'ABC', true, now(), now(), null),
                ('Area de mujer y familia Plottier', 'BC', true, now(), now(), null),
                ('Grupos de Mujeres', 'BC', true, now(), now(), null),
                ('Desarrollo social - Abordaje Integral Zapala', 'C', true, now(), now(), null),
                ('Area psicosocial - Hospital Zapala', 'BC', true, now(), now(), null),
                ('Secretaria de ciudadania - Loncopue', 'C', true, now(), now(), null),
                ('Secretaria de Ciudadania - Zapala', 'C', true, now(), now(), null),
                ('subs. De niñez, adolescencia y personas adultas mayores', 'C', true, now(), now(), null),
                ('seguimiento', 'ABC', true, now(), now(), null),
                ('subsec. Acceso a la Justicia - Ciudadanía', 'BC', true, now(), now(), null)
                on conflict do nothing;
            
                insert into identification_types (name, active, created_at, updated_at, deleted_at)
                values ('documento nacional de identidad', true, now(), now(), null),
                       ('cedula civil', true, now(), now(), null),
                       ('libreta de enrolamiento', true, now(), now(), null),
                       ('libreta cívica', false, now(), now(), null),
                       ('a todo ritmo', true, now(), now(), now())
                on conflict do nothing;
            
                insert into users (email, password, rol, active, created_at, updated_at, deleted_at, username, first_name, last_name, identification_code, birth_date, failed_login_attempts, identification_type_id)
                values ('user@admin.com', '$2a$10$kA0g2RaPgtRVciMkbfhwqOTSJ2iMPtuCbu3RkQ5/bMyVSVTi20LI6', 'admin', true, now(), now(), null, 'useradmin', 'user', 'admin', '12345678', now(), 0, 1),
                       ('user@normal.com', '$2a$10$kA0g2RaPgtRVciMkbfhwqOTSJ2iMPtuCbu3RkQ5/bMyVSVTi20LI6', 'normal', true, now(), now(), null, 'usernormal', 'user', 'normal', '23456789', now(), 1, 2),
                       ('user@inactive.com', '$2a$10$kA0g2RaPgtRVciMkbfhwqOTSJ2iMPtuCbu3RkQ5/bMyVSVTi20LI6', 'normal', false, now(), now(), null, 'useradmin', 'user', 'admin', '34567890', now(), 3, 3),
                       ('user@deleted.com', '$2a$10$kA0g2RaPgtRVciMkbfhwqOTSJ2iMPtuCbu3RkQ5/bMyVSVTi20LI6', 'normal', true, now(), now(), now(), 'useradmin', 'user', 'admin', '87654321', now(), 2, 1)
                on conflict do nothing;
            
                insert into complaint_reasons (name, active, created_at, updated_at, deleted_at)
                values ('ruidos molestos', false, now(), now(), null),
                       ('amenazas', true, now(), now(), null),
                       ('acosos', true, now(), now(), null),
                       ('robos', true, now(), now(), null),
                       ('hurtos', true, now(), now(), now())
                on conflict do nothing;
            
                insert into cities (name, active, created_at, updated_at, deleted_at)
                values ('ciudad gótica', false, now(), now(), null),
                       ('neuquén', true, now(), now(), null),
                       ('caba', true, now(), now(), null),
                       ('amba', true, now(), now(), null),
                       ('la pampa', true, now(), now(), now())
                on conflict do nothing;
            
                insert into violence_types (name, active, created_at, updated_at, deleted_at)
                values ('física', true, now(), now(), null),
                       ('económica', true, now(), now(), null),
                       ('sexual', true, now(), now(), null),
                       ('verbal', false, now(), now(), null),
                       ('laboral', true, now(), now(), now())
                on conflict do nothing;
            
                insert into vulnerable_populations (name, active, created_at, updated_at, deleted_at)
                values ('indígenas', false, now(), now(), null),
                       ('migrantes', true, now(), now(), null),
                       ('adultos mayores', true, now(), now(), null),
                       ('indigentes', true, now(), now(), null),
                       ('discapacitados', true, now(), now(), now())
                on conflict do nothing;
            
                insert into representative_types (name, active, created_at, updated_at, deleted_at)
                values ('tercera persona', true, now(), now(), null),
                       ('institución', true, now(), now(), null),
                       ('fulano', true, now(), now(), null),
                       ('kcyo no se me ocurre', false, now(), now(), null),
                       ('kcyo no se me ocurre v2', true, now(), now(), now())
                on conflict do nothing;
            
                insert into relationship_types (name, active, created_at, updated_at, deleted_at)
                values ('vecino', true, now(), now(), null),
                       ('familiar', true, now(), now(), null),
                       ('amigo', true, now(), now(), null),
                       ('compañero de trabajo', false, now(), now(), null),
                       ('conodido', true, now(), now(), now())
                on conflict do nothing;
            
                insert into origin_types (name, active, created_at, updated_at, deleted_at)
                values ('ni idea que va acá', false, now(), now(), null),
                       ('ni idea que va acá v2', true, now(), now(), now()),
                       ('origen 1', true, now(), now(), null),
                       ('origen 2', true, now(), now(), null),
                       ('origen 3', true, now(), now(), null)
                on conflict do nothing;
            
                if (select count(1) from victims) = 0
                then
            
                  insert into victims (identification_code, first_name, last_name, phone_number, address, birth_date, age, sex,
                                       sex_clarification, identification_type_id, city_id, created_at, updated_at, deleted_at)
                  values ('12345678', 'valeria', 'giardino', '1234567890', 'calle falsa 1234', now(), 32, 'female', null, 1, 2,
                          now(),
                          now(), null),
                         ('87654321', 'mariana', 'martinez', '0987654321', 'calle fake ddd', now(), 23, 'female', 'nsnc', 2, 3,
                          now(),
                          now(), null),
                         ('43215678', 'marcos', 'robledo', '5432167890', 'fulanitodetal 22', now(), 43, 'male', 'transgénero', 3,
                          4,
                          now(), now(), null);
            
                  insert into assistances (phone_number, first_call, femicide_risk, code, summary, derivation_observation,
                                           assistance_type, victim_id, user_id, created_at, updated_at,
                                           deleted_at)
                  values ('1234567890', true, false, 'A', 'blah blah blahhhh', 'ble bleh', 'emergency', 1, 2, now(), now(),
                          null),
                         ('0987654321', false, true, 'C', 'resumen de las cosas', 'lo derivamos porque si', 'counseling', 2, 2,
                          now(),
                          now(), null);
            
                  insert into derivation_types_by_assistance (derivation_type_id, assistance_id, created_at, updated_at, deleted_at)
                  values (1, 1, now(), now(), null),
                         (2, 1, now(), now(), null),
                         (3, 1, now(), now(), now()),
                         (3, 2, now(), now(), null);
            
                  insert into calls (issue_address, vulnerable_population_id, complaint_reason_id, origin_type_id, assistance_id,
                                     created_at, updated_at, deleted_at)
                  values ('ecuador 888', 2, 2, 3, 1, now(), now(), null),
                         ('corrientes 2000', 3, 3, 4, 2, now(), now(), null);
            
                  insert into disabilities_by_victim (disability_id, victim_id, created_at, updated_at, deleted_at)
                  values (2, 1, now(), now(), null),
                         (3, 1, now(), now(), null),
                         (4, 1, now(), now(), now()),
                         (4, 2, now(), now(), null);
            
                  insert into violence_types_by_call (violence_type_id, call_id, created_at, updated_at, deleted_at)
                  values (1, 1, now(), now(), null),
                         (2, 1, now(), now(), null),
                         (3, 1, now(), now(), now()),
                         (3, 2, now(), now(), null);
            
                  insert into aggressors (first_name, last_name, occupation, identification_code, address, identification_type_id,
                                          city_id, call_id, created_at, updated_at, deleted_at)
                  values ('roberto', 'mangeri', 'kiosquero', '12345678', 'yrigoyen 123', 1, 2, 1, now(), now(), null),
                         ('dario', 'jorgelin', 'electricista', '87654321', 'colon 333', 2, 3, 2, now(), now(), null);
            
                  insert into representatives (first_name, last_name, representative_type_id, relationship_type_id, call_id,
                                               created_at,
                                               updated_at, deleted_at)
                  values ('mariano', 'rial', 1, 1, 1, now(), now(), null),
                         ('fernando', 'de hoz', 2, 2, 2, now(), now(), null);
                       
                end if;
            
              end;
              $$;
      `
    ),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
