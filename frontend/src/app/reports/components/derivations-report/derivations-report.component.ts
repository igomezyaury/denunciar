import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AssistancesService } from '../../../assistances/assistances.service';

@Component({
  selector: 'app-derivations-report',
  templateUrl: './derivations-report.component.html',
  styleUrls: ['./derivations-report.component.scss']
})
export class DerivationsReportComponent {

  public formGroup: FormGroup;
  public errorMessage: string = '';
  public submitted: boolean = false;


  //Chart options
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Derivaciones' }
  ];


  constructor(private fb: FormBuilder, private assistancesService: AssistancesService) {
    this.formGroup = this.fb.group({
      fromDate: [null, Validators.compose([
        Validators.required,
        this.notFutureDate
      ])],
      toDate: [null, Validators.compose([
        Validators.required,
        this.notFutureDate
      ])]
    });
  }

  dateChange() {
    this.submitted = true;
    if (!this.validToDate() || !this.formGroup.valid) {
      return;
    }
    this.getReport();
  }

  private getReport() {
    // this.submitted = true;
    // if (!this.validToDate() || !this.formGroup.valid) {
    //   return;
    // }
    const fromDate = this.formGroup.controls.fromDate.value;
    const toDate = this.formGroup.controls.toDate.value;

    this.assistancesService.getCountByDerivationType(fromDate, toDate).subscribe((data: any) => {
      this.resetChart();
      if (data.length === 0) {
        this.errorMessage = 'No se encontraron derivaciones entre esas fechas';
      } else {
        this.errorMessage = '';
      }
      for (let i = 0; i < data.length; i++) {
        this.barChartLabels.push(data[i].name);
        this.barChartData[0].data.push(Number(data[i].assistance_count));
      }
    }
    )
  }

  private resetChart() {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
  }

  notFutureDate(control: FormControl): { [key: string]: boolean } | null {
    const currentDate = new Date();
    if (Date.parse(control.value) > currentDate.getTime()) {
      return { futureDate: true };
    }
    return null;
  }

  private validToDate() {
    const fromDate = this.formGroup.controls.fromDate.value;
    const toDate = this.formGroup.controls.toDate.value;
    if (Date.parse(fromDate) >= Date.parse(toDate)) {
      this.formGroup.controls.toDate.setErrors({ invalidToDate: true })
      return false;
    }
    const required = this.formGroup.controls.toDate.hasError('required');
    const futureDate = this.formGroup.controls.toDate.hasError('futureDate');
    if (required) {
      this.formGroup.controls.toDate.setErrors({ required: true });
    } else if (futureDate) {
      this.formGroup.controls.toDate.setErrors({ futureDate: true });
    } else {
      this.formGroup.controls.toDate.setErrors(null);
    }
    return true;
  }

}
