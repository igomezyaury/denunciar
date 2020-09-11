import { Component, OnInit, ViewChild, ElementRef, ɵɵresolveBody } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { identificationTypes } from '../../../../models/identification-types';
import { AssistancesService } from 'src/app/assistances/assistances.service';
import { sexTypes } from '../../../../models/sex-types';
import { complaintReasons } from 'src/app/models/complaint-reasons';
import { codes } from 'src/app/models/codes';
import { originTypes } from 'src/app/models/origin-types';

@Component({
  selector: 'app-assistance-form',
  templateUrl: './assistance-form.component.html',
  styleUrls: ['./assistance-form.component.scss']
})
export class AssistanceFormComponent implements OnInit {

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

  public assistanceForm: FormGroup;


  /**
   * @todo: get from db when defined (or store in frontend model if they are just a few)
   */
  public idTypes = identificationTypes;
  public sexTypes = sexTypes;
  public complaintReasons = complaintReasons;
  public codes = codes;
  public originTypes = originTypes;

  public cities = [];
  public representativeTypes = [];
  public relationShipTypes = [];
  public vulnerablePopulations = [];
  public derivationTypes = [];
  public violenceTypes = [];
  public disabilities = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private assistancesService: AssistancesService
  ) { }

  ngOnInit(): void {
    //In a future maybe separate the form in different pages/components
    const currentDate = new Date();
    this.assistanceForm = this.fb.group({
      steps: this.fb.array([
        //Paso 1: Desarrollo
        this.fb.group({
          femicide_risk: [null],
          assistance_type: [null],
          first_call: [null],
          date_time: [
            this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
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
          sex: [null],
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
          aggressor_city_id: [null]
        }),
        //Paso 4: Denuncia
        this.fb.group({
          issue_address: [null],
          vulnerable_population_id: [null, Validators.required],
          derivation_type_id: [null, Validators.required],
          complaint_reason_id: [null, Validators.required],
          derivation_observation: [null, Validators.maxLength(100)],
          violence_types: [null, Validators.required],
          code: [null, Validators.required],
          origin_type_id: [null, Validators.required]
        })
      ])
    });

    /* If some of this responses are just a few fields, create a model in frontend
    to avoid hitting backend too many times */
    this.assistancesService.getRepresentativeTypes().subscribe(
      (response: any) => {
        this.representativeTypes = response.data;
      }
    );
    this.assistancesService.getRelationshipTypes().subscribe(
      (response: any) => {
        this.relationShipTypes = response.data;
      }
    );
    this.assistancesService.getVulnerablePopulations().subscribe(
      (response: any) => {
        this.vulnerablePopulations = response.data;
      }
    );
    this.assistancesService.getDerivationTypes().subscribe(
      (response: any) => {
        this.derivationTypes = response.data;
      }
    );
    this.assistancesService.getViolenceTypes().subscribe(
      (response: any) => {
        this.violenceTypes = response.data;
      }
    );
    this.assistancesService.getCities().subscribe(
      (response: any) => {
        this.cities = response.data;
      }
    );
    this.assistancesService.getDisabilities().subscribe(
      (response: any) => {
        this.disabilities = response.data;
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
    if (event.target.value === '3') {
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

  submitAssistance() {
    this.submitted = true;
    if (this.assistanceForm.invalid) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const firstStepFields = this.assistanceForm.controls.steps.value[0];
    const secondStepFields = this.assistanceForm.controls.steps.value[1];
    const thirdStepFields = this.assistanceForm.controls.steps.value[2];
    const lastStepFields = this.assistanceForm.controls.steps.value[3];

    if (firstStepFields.assistance_type) {
      firstStepFields.assistance_type = "Counseling";
    } else {
      firstStepFields.assistance_type = "Emergency";
    }

    const body = {
      general: firstStepFields,
      person: secondStepFields,
      aggressor: thirdStepFields,
      complaint: lastStepFields,
      userId: user.id
    }

    this.assistancesService.createAssistance(body).toPromise()
      .then(response => {
        debugger;
        console.log('Assistance created correctly');
      })
      .catch(err => {
        debugger;
        console.log('Error creating assistance: ' + err.message);
      })
  }
}
