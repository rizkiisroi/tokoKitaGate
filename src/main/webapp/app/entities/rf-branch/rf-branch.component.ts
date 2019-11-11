import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from './rf-branch.service';

@Component({
  selector: 'jhi-rf-branch',
  templateUrl: './rf-branch.component.html'
})
export class RfBranchComponent implements OnInit, OnDestroy {
  rfBranches: IRfBranch[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected rfBranchService: RfBranchService,
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
      this.rfBranchService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRfBranch[]>) => (this.rfBranches = res.body));
      return;
    }
    this.rfBranchService.query().subscribe((res: HttpResponse<IRfBranch[]>) => {
      this.rfBranches = res.body;
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
    this.registerChangeInRfBranches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRfBranch) {
    return item.id;
  }

  registerChangeInRfBranches() {
    this.eventSubscriber = this.eventManager.subscribe('rfBranchListModification', () => this.loadAll());
  }
}
