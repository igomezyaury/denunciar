import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { AssistancesService } from 'src/app/assistances/assistances.service';
import { colors } from './report-colors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  @Input()
  public reportChartType: string;

  public formGroup: FormGroup;
  public errorMessage: string = '';
  public submitted: boolean = false;

  @Input()
  public reportType: string;

  @Input()
  public title: string;

  private chartLabels = {
    derivation: 'Derivaciones',
    violence: 'Tipos de violencia',
    origin: 'Orígenes',
    vulnerablePopulation: 'Poblaciones vulnerables'
  }

  //Bar chart options
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
    { data: [] }
  ];

  //Pie chart options
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any[] = [
    {
      backgroundColor: colors
    }
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
    const fromDate = this.formGroup.controls.fromDate.value;
    const toDate = this.formGroup.controls.toDate.value;

    this.assistancesService.getCountByType(fromDate, toDate, this.reportType).subscribe((data: any) => {
      this.resetChart();
      if (data.length === 0) {
        this.errorMessage = 'No se encontraron llamadas entre esas fechas';
      } else {
        this.errorMessage = '';
      }
      this.barChartData[0].label = this.chartLabels[this.reportType];
      for (let i = 0; i < data.length; i++) {
        this.barChartLabels.push(data[i].name);
        this.pieChartLabels.push(data[i].name);
        this.barChartData[0].data.push(Number(data[i].assistance_count));
        this.pieChartData.push(Number(data[i].assistance_count));
      }
    }
    )
  }

  private resetChart() {
    this.barChartLabels = [];
    this.barChartData[0].data = [];
    this.pieChartLabels = [];
    this.pieChartData = [];
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
