import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from './store-trx.service';

@Component({
  selector: 'jhi-store-trx-delete-dialog',
  templateUrl: './store-trx-delete-dialog.component.html'
})
export class StoreTrxDeleteDialogComponent {
  storeTrx: IStoreTrx;

  constructor(protected storeTrxService: StoreTrxService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.storeTrxService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'storeTrxListModification',
        content: 'Deleted an storeTrx'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-store-trx-delete-popup',
  template: ''
})
export class StoreTrxDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ storeTrx }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StoreTrxDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.storeTrx = storeTrx;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/store-trx', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/store-trx', { outlets: { popup: null } }]);
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
