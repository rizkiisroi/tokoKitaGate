import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { StoreTrxComponent } from './store-trx.component';
import { StoreTrxDetailComponent } from './store-trx-detail.component';
import { StoreTrxUpdateComponent } from './store-trx-update.component';
import { StoreTrxDeletePopupComponent, StoreTrxDeleteDialogComponent } from './store-trx-delete-dialog.component';
import { storeTrxRoute, storeTrxPopupRoute } from './store-trx.route';

const ENTITY_STATES = [...storeTrxRoute, ...storeTrxPopupRoute];

@NgModule({
  imports: [TokoKitaGateSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StoreTrxComponent,
    StoreTrxDetailComponent,
    StoreTrxUpdateComponent,
    StoreTrxDeleteDialogComponent,
    StoreTrxDeletePopupComponent
  ],
  entryComponents: [StoreTrxDeleteDialogComponent]
})
export class TokoKitaGateStoreTrxModule {}
