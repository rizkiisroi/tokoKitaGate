import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';
import { StoreTrxDetailsService } from './store-trx-details.service';

@Component({
  selector: 'jhi-store-trx-details',
  templateUrl: './store-trx-details.component.html'
})
export class StoreTrxDetailsComponent implements OnInit, OnDestroy {
  storeTrxDetails: IStoreTrxDetails[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected storeTrxDetailsService: StoreTrxDetailsService,
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
      this.storeTrxDetailsService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IStoreTrxDetails[]>) => (this.storeTrxDetails = res.body));
      return;
    }
    this.storeTrxDetailsService.query().subscribe((res: HttpResponse<IStoreTrxDetails[]>) => {
      this.storeTrxDetails = res.body;
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
    this.registerChangeInStoreTrxDetails();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStoreTrxDetails) {
    return item.id;
  }

  registerChangeInStoreTrxDetails() {
    this.eventSubscriber = this.eventManager.subscribe('storeTrxDetailsListModification', () => this.loadAll());
  }
}
