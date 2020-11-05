import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { identificationTypes } from '../../../../models/identification-types';
import { AssistancesService } from 'src/app/assistances/assistances.service';
import { sexTypes } from '../../../../models/sex-types';
import { codes } from 'src/app/models/codes';
import { ActivatedRoute } from '@angular/router';
import { AssistancesMapper } from '../../../utils/assistances-mapper';
import { NgSelect2Component } from 'ng-select2';
import { debounceTime } from "rxjs/operators";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assistance-form',
  templateUrl: './assistance-form.component.html',
  styleUrls: ['./assistance-form.component.scss']
})
export class AssistanceFormComponent implements OnInit {
  public mode: string;

  public title: string;

  public submitted: boolean = false;

  public showSuccessMessage: boolean = false;

  public errorMessage: string;

  @ViewChild('cdkStepper')
  public cdkStepper: CdkStepper;

  @ViewChild('sexClarification')
  public sexClarification: ElementRef;

  @ViewChild('representativeType')
  public representativeType: ElementRef;

  @ViewChild('representativeFirstName')
  public representativeFirstName: ElementRef;

  @ViewChild('representativeLastName')
  public representativeLastName: ElementRef;

  @ViewChild('relationshipType')
  public relationshipType: ElementRef;

  @ViewChild('derivationSelect')
  public derivationSelect: NgSelect2Component;

  @ViewChild('fillFormConfirmationModal')
  public fillFormConfirmationModal: ElementRef;

  public assistanceForm: FormGroup;

  public select2Options = {
    multiple: true,
    width: '100%'
  };

  /**
   * @todo: get from db when defined (or store in frontend model if they are just a few)
   */
  public idTypes = identificationTypes;
  public sexTypes = sexTypes;
  public codes = codes;

  public cities = [];
  public representativeTypes = [];
  public relationShipTypes = [];
  public vulnerablePopulations = [];
  public derivationTypes = [];
  public violenceTypes = [];
  public disabilities = [];
  public originTypes = [];
  public complaintReasons = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private assistancesService: AssistancesService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    //Mode: Create or edit
    this.route.data.subscribe(data => this.mode = data.mode);

    if (this.mode === 'edit' || this.mode === 'view') {
      const assistanceId = this.route.snapshot.params.id;

      this.assistancesService.getAssistanceById(assistanceId).subscribe((assistance: any) => {
        const assistanceSteps = AssistancesMapper.toAssistanceSteps(assistance);

        //Remove 'Z' timezone from datetime string
        assistanceSteps.firstStep.date_time = assistanceSteps.firstStep.date_time.slice(0, -1);

        if (assistanceSteps.secondStep.birth_date) {
          const unformattedBirthDate = assistanceSteps.secondStep.birth_date;
          assistanceSteps.secondStep.birth_date = this.datePipe.transform(
            new Date(unformattedBirthDate), 'yyyy-MM-dd');
        }

        //Transform derivation type ids to string (to preselect the select2)
        for (let i = 0; i < assistanceSteps.lastStep.derivation_types.length; i++) {
          const derivationId = assistanceSteps.lastStep.derivation_types[i];
          assistanceSteps.lastStep.derivation_types[i] = derivationId.toString();
        }

        //Transform violence type ids to string (to preselect the select2)
        for (let i = 0; i < assistanceSteps.lastStep.violence_types.length; i++) {
          const violenceTypeId = assistanceSteps.lastStep.violence_types[i];
          assistanceSteps.lastStep.violence_types[i] = violenceTypeId.toString();
        }

        this.assistanceForm.controls.steps.get('0').setValue(assistanceSteps.firstStep);
        this.assistanceForm.controls.steps.get('1').setValue(assistanceSteps.secondStep);
        this.assistanceForm.controls.steps.get('2').setValue(assistanceSteps.thirdStep);
        this.assistanceForm.controls.steps.get('3').setValue(assistanceSteps.lastStep);

        if (this.mode === 'edit') {
          this.title = 'Editar registro';
        } else {
          this.title = 'Visualizar registro';
          this.assistanceForm.disable();
        }
      });
    } else {
      this.title = 'Nuevo registro';
    }
  }


  ngOnInit(): void {
    //In a future maybe separate the form in different pages/components
    this.assistanceForm = this.fb.group({
      steps: this.fb.array([
        //Paso 1: Desarrollo
        this.fb.group({
          femicide_risk: [null],
          assistance_type: [null],
          first_call: [null],
          date_time: [null,
            Validators.compose([
              Validators.required,
              this.validDate
            ])
          ],
          phone_number: [null, Validators.compose([
            Validators.required,
            Validators.pattern(/^\d*$/), //Numeric
            Validators.maxLength(20)]),
          ],
          summary: [null, Validators.compose([
            Validators.required,
            Validators.maxLength(2000)
          ])]
        }),
        //Paso 2: Persona
        this.fb.group({
          identification_type_id: [null, Validators.required],
          identification_code: [null, Validators.compose([
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^\d*$/) //Numeric
          ])],
          first_name: [null, Validators.compose([
            Validators.required,
            Validators.maxLength(50)])
          ],
          last_name: [null, Validators.compose([
            Validators.required,
            Validators.maxLength(50)])
          ],
          phone_number: [null, Validators.compose([
            Validators.required,
            Validators.pattern(/^\d*$/), //Numeric
            Validators.maxLength(20)]),
          ],
          city_id: [null, Validators.required],
          address: [null, Validators.compose([
            Validators.required,
            Validators.maxLength(100)])
          ],
          birth_date: [null, this.validDate],
          age: [null, Validators.compose([
            Validators.maxLength(3),
            Validators.pattern(/^\d*$/), //Numeric
          ])],
          disabilities: [null],
          sex: ['female'],
          sex_clarification: [null],
          representative_type_id: [null],
          representative_first_name: [null, Validators.maxLength(50)],
          representative_last_name: [null, Validators.maxLength(50)],
          relationship_type_id: [null]
        }),
        //Paso 3: Agresor
        this.fb.group({
          aggressor_first_name: [null, Validators.maxLength(50)],
          aggressor_last_name: [null, Validators.maxLength(50)],
          aggressor_occupation: [null, Validators.maxLength(50)],
          aggressor_identification_code: [null, Validators.compose([
            Validators.maxLength(10),
            Validators.pattern(/^\d*$/) //Numeric
          ])],
          aggressor_identification_type_id: [null], //Preseleccionar DNI
          aggressor_city_id: [null],
          aggressor_address: [null],
          aggressor_weapons_handling: [null],
          aggressor_substances_use: [null]
        }),
        //Paso 4: Denuncia
        this.fb.group({
          issue_address: [null],
          vulnerable_population_id: [null, Validators.required],
          derivation_types: [null, Validators.required],
          complaint_reason_id: [null, Validators.required],
          derivation_observation: [null, Validators.maxLength(100)],
          violence_types: [null, Validators.required],
          code: [null, Validators.required],
          origin_type_id: [null, Validators.required]
        })
      ])
    });

    if (this.mode === 'create') {
      //Wait 3 secs of inactivity after a form value changes to save in localStorage 
      this.assistanceForm.valueChanges
        .pipe(debounceTime(3000))
        .subscribe(formValues => {
          localStorage.setItem('formData', JSON.stringify(formValues));
        });
    }

    /**
     * @todo: refactor the hardcoded (1, 999999) to get all values from db 
     */
    this.assistancesService.getRepresentativeTypes(1, 999999).subscribe(
      (response: any) => {
        this.representativeTypes = response.data;
      }
    );
    this.assistancesService.getRelationshipTypes(1, 999999).subscribe(
      (response: any) => {
        this.relationShipTypes = response.data;
      }
    );
    this.assistancesService.getVulnerablePopulations(1, 999999).subscribe(
      (response: any) => {
        this.vulnerablePopulations = response.data;
      }
    );
    this.loadDerivationTypes();
    this.assistancesService.getViolenceTypes(1, 999999).subscribe(
      (response: any) => {
        this.violenceTypes = response.data;

        //Add 'text' property for ng-select2
        this.violenceTypes.map(violenceType => {
          violenceType.text = violenceType.name;
        });
      }
    );
    this.assistancesService.getCities(1, 999999).subscribe(
      (response: any) => {
        this.cities = response.data;
      }
    );
    this.assistancesService.getDisabilities(1, 999999).subscribe(
      (response: any) => {
        this.disabilities = response.data;

        //Add 'text' property for ng-select2
        this.disabilities.map(disability => {
          disability.text = disability.name;
        });
      }
    );
    this.assistancesService.getOriginTypes(1, 999999).subscribe(
      (response: any) => {
        this.originTypes = response.data;
      }
    );
    this.assistancesService.getComplaintReasons(1, 999999).subscribe(
      (response: any) => {
        this.complaintReasons = response.data;
      }
    );
  }

  ngAfterViewInit() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (this.mode === 'create' && formData) {
      this.modalService.open(this.fillFormConfirmationModal);
    }
  }

  fillFormWithUnsavedData() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    this.assistanceForm.setValue(formData);
    this.modalService.dismissAll();
  }

  private loadDerivationTypes(code?: string) {
    this.assistancesService.getDerivationTypes(1, 999999).subscribe(
      (response: any) => {
        this.derivationTypes = response.data;

        //Add 'text' property for ng-select2
        this.derivationTypes.map(derivationType => {
          derivationType.text = derivationType.name;
        });
        if (!code) return;
        this.derivationTypes = this.derivationTypes.filter(derivationType => derivationType.codes.includes(code.toUpperCase()));
      }
    );
  }

  //Get the formArray which contains every step
  get formArray(): AbstractControl {
    return this.assistanceForm.get('steps');
  }

  isValid(step: string, controlName: string): boolean {
    return this.assistanceForm.get('steps').get(step).get(controlName).valid;
  }

  validDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();

    if (Date.parse(control.value) > currentDate.getTime()) {
      return { invalidDate: true };
    }

    return null;
  }


  changeSexSelect(event) {
    if (event.target.value === 'others') {
      //If selected sex is 'Otros'
      this.sexClarification.nativeElement.disabled = false;
    } else {
      this.sexClarification.nativeElement.disabled = true;
    }
  }

  changeRepresentative(event) {
    if (event.target.checked) {
      //Enable all representative fields
      this.representativeType.nativeElement.disabled = false;
      this.representativeFirstName.nativeElement.disabled = false;
      this.representativeLastName.nativeElement.disabled = false;
      this.relationshipType.nativeElement.disabled = false;
      //They are now required
      this.formArray.get('1').get('representative_type_id').setValidators([Validators.required])
      this.formArray.get('1').get('representative_first_name').setValidators(Validators.required);
      this.formArray.get('1').get('representative_last_name').setValidators(Validators.required);
      this.formArray.get('1').get('relationship_type_id').setValidators(Validators.required);
    } else {
      //Disable all representative fields
      this.representativeType.nativeElement.disabled = true;
      this.representativeFirstName.nativeElement.disabled = true;
      this.representativeLastName.nativeElement.disabled = true;
      this.relationshipType.nativeElement.disabled = true;
      //Not required anymore
      this.formArray.get('1').get('representative_type_id').clearValidators();
      this.formArray.get('1').get('representative_first_name').clearValidators();
      this.formArray.get('1').get('representative_last_name').clearValidators();
      this.formArray.get('1').get('relationship_type_id').clearValidators();
    }
    //Update formControl validation
    this.formArray.get('1').get('representative_type_id').updateValueAndValidity();
    this.formArray.get('1').get('representative_first_name').updateValueAndValidity();
    this.formArray.get('1').get('representative_last_name').updateValueAndValidity();
    this.formArray.get('1').get('relationship_type_id').updateValueAndValidity();
  }

  private removeNullFields(stepValues) {
    const stepKeys = Object.keys(stepValues);
    if (stepKeys.length) {
      for (let i = 0; i < stepKeys.length; i++) {
        if (stepValues[stepKeys[i]] === null || stepValues[stepKeys[i]] === undefined) {
          delete stepValues[stepKeys[i]];
        }
      }
    }
  }

  //Returns the first step found with form errors
  private getStepWithErrors(): number {
    const steps = this.assistanceForm.controls.steps as any;
    for (let i = 0; i < steps.length; i++) {
      if (steps.controls[i].invalid) {
        return i;
      }
    }
  }


  submitAssistance() {
    this.submitted = true;
    if (this.assistanceForm.invalid) {
      this.errorMessage = 'Existen errores en algunos campos, por favor verifíquelos y vuelva a intentar.'
      this.showSuccessMessage = false;
      //Move to the first step with errors
      this.cdkStepper.selectedIndex = this.getStepWithErrors();
      return;
    }

    const firstStepFields = this.assistanceForm.controls.steps.value[0];
    const secondStepFields = this.assistanceForm.controls.steps.value[1];
    const thirdStepFields = this.assistanceForm.controls.steps.value[2];
    const lastStepFields = this.assistanceForm.controls.steps.value[3];

    this.removeNullFields(firstStepFields);
    this.removeNullFields(secondStepFields);
    this.removeNullFields(thirdStepFields);
    this.removeNullFields(lastStepFields);

    //Format date-time picker selected value
    firstStepFields.date_time = this.datePipe.transform(firstStepFields.date_time, 'yyyy-MM-dd hh:mm:ss');

    if (firstStepFields.assistance_type) {
      firstStepFields.assistance_type = "Counseling";
    } else {
      firstStepFields.assistance_type = "Emergency";
    }


    if (!firstStepFields.femicide_risk) {
      firstStepFields.femicide_risk = false;
    }

    if (!firstStepFields.first_call) {
      firstStepFields.first_call = false;
    }

    //Transform string select2 values to integer
    if (secondStepFields.disabilities) {
      secondStepFields.disabilities = secondStepFields.disabilities.map(Number);
    }
    lastStepFields.violence_types = lastStepFields.violence_types.map(Number);
    lastStepFields.derivation_types = lastStepFields.derivation_types.map(Number);

    const body = {
      general: firstStepFields,
      person: secondStepFields,
      aggressor: thirdStepFields,
      complaint: lastStepFields
    };

    if (this.mode === 'create') {
      this.assistancesService.createAssistance(body).toPromise()
        .then(response => {
          this.showSuccessMessage = true;
          this.errorMessage = '';
          localStorage.removeItem('formData');
        })
        .catch(err => {
          this.showSuccessMessage = false;
          this.errorMessage = 'Hubo un error al intentar crear el nuevo registro.'
        })
    } else {
      const assistanceId = this.route.snapshot.params.id;
      this.assistancesService.updateAssistance(assistanceId, body).toPromise()
        .then(response => {
          this.showSuccessMessage = true;
          this.errorMessage = '';
        })
        .catch(err => {
          this.showSuccessMessage = false;
          this.errorMessage = 'Hubo un error al intentar modificar el registro.'
        })
    }
  }

  recommend() {
    const firstStepFields = this.assistanceForm.controls.steps.value[0];
    const lastStepFields = this.assistanceForm.controls.steps.value[3];
    const lifeRisk = firstStepFields.femicide_risk == true;
    const counseling = firstStepFields.assistance_type != "Emergency";
    if (!lastStepFields.origin_type_id || !lastStepFields.complaint_reason_id || !lastStepFields.violence_types) {
      this.errorMessage = 'Existen errores en algunos campos, por favor verifíquelos y vuelva a intentar.';
      return;
    }
    const originTypeId = lastStepFields.origin_type_id;
    const complaintReasonId = lastStepFields.origin_type_id;
    const violenceTypesIds = lastStepFields.violence_types.map(Number);
    this.assistancesService.predictCode(
      lifeRisk,
      counseling,
      originTypeId,
      complaintReasonId,
      violenceTypesIds
    ).then(code => {
      this.assistanceForm.controls.steps.get('3').get('code').setValue(code);
      this.loadDerivationTypes(code);
      document.getElementById('model-message').textContent = 'El sistema recomienda un código "' + code.toUpperCase() + '" para este caso. Fueron listadas las derivaciones específicas para este código. En caso de disentir con la recomendación presione el botón "Cancelar" y todas las derivaciones serán cargadas';
    }).catch(err => {
      this.errorMessage = 'Existen errores en algunos campos, por favor verifíquelos y vuelva a intentar.';
    });
  }

  cancelRecommendation() {
    this.assistanceForm.controls.steps.get('3').get('code').reset();
    this.loadDerivationTypes();
    document.getElementById('model-message').textContent = '';
  }
}
