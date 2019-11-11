import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IRfItem } from 'app/shared/model/rf-item.model';
import { RfItemService } from './rf-item.service';

@Component({
  selector: 'jhi-rf-item',
  templateUrl: './rf-item.component.html'
})
export class RfItemComponent implements OnInit, OnDestroy {
  rfItems: IRfItem[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(protected rfItemService: RfItemService, protected eventManager: JhiEventManager, protected activatedRoute: ActivatedRoute) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.rfItemService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRfItem[]>) => (this.rfItems = res.body));
      return;
    }
    this.rfItemService.query().subscribe((res: HttpResponse<IRfItem[]>) => {
      this.rfItems = res.body;
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
    this.registerChangeInRfItems();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfItem) {
    return item.id;
  }

  registerChangeInRfItems() {
    this.eventSubscriber = this.eventManager.subscribe('rfItemListModification', () => this.loadAll());
  }
}
