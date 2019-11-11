import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';

type EntityResponseType = HttpResponse<IStoreTrxDetails>;
type EntityArrayResponseType = HttpResponse<IStoreTrxDetails[]>;

@Injectable({ providedIn: 'root' })
export class StoreTrxDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/store-trx-details';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/store-trx-details';

  constructor(protected http: HttpClient) {}

  create(storeTrxDetails: IStoreTrxDetails): Observable<EntityResponseType> {
    return this.http.post<IStoreTrxDetails>(this.resourceUrl, storeTrxDetails, { observe: 'response' });
  }

  update(storeTrxDetails: IStoreTrxDetails): Observable<EntityResponseType> {
    return this.http.put<IStoreTrxDetails>(this.resourceUrl, storeTrxDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStoreTrxDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStoreTrxDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStoreTrxDetails[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
