import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RfItem } from 'app/shared/model/rf-item.model';
import { RfItemService } from './rf-item.service';
import { RfItemComponent } from './rf-item.component';
import { RfItemDetailComponent } from './rf-item-detail.component';
import { RfItemUpdateComponent } from './rf-item-update.component';
import { RfItemDeletePopupComponent } from './rf-item-delete-dialog.component';
import { IRfItem } from 'app/shared/model/rf-item.model';

@Injectable({ providedIn: 'root' })
export class RfItemResolve implements Resolve<IRfItem> {
  constructor(private service: RfItemService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfItem> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((rfItem: HttpResponse<RfItem>) => rfItem.body));
    }
    return of(new RfItem());
  }
}

export const rfItemRoute: Routes = [
  {
    path: '',
    component: RfItemComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfItemDetailComponent,
    resolve: {
      rfItem: RfItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfItemUpdateComponent,
    resolve: {
      rfItem: RfItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfItems'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfItemUpdateComponent,
    resolve: {
      rfItem: RfItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfItems'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfItemPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfItemDeletePopupComponent,
    resolve: {
      rfItem: RfItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfItems'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
