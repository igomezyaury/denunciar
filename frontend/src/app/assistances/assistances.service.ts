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

  public getAssistances(pageNumber: number, pageSize: number, orderColumn: string, orderSense: string): Observable<any> {
    return this.http.get(this.assistancesApiUrl, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString(),
        'order_column': orderColumn,
        'order_sense': orderSense
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

  public getRepresentativeTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/representative-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getRelationshipTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/relationship-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getVulnerablePopulations(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/vulnerable-populations`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getDerivationTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/derivation-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getViolenceTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/violence-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getCities(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/cities`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getDisabilities(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/disabilities`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getOriginTypes(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/origin-types`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }

  public getComplaintReasons(pageNumber: number, pageSize: number) {
    return this.http.get(`${environment.API_URL}/complaint-reasons`, {
      params: {
        'page_number': pageNumber.toString(),
        'page_size': pageSize.toString()
      }
    });
  }
}