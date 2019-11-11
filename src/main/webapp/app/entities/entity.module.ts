import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'rf-company',
        loadChildren: () => import('./rf-company/rf-company.module').then(m => m.TokoKitaGateRfCompanyModule)
      },
      {
        path: 'rf-branch',
        loadChildren: () => import('./rf-branch/rf-branch.module').then(m => m.TokoKitaGateRfBranchModule)
      },
      {
        path: 'store-trx',
        loadChildren: () => import('./store-trx/store-trx.module').then(m => m.TokoKitaGateStoreTrxModule)
      },
      {
        path: 'store-trx-details',
        loadChildren: () => import('./store-trx-details/store-trx-details.module').then(m => m.TokoKitaGateStoreTrxDetailsModule)
      },
      {
        path: 'rf-item',
        loadChildren: () => import('./rf-item/rf-item.module').then(m => m.TokoKitaGateRfItemModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TokoKitaGateEntityModule {}
