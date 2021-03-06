const { pagination, addCommonProperties, ID } = require('./common');
const { deburr } = require('../utils/lodash');

exports.getAssistancesMapper = req => ({
  ...pagination(req),
  firstName: req.query.first_name,
  lastName: req.query.last_name,
  phoneNumber: req.query.phone_number,
  identificationCode: req.query.identification_code
});

exports.createAssistanceMapper = req =>
  addCommonProperties(
    {
      phoneNumber: req.body.general.phone_number,
      firstCall: req.body.general.first_call,
      datetime: req.body.general.date_time,
      femicideRisk: req.body.general.femicide_risk,
      code: req.body.complaint.code,
      summary: req.body.general.summary,
      derivationObservation: req.body.complaint.derivation_observation || '',
      assistanceType: req.body.general.assistance_type,
      derivationTypes: req.body.complaint.derivation_types,
      userId: req.user.id,
      victim: {
        firstName: deburr(req.body.person.first_name),
        lastName: deburr(req.body.person.last_name),
        identificationCode: req.body.person.identification_code,
        phoneNumber: req.body.person.phone_number,
        address: req.body.person.address,
        birthDate: req.body.person.birth_date,
        age: req.body.person.age,
        sex: req.body.person.sex,
        sexClarification: req.body.person.sex_clarification,
        identificationTypeId: req.body.person.identification_type_id,
        cityId: req.body.person.city_id,
        disabilities: req.body.person.disabilities
      },
      call: {
        issueAddress: req.body.complaint.issue_address || '',
        aggressor: {
          firstName: req.body.aggressor ? req.body.aggressor.aggressor_first_name : null,
          lastName: req.body.aggressor ? req.body.aggressor.aggressor_last_name : null,
          occupation: req.body.aggressor ? req.body.aggressor.aggressor_occupation : null,
          identificationCode: req.body.aggressor ? req.body.aggressor.aggressor_identification_code : null,
          identificationTypeId: req.body.aggressor ? req.body.aggressor.aggressor_identification_type_id : null,
          cityId: req.body.aggressor ? req.body.aggressor.aggressor_city_id : null,
          weaponsHandling: req.body.aggressor ? req.body.aggressor.aggressor_weapons_handling : null,
          substancesUse: req.body.aggressor ? req.body.aggressor.aggressor_substances_use : null
        },
        representative: {
          firstName: req.body.person.representative_first_name,
          lastName: req.body.person.representative_last_name,
          representativeTypeId: req.body.person.representative_type_id,
          relationshipTypeId: req.body.person.relationship_type_id
        },
        vulnerablePopulationId: req.body.complaint.vulnerable_population_id,
        complaintReasonId: req.body.complaint.complaint_reason_id,
        violenceTypes: req.body.complaint.violence_types,
        originTypeId: req.body.complaint.origin_type_id
      }
    },
    req,
    []
  );

exports.getAssistanceMapper = req => addCommonProperties({}, req, [ID]);

exports.deleteAssistanceMapper = req => addCommonProperties({}, req, [ID]);

exports.updateAssistanceMapper = req =>
  addCommonProperties({ ...this.createAssistanceMapper(req) }, req, [ID]);

exports.dateAssistanceMapper = req => ({
  fromDate: req.query.from_date,
  toDate: req.query.to_date
});
