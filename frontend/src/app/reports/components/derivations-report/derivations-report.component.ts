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

  public title: string = 'Llamadas por derivación';
  public reportType: string = 'derivation';

  constructor() { }

}
