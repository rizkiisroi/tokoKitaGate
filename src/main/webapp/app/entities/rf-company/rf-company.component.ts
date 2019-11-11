import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IRfCompany } from 'app/shared/model/rf-company.model';
import { RfCompanyService } from './rf-company.service';

@Component({
  selector: 'jhi-rf-company',
  templateUrl: './rf-company.component.html'
})
export class RfCompanyComponent implements OnInit, OnDestroy {
  rfCompanies: IRfCompany[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected rfCompanyService: RfCompanyService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.rfCompanyService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRfCompany[]>) => (this.rfCompanies = res.body));
      return;
    }
    this.rfCompanyService.query().subscribe((res: HttpResponse<IRfCompany[]>) => {
      this.rfCompanies = res.body;
      this.currentSearch = '';
    });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInRfCompanies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfCompany) {
    return item.id;
  }

  registerChangeInRfCompanies() {
    this.eventSubscriber = this.eventManager.subscribe('rfCompanyListModification', () => this.loadAll());
  }
}
