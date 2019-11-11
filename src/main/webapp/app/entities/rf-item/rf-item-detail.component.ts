import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfItem } from 'app/shared/model/rf-item.model';

@Component({
  selector: 'jhi-rf-item-detail',
  templateUrl: './rf-item-detail.component.html'
})
export class RfItemDetailComponent implements OnInit {
  rfItem: IRfItem;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfItem }) => {
      this.rfItem = rfItem;
    });
  }

  previousState() {
    window.history.back();
  }
}
