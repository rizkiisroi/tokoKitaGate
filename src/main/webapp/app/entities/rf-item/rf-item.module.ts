import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { RfItemComponent } from './rf-item.component';
import { RfItemDetailComponent } from './rf-item-detail.component';
import { RfItemUpdateComponent } from './rf-item-update.component';
import { RfItemDeletePopupComponent, RfItemDeleteDialogComponent } from './rf-item-delete-dialog.component';
import { rfItemRoute, rfItemPopupRoute } from './rf-item.route';

const ENTITY_STATES = [...rfItemRoute, ...rfItemPopupRoute];

@NgModule({
  imports: [TokoKitaGateSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RfItemComponent, RfItemDetailComponent, RfItemUpdateComponent, RfItemDeleteDialogComponent, RfItemDeletePopupComponent],
  entryComponents: [RfItemDeleteDialogComponent]
})
export class TokoKitaGateRfItemModule {}
