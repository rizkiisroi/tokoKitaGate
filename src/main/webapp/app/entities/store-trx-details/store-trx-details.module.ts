import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { StoreTrxDetailsComponent } from './store-trx-details.component';
import { StoreTrxDetailsDetailComponent } from './store-trx-details-detail.component';
import { StoreTrxDetailsUpdateComponent } from './store-trx-details-update.component';
import { StoreTrxDetailsDeletePopupComponent, StoreTrxDetailsDeleteDialogComponent } from './store-trx-details-delete-dialog.component';
import { storeTrxDetailsRoute, storeTrxDetailsPopupRoute } from './store-trx-details.route';

const ENTITY_STATES = [...storeTrxDetailsRoute, ...storeTrxDetailsPopupRoute];

@NgModule({
  imports: [TokoKitaGateSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StoreTrxDetailsComponent,
    StoreTrxDetailsDetailComponent,
    StoreTrxDetailsUpdateComponent,
    StoreTrxDetailsDeleteDialogComponent,
    StoreTrxDetailsDeletePopupComponent
  ],
  entryComponents: [StoreTrxDetailsDeleteDialogComponent]
})
export class TokoKitaGateStoreTrxDetailsModule {}
