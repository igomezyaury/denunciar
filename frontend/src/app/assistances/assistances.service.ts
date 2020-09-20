import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AssistancesService {

  assistancesApiUrl: string = environment.API_URL + '/assistances';

  constructor(
    private http: HttpClient
  ) { }

  public getAssistances(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(this.assistancesApiUrl, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getAssistanceById(id) {
    return this.http.get(`${this.assistancesApiUrl}/${id}`);
  }

  public createAssistance(fields) {
    return this.http.post(this.assistancesApiUrl, fields);
  }

  public updateAssistance(id, fields) {
    return this.http.put(`${this.assistancesApiUrl}/${id}`, fields);
  }

  public getRepresentativeTypes() {
    return this.http.get(`${environment.API_URL}/representative-types`);
  }

  public getRelationshipTypes() {
    return this.http.get(`${environment.API_URL}/relationship-types`);
  }

  public getVulnerablePopulations() {
    return this.http.get(`${environment.API_URL}/vulnerable-populations`);
  }

  public getDerivationTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/derivation-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getViolenceTypes() {
    return this.http.get(`${environment.API_URL}/violence-types`);
  }

  public getCities() {
    return this.http.get(`${environment.API_URL}/cities`);
  }

  public getDisabilities() {
    return this.http.get(`${environment.API_URL}/disabilities`);
  }
}