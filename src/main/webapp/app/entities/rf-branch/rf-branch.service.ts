import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRfBranch } from 'app/shared/model/rf-branch.model';

type EntityResponseType = HttpResponse<IRfBranch>;
type EntityArrayResponseType = HttpResponse<IRfBranch[]>;

@Injectable({ providedIn: 'root' })
export class RfBranchService {
  public resourceUrl = SERVER_API_URL + 'api/rf-branches';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/rf-branches';

  constructor(protected http: HttpClient) {}

  create(rfBranch: IRfBranch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfBranch);
    return this.http
      .post<IRfBranch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(rfBranch: IRfBranch): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(rfBranch);
    return this.http
      .put<IRfBranch>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRfBranch>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfBranch[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfBranch[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(rfBranch: IRfBranch): IRfBranch {
    const copy: IRfBranch = Object.assign({}, rfBranch, {
      registeredDate: rfBranch.registeredDate != null && rfBranch.registeredDate.isValid() ? rfBranch.registeredDate.toJSON() : null,
      approvedDate: rfBranch.approvedDate != null && rfBranch.approvedDate.isValid() ? rfBranch.approvedDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.registeredDate = res.body.registeredDate != null ? moment(res.body.registeredDate) : null;
      res.body.approvedDate = res.body.approvedDate != null ? moment(res.body.approvedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((rfBranch: IRfBranch) => {
        rfBranch.registeredDate = rfBranch.registeredDate != null ? moment(rfBranch.registeredDate) : null;
        rfBranch.approvedDate = rfBranch.approvedDate != null ? moment(rfBranch.approvedDate) : null;
      });
    }
    return res;
  }
}
