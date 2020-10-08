import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class AssistancesService {

  assistancesApiUrl: string = environment.API_URL + '/assistances';
  model;

  constructor(
    private http: HttpClient
  ) {
    tf.loadLayersModel(
      'https://firebasestorage.googleapis.com/v0/b/denunciar-648d1.appspot.com/o/model.json?alt=media',
      {
        weightPathPrefix: '',
        weightUrlConverter: name => Promise.resolve('https://firebasestorage.googleapis.com/v0/b/denunciar-648d1.appspot.com/o/weights.bin?alt=media')
      }
    ).then(model => this.model = model);
  }

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

  public async predictCode(
    lifeRisk: boolean,
    counseling: boolean,
    originTypeId: number,
    complaintReasonId: number,
    violenceTypesIds: number[]
  ) {
    const featuresArray = [
      this.getOriginFeature(originTypeId),
      this.getReasonFeature(complaintReasonId),
      this.getViolenceTypesFeature(violenceTypesIds),
      this.getBooleanFeature(lifeRisk),
      this.getBooleanFeature(counseling)
    ];
    const data = tf.tensor3d([featuresArray], undefined, 'bool');
    const result = this.model.predict(data, { verbose: true, batchSize: 3 });
    return result.data().then(d => {
      const codeDictionary = {
        0: 'a',
        1: 'b',
        2: 'c'
      };
      const max = Math.max(...d);
      return codeDictionary[d.indexOf(max)];
    });
  }

  private getOriginFeature(originTypeId: number) {
    const originDictionary = {
      undefined: 0,
      242: 1,
      253: 2,
      248: 3,
      243: 4,
      241: 5,
      245: 6,
      244: 7,
      251: 8,
      246: 9,
      250: 10,
      252: 11,
      247: 12,
      249: 13
    };
    const origin = originDictionary[originTypeId];
    return [
      origin === 0,
      origin === 1,
      origin === 2,
      origin === 3,
      origin === 4,
      origin === 5,
      origin === 6,
      origin === 7,
      origin === 8,
      origin === 9,
      origin === 10,
      origin === 11,
      origin === 12,
      origin === 13,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
  }

  private getReasonFeature(complaintReasonId: number) {
    const reasonDictionary = {
      245: 0,
      241: 1,
      251: 2,
      243: 3,
      242: 4,
      253: 5,
      248: 6,
      247: 7,
      252: 8,
      249: 9,
      246: 10,
      244: 11,
      250: 12
    };
    const reason = reasonDictionary[complaintReasonId];
    return [
      reason === 0,
      reason === 1,
      reason === 2,
      reason === 3,
      reason === 4,
      reason === 5,
      reason === 6,
      reason === 7,
      reason === 8,
      reason === 9,
      reason === 10,
      reason === 11,
      reason === 12,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
  }

  private getViolenceTypesFeature(violenceTypesIds: number[]) {
    const violenceTypesDictionary = {
      242: 0,
      245: 1,
      4: 2,
      1: 3,
      250: 4,
      252: 5,
      243: 6,
      247: 7,
      253: 8,
      2: 9,
      246: 10,
      244: 11,
      251: 12,
      248: 13,
      254: 14,
      241: 15,
      256: 16,
      255: 17,
      5: 18,
      3: 19,
      249: 20
    };
    const violenceTypes = violenceTypesIds.map(typeId => violenceTypesDictionary[typeId]);
    return [
      violenceTypes.includes(0),
      violenceTypes.includes(1),
      violenceTypes.includes(2),
      violenceTypes.includes(3),
      violenceTypes.includes(4),
      violenceTypes.includes(5),
      violenceTypes.includes(6),
      violenceTypes.includes(7),
      violenceTypes.includes(8),
      violenceTypes.includes(9),
      violenceTypes.includes(10),
      violenceTypes.includes(11),
      violenceTypes.includes(12),
      violenceTypes.includes(13),
      violenceTypes.includes(14),
      violenceTypes.includes(15),
      violenceTypes.includes(16),
      violenceTypes.includes(17),
      violenceTypes.includes(18),
      violenceTypes.includes(19),
      violenceTypes.includes(20)
    ];
  }

  private getBooleanFeature(flag: boolean) {
    return [
      !flag,
      flag,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
  }

  /**
   * Reports
   */
  public getCountByType(fromDate, toDate, type: string) {
    return this.http.get(`${this.assistancesApiUrl}/count-by-${type}-type`, {
      params: {
        'from_date': fromDate,
        'to_date': toDate
      }
    });
  }
}
