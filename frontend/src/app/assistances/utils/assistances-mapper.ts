export class AssistancesMapper {

    public static toAssistanceSteps(assistance) {


        const representative = assistance.call.representative;

        const firstStep = {
            femicide_risk: assistance.femicide_risk,
            assistance_type: (assistance.assistance_type === 'Counseling') ? true : false,
            first_call: assistance.first_call,
            date_time: assistance.datetime,
            phone_number: assistance.phone_number,
            summary: assistance.summary
        };

        const secondStep = {
            identification_type_id: assistance.victim.identification_type_id,
            identification_code: assistance.victim.identification_code,
            first_name: assistance.victim.first_name,
            last_name: assistance.victim.last_name,
            phone_number: assistance.victim.phone_number,
            city_id: assistance.victim.city_id,
            address: assistance.victim.address,
            birth_date: assistance.victim.birth_date,
            age: assistance.victim.age,
            disabilities: assistance.victim.disabilities.map(d => d.id),
            sex: assistance.victim.sex,
            sex_clarification: assistance.victim.sex_clarification,
            representative_type_id: (representative) ? representative.representative_type_id : null,
            representative_first_name: (representative) ? representative.first_name : null,
            representative_last_name: (representative) ? representative.last_name : null,
            relationship_type_id: (representative) ? representative.relationship_type_id : null
        };

        const thirdStep = {
            aggressor_first_name: assistance.call.aggressor.first_name,
            aggressor_last_name: assistance.call.aggressor.last_name,
            aggressor_occupation: assistance.call.aggressor.occupation,
            aggressor_identification_code: assistance.call.aggressor.identification_code,
            aggressor_identification_type_id: assistance.call.aggressor.identification_type_id,
            aggressor_city_id: assistance.call.aggressor.city_id,
            aggressor_address: assistance.call.aggressor.address,
            aggressor_weapons_handling: assistance.call.aggressor.weapons_handling,
            aggressor_substances_use: assistance.call.aggressor.substances_use
        };

        const lastStep = {
            issue_address: assistance.call.issue_address,
            vulnerable_population_id: assistance.call.vulnerable_population_id,
            derivation_types: assistance.derivation_types.map(dt => dt.id),
            complaint_reason_id: assistance.call.complaint_reason_id,
            derivation_observation: assistance.derivation_observation,
            violence_types: assistance.call.violence_types.map(vt => vt.id),
            code: assistance.code,
            origin_type_id: assistance.call.origin_type_id
        };

        return {
            firstStep,
            secondStep,
            thirdStep, lastStep
        };
    }
}