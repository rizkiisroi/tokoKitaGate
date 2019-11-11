import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfCompany } from 'app/shared/model/rf-company.model';
import { RfCompanyService } from './rf-company.service';

@Component({
  selector: 'jhi-rf-company-delete-dialog',
  templateUrl: './rf-company-delete-dialog.component.html'
})
export class RfCompanyDeleteDialogComponent {
  rfCompany: IRfCompany;

  constructor(protected rfCompanyService: RfCompanyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.rfCompanyService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'rfCompanyListModification',
        content: 'Deleted an rfCompany'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-rf-company-delete-popup',
  template: ''
})
export class RfCompanyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ rfCompany }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RfCompanyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.rfCompany = rfCompany;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/rf-company', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/rf-company', { outlets: { popup: null } }]);
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
