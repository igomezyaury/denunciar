import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/messages/messages.service';
import { AssistancesService } from '../assistances.service';

@Component({
  selector: 'app-assistances',
  templateUrl: './assistances.component.html',
  styleUrls: ['./assistances.component.scss']
})
export class AssistancesComponent implements OnInit {

  public violenceTypes = [];
  public vulnerablePopulations = [];
  public searchForm: FormGroup;
  public filteredAssistances = [];

  public assistances = [];
  public assistancePage = [];
  public actualPage: number = 1;
  public totalPages: number = 0;
  private pageSize: number = 10;

  private assistanceToDeleteId: number = null;

  public loading: boolean = true;

  private chunkSize: number = 99999999;

  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(
    private assistancesService: AssistancesService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    messagesService: MessagesService
  ) {
    const message = messagesService.getMessage();
    if (message) {
      this.successMessage = message;
      messagesService.clearMessage();
    }
  }

  ngOnInit(): void {
    this.assistancesService.getAssistances(1, this.chunkSize, 'datetime', 'desc').subscribe(
      assistances => {
        this.assistances = assistances.data;
        this.assistancePage = this.assistances.slice(0, 10); //last index is not included
        this.totalPages = Math.ceil(this.assistances.length / this.pageSize);

        //Format datetime and separate violence types by commas
        this.assistances.map(assistance => {
          assistance.datetime = this.datePipe.transform(assistance.datetime, 'yyyy-MM-dd, hh:mm:ss', 'GMT');
          const violenceTypes = assistance.call.violence_types;
          assistance.formattedViolenceTypes = violenceTypes[0].name;
          for (let i = 1; i < violenceTypes.length; i++) {
            assistance.formattedViolenceTypes += ', ' + violenceTypes[i].name;
          }
        });
        this.loading = false;
      }
    );

    this.assistancesService.getViolenceTypes(1, 999999).subscribe(
      (response: any) => {
        this.violenceTypes = response.data;
      }
    );
    this.assistancesService.getVulnerablePopulations(1, 999999).subscribe(
      (response: any) => {
        this.vulnerablePopulations = response.data;
      }
    );


    this.searchForm = this.fb.group({
      //Victim
      first_name: [null],
      last_name: [null],
      identification_code: [null, Validators.compose([
        Validators.maxLength(10),
        Validators.pattern(/^\d*$/) //Numeric
      ])],
      //Call
      phone_number: [null, Validators.compose([
        Validators.pattern(/^\d*$/), //Numeric
        Validators.maxLength(20)]),
      ]
    });
  }

  async onPageChange(page: number) {
    this.loading = true;
    const startIndex = this.pageSize * (page - 1);
    let endIndex = startIndex + this.pageSize;

    const assistancesLeft = this.assistances.length - startIndex;

    if (assistancesLeft < this.pageSize) {
      //Example: We have 7 assistances left and the page size is 10. We show just 7.
      endIndex = startIndex + assistancesLeft;
    }

    this.assistancePage = this.assistances.slice(startIndex, endIndex); //endIndex not included
    this.actualPage = page;
    this.loading = false;
  }

  editAssistance(assistanceId) {
    this.router.navigate([`/assistances/edit/${assistanceId}`]);
  }

  viewAssistance(assistanceId) {
    this.router.navigate([`/assistances/view/${assistanceId}`]);
  }

  setAssistanceToDelete(assistanceId) {
    this.assistanceToDeleteId = assistanceId;
  }

  deleteAssistance() {
    this.assistancesService.delete(this.assistanceToDeleteId).toPromise()
      .then(_ => {
        this.successMessage = 'Se ha eliminado el registro correctamente';
        this.errorMessage = '';
        this.assistanceToDeleteId = null;
        this.filterAssistances();
      })
      .catch(err => {
        this.successMessage = '';
        this.errorMessage = 'Hubo un error al intentar eliminar el registro';
        this.assistanceToDeleteId = null;
      });
  }

  filterAssistances() {
    this.loading = true;
    const searchParams = this.searchForm.value;
    for (let key in searchParams) {
      //Remove null fields
      if (!searchParams[key]) {
        delete searchParams[key];
      }
    }
    this.assistancesService.getAssistances(1, this.chunkSize, 'datetime', 'desc', searchParams).subscribe(
      assistances => {
        this.assistances = assistances.data;
        this.assistancePage = this.assistances.slice(0, 10); //last index is not included
        this.totalPages = Math.ceil(this.assistances.length / this.pageSize);

        //Separate violence types by commas
        this.assistances.map(assistance => {
          assistance.datetime = this.datePipe.transform(assistance.datetime, 'yyyy-MM-dd, hh:mm:ss', 'GMT');
          const violenceTypes = assistance.call.violence_types;
          assistance.formattedViolenceTypes = violenceTypes[0].name;
          for (let i = 1; i < violenceTypes.length; i++) {
            assistance.formattedViolenceTypes += ', ' + violenceTypes[i].name;
          }
        });
        this.loading = false;
      }
    );
  }

  cleanFilters() {
    this.searchForm.reset();
  }

}
