import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from './rf-branch.service';
import { RfBranchComponent } from './rf-branch.component';
import { RfBranchDetailComponent } from './rf-branch-detail.component';
import { RfBranchUpdateComponent } from './rf-branch-update.component';
import { RfBranchDeletePopupComponent } from './rf-branch-delete-dialog.component';
import { IRfBranch } from 'app/shared/model/rf-branch.model';

@Injectable({ providedIn: 'root' })
export class RfBranchResolve implements Resolve<IRfBranch> {
  constructor(private service: RfBranchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfBranch> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((rfBranch: HttpResponse<RfBranch>) => rfBranch.body));
    }
    return of(new RfBranch());
  }
}

export const rfBranchRoute: Routes = [
  {
    path: '',
    component: RfBranchComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfBranches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RfBranchDetailComponent,
    resolve: {
      rfBranch: RfBranchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfBranches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RfBranchUpdateComponent,
    resolve: {
      rfBranch: RfBranchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfBranches'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RfBranchUpdateComponent,
    resolve: {
      rfBranch: RfBranchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfBranches'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rfBranchPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RfBranchDeletePopupComponent,
    resolve: {
      rfBranch: RfBranchResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RfBranches'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
