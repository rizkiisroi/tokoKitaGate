import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStoreTrx } from 'app/shared/model/store-trx.model';

@Component({
  selector: 'jhi-store-trx-detail',
  templateUrl: './store-trx-detail.component.html'
})
export class StoreTrxDetailComponent implements OnInit {
  storeTrx: IStoreTrx;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeTrx }) => {
      this.storeTrx = storeTrx;
    });
  }

  previousState() {
    window.history.back();
  }
}
