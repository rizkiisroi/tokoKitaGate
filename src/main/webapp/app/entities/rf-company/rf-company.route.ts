import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RfCompany } from 'app/shared/model/rf-company.model';
import { RfCompanyService } from './rf-company.service';
import { RfCompanyComponent } from './rf-company.component';
import { RfCompanyDetailComponent } from './rf-company-detail.component';
import { RfCompanyUpdateComponent } from './rf-company-update.component';
import { RfCompanyDeletePopupComponent } from './rf-company-delete-dialog.component';
import { IRfCompany } from 'app/shared/model/rf-company.model';

@Injectable({ providedIn: 'root' })
export class RfCompanyResolve implements Resolve<IRfCompany> {
  constructor(private service: RfCompanyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfCompany> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((rfCompany: HttpResponse<RfCompany>) => rfCompany.body));
    }
    return of(new RfCompany());
  }
}

export const rfCompanyRoute: Routes = [
  {
    path: '',
    component: RfCompanyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfCompanies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfCompanyDetailComponent,
    resolve: {
      rfCompany: RfCompanyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfCompanies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfCompanyUpdateComponent,
    resolve: {
      rfCompany: RfCompanyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfCompanies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfCompanyUpdateComponent,
    resolve: {
      rfCompany: RfCompanyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfCompanies'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfCompanyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfCompanyDeletePopupComponent,
    resolve: {
      rfCompany: RfCompanyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfCompanies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
