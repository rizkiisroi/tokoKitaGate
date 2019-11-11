import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfCompany } from 'app/shared/model/rf-company.model';

@Component({
  selector: 'jhi-rf-company-detail',
  templateUrl: './rf-company-detail.component.html'
})
export class RfCompanyDetailComponent implements OnInit {
  rfCompany: IRfCompany;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfCompany }) => {
      this.rfCompany = rfCompany;
    });
  }

  previousState() {
    window.history.back();
  }
}
