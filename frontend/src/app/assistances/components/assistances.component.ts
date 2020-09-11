import { Component, OnInit } from '@angular/core';
import { AssistancesService } from '../assistances.service';

@Component({
  selector: 'app-assistances',
  templateUrl: './assistances.component.html',
  styleUrls: ['./assistances.component.scss']
})
export class AssistancesComponent implements OnInit {

  public assistances = [];
  constructor(private assistancesService: AssistancesService) {

   }

  ngOnInit(): void {
    this.assistancesService.getAllAssistances().subscribe(
      assistances => {
        this.assistances = assistances.data;

        //Separate violence types by commas
        this.assistances.map(assistance => {
          const violenceTypes = assistance.call.violence_types;
          assistance.formattedViolenceTypes = violenceTypes[0].name;
          for(let i = 1; i < violenceTypes.length; i++){
            assistance.formattedViolenceTypes += ', ' + violenceTypes[i].name;
          }
        });
      }
    );
  }


}
