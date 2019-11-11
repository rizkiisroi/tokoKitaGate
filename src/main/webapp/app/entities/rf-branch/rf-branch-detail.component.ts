import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRfBranch } from 'app/shared/model/rf-branch.model';

@Component({
  selector: 'jhi-rf-branch-detail',
  templateUrl: './rf-branch-detail.component.html'
})
export class RfBranchDetailComponent implements OnInit {
  rfBranch: IRfBranch;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfBranch }) => {
      this.rfBranch = rfBranch;
    });
  }

  previousState() {
    window.history.back();
  }
}
