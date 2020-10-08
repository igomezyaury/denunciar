import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-violence-report',
  templateUrl: './violence-report.component.html',
  styleUrls: ['./violence-report.component.scss']
})
export class ViolenceReportComponent {

  public title: string = 'Llamadas por tipo de violencia';
  public reportType: string = 'violence';

  constructor() { }

}
