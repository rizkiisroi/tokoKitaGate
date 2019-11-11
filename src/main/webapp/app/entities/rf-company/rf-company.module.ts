import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { RfCompanyComponent } from './rf-company.component';
import { RfCompanyDetailComponent } from './rf-company-detail.component';
import { RfCompanyUpdateComponent } from './rf-company-update.component';
import { RfCompanyDeletePopupComponent, RfCompanyDeleteDialogComponent } from './rf-company-delete-dialog.component';
import { rfCompanyRoute, rfCompanyPopupRoute } from './rf-company.route';

const ENTITY_STATES = [...rfCompanyRoute, ...rfCompanyPopupRoute];

@NgModule({
  imports: [TokoKitaGateSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RfCompanyComponent,
    RfCompanyDetailComponent,
    RfCompanyUpdateComponent,
    RfCompanyDeleteDialogComponent,
    RfCompanyDeletePopupComponent
  ],
  entryComponents: [RfCompanyDeleteDialogComponent]
})
export class TokoKitaGateRfCompanyModule {}
