import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { TokoKitaGateSharedModule } from 'app/shared/shared.module';
import { TokoKitaGateCoreModule } from 'app/core/core.module';
import { TokoKitaGateAppRoutingModule } from './app-routing.module';
import { TokoKitaGateHomeModule } from './home/home.module';
import { TokoKitaGateEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    TokoKitaGateSharedModule,
    TokoKitaGateCoreModule,
    TokoKitaGateHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TokoKitaGateEntityModule,
    TokoKitaGateAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class TokoKitaGateAppModule {}
