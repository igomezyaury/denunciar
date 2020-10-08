import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-origin-report',
  templateUrl: './origin-report.component.html',
  styleUrls: ['./origin-report.component.scss']
})
export class OriginReportComponent {
  public title: string = 'Llamadas por origen';
  public reportType: string = 'origin';

  constructor() { }

}
