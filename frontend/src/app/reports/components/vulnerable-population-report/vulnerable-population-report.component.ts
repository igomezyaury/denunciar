import { Component } from '@angular/core';

@Component({
  selector: 'app-vulnerable-population-report',
  templateUrl: './vulnerable-population-report.component.html',
  styleUrls: ['./vulnerable-population-report.component.scss']
})
export class VulnerablePopulationReportComponent {
  public title: string = 'Llamadas por población vulnerable';
  public reportType: string = 'vulnerablePopulation';

  constructor() { }

}
