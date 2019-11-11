import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from './store-trx.service';
import { StoreTrxComponent } from './store-trx.component';
import { StoreTrxDetailComponent } from './store-trx-detail.component';
import { StoreTrxUpdateComponent } from './store-trx-update.component';
import { StoreTrxDeletePopupComponent } from './store-trx-delete-dialog.component';
import { IStoreTrx } from 'app/shared/model/store-trx.model';

@Injectable({ providedIn: 'root' })
export class StoreTrxResolve implements Resolve<IStoreTrx> {
  constructor(private service: StoreTrxService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreTrx> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((storeTrx: HttpResponse<StoreTrx>) => storeTrx.body));
    }
    return of(new StoreTrx());
  }
}

export const storeTrxRoute: Routes = [
  {
    path: '',
    component: StoreTrxComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StoreTrxDetailComponent,
    resolve: {
      storeTrx: StoreTrxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StoreTrxUpdateComponent,
    resolve: {
      storeTrx: StoreTrxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StoreTrxUpdateComponent,
    resolve: {
      storeTrx: StoreTrxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const storeTrxPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StoreTrxDeletePopupComponent,
    resolve: {
      storeTrx: StoreTrxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
