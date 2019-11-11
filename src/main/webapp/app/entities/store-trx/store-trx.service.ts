import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStoreTrx } from 'app/shared/model/store-trx.model';

type EntityResponseType = HttpResponse<IStoreTrx>;
type EntityArrayResponseType = HttpResponse<IStoreTrx[]>;

@Injectable({ providedIn: 'root' })
export class StoreTrxService {
  public resourceUrl = SERVER_API_URL + 'api/store-trxes';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/store-trxes';

  constructor(protected http: HttpClient) {}

  create(storeTrx: IStoreTrx): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeTrx);
    return this.http
      .post<IStoreTrx>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(storeTrx: IStoreTrx): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(storeTrx);
    return this.http
      .put<IStoreTrx>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStoreTrx>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStoreTrx[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStoreTrx[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(storeTrx: IStoreTrx): IStoreTrx {
    const copy: IStoreTrx = Object.assign({}, storeTrx, {
      trxDate: storeTrx.trxDate != null && storeTrx.trxDate.isValid() ? storeTrx.trxDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.trxDate = res.body.trxDate != null ? moment(res.body.trxDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((storeTrx: IStoreTrx) => {
        storeTrx.trxDate = storeTrx.trxDate != null ? moment(storeTrx.trxDate) : null;
      });
    }
    return res;
  }
}
