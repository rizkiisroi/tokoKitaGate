import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRfItem } from 'app/shared/model/rf-item.model';

type EntityResponseType = HttpResponse<IRfItem>;
type EntityArrayResponseType = HttpResponse<IRfItem[]>;

@Injectable({ providedIn: 'root' })
export class RfItemService {
  public resourceUrl = SERVER_API_URL + 'api/rf-items';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/rf-items';

  constructor(protected http: HttpClient) {}

  create(rfItem: IRfItem): Observable<EntityResponseType> {
    return this.http.post<IRfItem>(this.resourceUrl, rfItem, { observe: 'response' });
  }

  update(rfItem: IRfItem): Observable<EntityResponseType> {
    return this.http.put<IRfItem>(this.resourceUrl, rfItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRfItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRfItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRfItem[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
