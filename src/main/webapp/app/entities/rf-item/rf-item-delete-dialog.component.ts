import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfItem } from 'app/shared/model/rf-item.model';
import { RfItemService } from './rf-item.service';

@Component({
  selector: 'jhi-rf-item-delete-dialog',
  templateUrl: './rf-item-delete-dialog.component.html'
})
export class RfItemDeleteDialogComponent {
  rfItem: IRfItem;

  constructor(protected rfItemService: RfItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfItemListModification',
        content: 'Deleted an rfItem'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rf-item-delete-popup',
  template: ''
})
export class RfItemDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfItem }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfItemDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfItem = rfItem;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/rf-item', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/rf-item', { outlets: { popup: null } }]);
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
