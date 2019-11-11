import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';

@Component({
  selector: 'jhi-store-trx-details-detail',
  templateUrl: './store-trx-details-detail.component.html'
})
export class StoreTrxDetailsDetailComponent implements OnInit {
  storeTrxDetails: IStoreTrxDetails;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeTrxDetails }) => {
      this.storeTrxDetails = storeTrxDetails;
    });
  }

  previousState() {
    window.history.back();
  }
}
