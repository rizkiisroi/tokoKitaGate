import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreTrxDetails } from 'app/shared/model/store-trx-details.model';
import { StoreTrxDetailsService } from './store-trx-details.service';
import { StoreTrxDetailsComponent } from './store-trx-details.component';
import { StoreTrxDetailsDetailComponent } from './store-trx-details-detail.component';
import { StoreTrxDetailsUpdateComponent } from './store-trx-details-update.component';
import { StoreTrxDetailsDeletePopupComponent } from './store-trx-details-delete-dialog.component';
import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';

@Injectable({ providedIn: 'root' })
export class StoreTrxDetailsResolve implements Resolve<IStoreTrxDetails> {
  constructor(private service: StoreTrxDetailsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreTrxDetails> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((storeTrxDetails: HttpResponse<StoreTrxDetails>) => storeTrxDetails.body));
    }
    return of(new StoreTrxDetails());
  }
}

export const storeTrxDetailsRoute: Routes = [
  {
    path: '',
    component: StoreTrxDetailsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StoreTrxDetailsDetailComponent,
    resolve: {
      storeTrxDetails: StoreTrxDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StoreTrxDetailsUpdateComponent,
    resolve: {
      storeTrxDetails: StoreTrxDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxDetails'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StoreTrxDetailsUpdateComponent,
    resolve: {
      storeTrxDetails: StoreTrxDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxDetails'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const storeTrxDetailsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StoreTrxDetailsDeletePopupComponent,
    resolve: {
      storeTrxDetails: StoreTrxDetailsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'StoreTrxDetails'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
