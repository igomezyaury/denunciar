/* eslint-disable no-unused-vars */
'use strict';

// noinspection SqlDialectInspection,SqlNoDataSourceInspection,SpellCheckingInspection,JSUnusedLocalSymbols
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.query(
      `
            insert into disabilities (name, active, created_at, updated_at, deleted_at)
            values ('sordera', false, now(), now(), null),
                   ('ceguera', true, now(), now(), null),
                   ('sindrome de down', true, now(), now(), null),
                   ('autismo', true, now(), now(), null),
                   ('amputacion', true, now(), now(), now())
            ;
            
            insert into derivation_types (name, active, created_at, updated_at, deleted_at)
            values ('hospital', false, now(), now(), null),
                   ('policía', true, now(), now(), null),
                   ('bomberos', true, now(), now(), null),
                   ('inadi', true, now(), now(), null),
                   ('juzgado civil', true, now(), now(), now())
            ;
            
            insert into users (email, password, rol, active, created_at, updated_at, deleted_at)
            values ('user@admin.com', 'admin', 'admin', true, now(), now(), null),
                   ('user@normal.com', 'normal', 'normal', true, now(), now(), null),
                   ('user@inactive.com', 'inactive', 'normal', false, now(), now(), null),
                   ('user@deleted.com', 'deleted', 'normal', true, now(), now(), now())
            ;
            
            insert into complaint_reasons (name, active, created_at, updated_at, deleted_at)
            values ('ruidos molestos', false, now(), now(), null),
                   ('amenazas', true, now(), now(), null),
                   ('acosos', true, now(), now(), null),
                   ('robos', true, now(), now(), null),
                   ('hurtos', true, now(), now(), now())
            ;
            
            insert into cities (name, active, created_at, updated_at, deleted_at)
            values ('ciudad gótica', false, now(), now(), null),
                   ('neuquén', true, now(), now(), null),
                   ('caba', true, now(), now(), null),
                   ('amba', true, now(), now(), null),
                   ('la pampa', true, now(), now(), now())
            ;
            
            insert into violence_types (name, active, created_at, updated_at, deleted_at)
            values ('física', true, now(), now(), null),
                   ('económica', true, now(), now(), null),
                   ('sexual', true, now(), now(), null),
                   ('verbal', false, now(), now(), null),
                   ('laboral', true, now(), now(), now())
            ;
            
            insert into vulnerable_populations (name, active, created_at, updated_at, deleted_at)
            values ('indígenas', false, now(), now(), null),
                   ('migrantes', true, now(), now(), null),
                   ('adultos mayores', true, now(), now(), null),
                   ('indigentes', true, now(), now(), null),
                   ('discapacitados', true, now(), now(), now())
            ;
            
            insert into representative_types (name, active, created_at, updated_at, deleted_at)
            values ('tercera persona', true, now(), now(), null),
                   ('institución', true, now(), now(), null),
                   ('fulano', true, now(), now(), null),
                   ('kcyo no se me ocurre', false, now(), now(), null),
                   ('kcyo no se me ocurre v2', true, now(), now(), now())
            ;
            
            insert into relationship_types (name, active, created_at, updated_at, deleted_at)
            values ('vecino', true, now(), now(), null),
                   ('familiar', true, now(), now(), null),
                   ('amigo', true, now(), now(), null),
                   ('compañero de trabajo', false, now(), now(), null),
                   ('conodido', true, now(), now(), now())
            ;
            
            insert into origin_types (name, active, created_at, updated_at, deleted_at)
            values ('ni idea que va acá', false, now(), now(), null),
                   ('ni idea que va acá v2', true, now(), now(), now()),
                   ('origen 1', true, now(), now(), null),
                   ('origen 2', true, now(), now(), null),
                   ('origen 3', true, now(), now(), null)
            ;
            
            insert into identification_types (id, name, active, created_at, updated_at, deleted_at)
            values ('dni', 'documento nacional de identidad', true, now(), now(), null),
                   ('ci', 'cedula civil', true, now(), now(), null),
                   ('le', 'libreta de enrolamiento', true, now(), now(), null),
                   ('lc', 'libreta cívica', false, now(), now(), null),
                   ('atr', 'a todo ritmo', true, now(), now(), now())
            ;
            
            insert into victims (identification_code, first_name, last_name, phone_number, address, birth_date, age, sex,
                                 sex_clarification, identification_type_id, city_id, created_at, updated_at, deleted_at)
            values ('12345678', 'valeria', 'giardino', '1234567890', 'calle falsa 1234', now(), 32, 'female', null, 'dni', 2, now(),
                    now(), null),
                   ('87654321', 'mariana', 'martinez', '0987654321', 'calle fake ddd', now(), 23, 'female', 'nsnc', 'lc', 3, now(),
                    now(), null),
                   ('43215678', 'marcos', 'robledo', '5432167890', 'fulanitodetal 22', now(), 43, 'male', 'transgénero', 'le', 4,
                    now(), now(), null)
            ;
            
            insert into assistances (phone_number, first_call, femicide_risk, cod_b, summary, derivation_observation,
                                     assistance_type, victim_id, user_id, derivation_type_id, created_at, updated_at, deleted_at)
            values ('1234567890', true, false, false, 'blah blah blahhhh', 'ble bleh', 'emergency', 1, 2, 2, now(), now(), null),
                   ('0987654321', false, true, true, 'resumen de las cosas', 'lo derivamos porque si', 'counseling', 2, 2, 3, now(),
                    now(), null)
            ;
            
            insert into calls (issue_address, vulnerable_population_id, complaint_reason_id, origin_type_id, assistance_id,
                               created_at, updated_at, deleted_at)
            values ('ecuador 888', 2, 2, 3, 1, now(), now(), null),
                   ('corrientes 2000', 3, 3, 4, 2, now(), now(), null)
            ;
            
            insert into disabilities_by_victim (disability_id, victim_id, created_at, updated_at, deleted_at)
            values (2, 1, now(), now(), null),
                   (3, 1, now(), now(), null),
                   (4, 1, now(), now(), now()),
                   (4, 2, now(), now(), null)
            ;
            
            insert into violence_types_by_call (violence_type_id, call_id, created_at, updated_at, deleted_at)
            values (1, 1, now(), now(), null),
                   (2, 1, now(), now(), null),
                   (3, 1, now(), now(), now()),
                   (3, 2, now(), now(), null)
            ;
            
            insert into aggressors (first_name, last_name, occupation, identification_code, address, identification_type_id,
                                    city_id, call_id, created_at, updated_at, deleted_at)
            values ('roberto', 'mangeri', 'kiosquero', '12345678', 'yrigoyen 123', 'dni', 2, 1, now(), now(), null),
                   ('dario', 'jorgelin', 'electricista', '87654321', 'colon 333', 'le', 3, 2, now(), now(), null)
            ;
            
            insert into representatives (first_name, last_name, representative_type_id, relationship_type_id, call_id, created_at,
                                         updated_at, deleted_at)
            values ('mariano', 'rial', 1, 1, 1, now(), now(), null),
                   ('fernando', 'de hoz', 2, 2, 2, now(), now(), null)
            ;
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
