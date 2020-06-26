const { pagination, addCommonProperties, ID } = require('./common');

exports.getAssistancesMapper = req => ({
  ...pagination(req)
});

exports.createAssistanceMapper = req =>
  addCommonProperties(
    {
      phoneNumber: req.body.phone_number,
      firstCall: req.body.first_call,
      femicideRisk: req.body.femicide_risk,
      codB: req.body.cod_b,
      summary: req.body.summary,
      derivationObservation: req.body.derivation_observation,
      assistanceType: req.body.assistance_type,
      derivationTypeId: req.body.derivation_type_id,
      userId: req.user.id,
      victim: {
        firstName: req.body.victim.first_name,
        lastName: req.body.victim.last_name,
        identificationCode: req.body.victim.identification_code,
        phoneNumber: req.body.victim.phone_number,
        address: req.body.victim.address,
        birthDate: req.body.victim.birth_date,
        age: req.body.victim.age,
        sex: req.body.victim.sex,
        sexClarification: req.body.victim.sex_clarification,
        identificationTypeId: req.body.victim.identification_type_id,
        cityId: req.body.victim.city_id,
        disabilities: req.body.victim.disabilities
      },
      call: {
        issueAddress: req.body.call.issue_address,
        aggressor: {
          firstName: req.body.call.aggressor.first_name,
          lastName: req.body.call.aggressor.last_name,
          occupation: req.body.call.aggressor.occupation,
          identificationCode: req.body.call.aggressor.identification_code,
          identificationTypeId: req.body.call.aggressor.identification_type_id,
          cityId: req.body.call.aggressor.city_id
        },
        representative: {
          firstName: req.body.call.representative.first_name,
          lastName: req.body.call.representative.last_name,
          representativeTypeId: req.body.call.representative.representative_type_id,
          relationshipTypeId: req.body.call.representative.relationship_type_id
        },
        vulnerablePopulationId: req.body.call.vulnerable_population_id,
        complaintReasonId: req.body.call.complaint_reason_id,
        violenceTypes: req.body.call.violence_types,
        originTypeId: req.body.call.origin_type_id
      }
    },
    req,
    []
  );

exports.getAssistanceMapper = req => addCommonProperties({}, req, [ID]);

exports.deleteAssistanceMapper = req => addCommonProperties({}, req, [ID]);
