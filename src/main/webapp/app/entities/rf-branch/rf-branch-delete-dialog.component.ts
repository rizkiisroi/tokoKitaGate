import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from './rf-branch.service';

@Component({
  selector: 'jhi-rf-branch-delete-dialog',
  templateUrl: './rf-branch-delete-dialog.component.html'
})
export class RfBranchDeleteDialogComponent {
  rfBranch: IRfBranch;

  constructor(protected rfBranchService: RfBranchService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfBranchService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfBranchListModification',
        content: 'Deleted an rfBranch'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rf-branch-delete-popup',
  template: ''
})
export class RfBranchDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfBranch }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfBranchDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfBranch = rfBranch;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/rf-branch', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/rf-branch', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
