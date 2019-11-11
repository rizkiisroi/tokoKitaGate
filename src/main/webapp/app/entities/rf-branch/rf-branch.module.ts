import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { RfBranchComponent } from './rf-branch.component';
import { RfBranchDetailComponent } from './rf-branch-detail.component';
import { RfBranchUpdateComponent } from './rf-branch-update.component';
import { RfBranchDeletePopupComponent, RfBranchDeleteDialogComponent } from './rf-branch-delete-dialog.component';
import { rfBranchRoute, rfBranchPopupRoute } from './rf-branch.route';

const ENTITY_STATES = [...rfBranchRoute, ...rfBranchPopupRoute];

@NgModule({
  imports: [TokoKitaGateSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RfBranchComponent,
    RfBranchDetailComponent,
    RfBranchUpdateComponent,
    RfBranchDeleteDialogComponent,
    RfBranchDeletePopupComponent
  ],
  entryComponents: [RfBranchDeleteDialogComponent]
})
export class TokoKitaGateRfBranchModule {}
