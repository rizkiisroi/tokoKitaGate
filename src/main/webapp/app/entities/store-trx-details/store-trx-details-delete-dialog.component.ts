import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';
import { StoreTrxDetailsService } from './store-trx-details.service';

@Component({
  selector: 'jhi-store-trx-details-delete-dialog',
  templateUrl: './store-trx-details-delete-dialog.component.html'
})
export class StoreTrxDetailsDeleteDialogComponent {
  storeTrxDetails: IStoreTrxDetails;

  constructor(
    protected storeTrxDetailsService: StoreTrxDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.storeTrxDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'storeTrxDetailsListModification',
        content: 'Deleted an storeTrxDetails'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-store-trx-details-delete-popup',
  template: ''
})
export class StoreTrxDetailsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeTrxDetails }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StoreTrxDetailsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.storeTrxDetails = storeTrxDetails;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/store-trx-details', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/store-trx-details', { outlets: { popup: null } }]);
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
