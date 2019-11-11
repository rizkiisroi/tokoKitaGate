import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRfBranch, RfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from './rf-branch.service';
import { IRfItem } from 'app/shared/model/rf-item.model';
import { RfItemService } from 'app/entities/rf-item/rf-item.service';
import { IStoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from 'app/entities/store-trx/store-trx.service';

@Component({
  selector: 'jhi-rf-branch-update',
  templateUrl: './rf-branch-update.component.html'
})
export class RfBranchUpdateComponent implements OnInit {
  isSaving: boolean;

  rfitems: IRfItem[];

  storetrxes: IStoreTrx[];

  editForm = this.fb.group({
    id: [],
    branchName: [],
    branchAddress: [],
    branchCity: [],
    branchPhone: [],
    registeredBy: [],
    registeredDate: [],
    approvedBy: [],
    approvedDate: [],
    active: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfBranchService: RfBranchService,
    protected rfItemService: RfItemService,
    protected storeTrxService: StoreTrxService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfBranch }) => {
      this.updateForm(rfBranch);
    });
    this.rfItemService
      .query()
      .subscribe((res: HttpResponse<IRfItem[]>) => (this.rfitems = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.storeTrxService
      .query()
      .subscribe((res: HttpResponse<IStoreTrx[]>) => (this.storetrxes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rfBranch: IRfBranch) {
    this.editForm.patchValue({
      id: rfBranch.id,
      branchName: rfBranch.branchName,
      branchAddress: rfBranch.branchAddress,
      branchCity: rfBranch.branchCity,
      branchPhone: rfBranch.branchPhone,
      registeredBy: rfBranch.registeredBy,
      registeredDate: rfBranch.registeredDate != null ? rfBranch.registeredDate.format(DATE_TIME_FORMAT) : null,
      approvedBy: rfBranch.approvedBy,
      approvedDate: rfBranch.approvedDate != null ? rfBranch.approvedDate.format(DATE_TIME_FORMAT) : null,
      active: rfBranch.active
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfBranch = this.createFromForm();
    if (rfBranch.id !== undefined) {
      this.subscribeToSaveResponse(this.rfBranchService.update(rfBranch));
    } else {
      this.subscribeToSaveResponse(this.rfBranchService.create(rfBranch));
    }
  }

  private createFromForm(): IRfBranch {
    return {
      ...new RfBranch(),
      id: this.editForm.get(['id']).value,
      branchName: this.editForm.get(['branchName']).value,
      branchAddress: this.editForm.get(['branchAddress']).value,
      branchCity: this.editForm.get(['branchCity']).value,
      branchPhone: this.editForm.get(['branchPhone']).value,
      registeredBy: this.editForm.get(['registeredBy']).value,
      registeredDate:
        this.editForm.get(['registeredDate']).value != null
          ? moment(this.editForm.get(['registeredDate']).value, DATE_TIME_FORMAT)
          : undefined,
      approvedBy: this.editForm.get(['approvedBy']).value,
      approvedDate:
        this.editForm.get(['approvedDate']).value != null ? moment(this.editForm.get(['approvedDate']).value, DATE_TIME_FORMAT) : undefined,
      active: this.editForm.get(['active']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfBranch>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRfItemById(index: number, item: IRfItem) {
    return item.id;
  }

  trackStoreTrxById(index: number, item: IStoreTrx) {
    return item.id;
  }
}
