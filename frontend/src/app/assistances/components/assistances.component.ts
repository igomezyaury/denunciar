import { Component, OnInit } from '@angular/core';
import { AssistancesService } from '../assistances.service';

@Component({
  selector: 'app-assistances',
  templateUrl: './assistances.component.html',
  styleUrls: ['./assistances.component.scss']
})
export class AssistancesComponent implements OnInit {

  public assistances = [];
  public assistancePage = [];
  public actualPage: number = 1;
  public totalPages: number = 0;
  private pageSize: number = 10;

  private chunkSize: number = 99999999;

  constructor(private assistancesService: AssistancesService) {

  }

  ngOnInit(): void {
    this.assistancesService.getAssistances(1, this.chunkSize).subscribe(
      assistances => {
        this.assistances = assistances.data;
        this.assistancePage = this.assistances.slice(0, 10); //last index is not included
        this.totalPages = Math.ceil(this.assistances.length / this.pageSize);

        //Separate violence types by commas
        this.assistances.map(assistance => {
          const violenceTypes = assistance.call.violence_types;
          assistance.formattedViolenceTypes = violenceTypes[0].name;
          for (let i = 1; i < violenceTypes.length; i++) {
            assistance.formattedViolenceTypes += ', ' + violenceTypes[i].name;
          }
        });
      }
    );
  }

  async onPageChange(page: number) {
    const startIndex = this.pageSize * (page - 1);
    let endIndex = startIndex + this.pageSize;

    const assistancesLeft = this.assistances.length - startIndex;

    if (assistancesLeft < this.pageSize) {
      //Example: We have 7 assistances left and the page size is 10. We show just 7.
      endIndex = startIndex + assistancesLeft;
    }

    this.assistancePage = this.assistances.slice(startIndex, endIndex); //endIndex not included
    this.actualPage = page;
  }


}
