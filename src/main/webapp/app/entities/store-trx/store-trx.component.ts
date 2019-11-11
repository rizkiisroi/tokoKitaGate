import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from './store-trx.service';

@Component({
  selector: 'jhi-store-trx',
  templateUrl: './store-trx.component.html'
})
export class StoreTrxComponent implements OnInit, OnDestroy {
  storeTrxes: IStoreTrx[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected storeTrxService: StoreTrxService,
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
      this.storeTrxService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IStoreTrx[]>) => (this.storeTrxes = res.body));
      return;
    }
    this.storeTrxService.query().subscribe((res: HttpResponse<IStoreTrx[]>) => {
      this.storeTrxes = res.body;
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
    this.registerChangeInStoreTrxes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStoreTrx) {
    return item.id;
  }

  registerChangeInStoreTrxes() {
    this.eventSubscriber = this.eventManager.subscribe('storeTrxListModification', () => this.loadAll());
  }
}
