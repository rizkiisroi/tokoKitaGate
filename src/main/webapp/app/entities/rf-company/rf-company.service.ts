import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRfCompany } from 'app/shared/model/rf-company.model';

type EntityResponseType = HttpResponse<IRfCompany>;
type EntityArrayResponseType = HttpResponse<IRfCompany[]>;

@Injectable({ providedIn: 'root' })
export class RfCompanyService {
  public resourceUrl = SERVER_API_URL + 'api/rf-companies';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/rf-companies';

  constructor(protected http: HttpClient) {}

  create(rfCompany: IRfCompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfCompany);
    return this.http
      .post<IRfCompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rfCompany: IRfCompany): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfCompany);
    return this.http
      .put<IRfCompany>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRfCompany>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfCompany[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfCompany[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(rfCompany: IRfCompany): IRfCompany {
    const copy: IRfCompany = Object.assign({}, rfCompany, {
      approvedDate: rfCompany.approvedDate != null && rfCompany.approvedDate.isValid() ? rfCompany.approvedDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.approvedDate = res.body.approvedDate != null ? moment(res.body.approvedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rfCompany: IRfCompany) => {
        rfCompany.approvedDate = rfCompany.approvedDate != null ? moment(rfCompany.approvedDate) : null;
      });
    }
    return res;
  }
}
