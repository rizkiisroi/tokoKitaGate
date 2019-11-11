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
import { IStoreTrx, StoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from './store-trx.service';
import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';

@Component({
  selector: 'jhi-store-trx-update',
  templateUrl: './store-trx-update.component.html'
})
export class StoreTrxUpdateComponent implements OnInit {
  isSaving: boolean;

  rfbranches: IRfBranch[];

  editForm = this.fb.group({
    id: [],
    trxAmount: [],
    trxMethod: [],
    trxBy: [],
    trxDate: [],
    rfBranch: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected storeTrxService: StoreTrxService,
    protected rfBranchService: RfBranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ storeTrx }) => {
      this.updateForm(storeTrx);
    });
    this.rfBranchService.query({ filter: 'storetrx-is-null' }).subscribe(
      (res: HttpResponse<IRfBranch[]>) => {
        if (!this.editForm.get('rfBranch').value || !this.editForm.get('rfBranch').value.id) {
          this.rfbranches = res.body;
        } else {
          this.rfBranchService
            .find(this.editForm.get('rfBranch').value.id)
            .subscribe(
              (subRes: HttpResponse<IRfBranch>) => (this.rfbranches = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(storeTrx: IStoreTrx) {
    this.editForm.patchValue({
      id: storeTrx.id,
      trxAmount: storeTrx.trxAmount,
      trxMethod: storeTrx.trxMethod,
      trxBy: storeTrx.trxBy,
      trxDate: storeTrx.trxDate != null ? storeTrx.trxDate.format(DATE_TIME_FORMAT) : null,
      rfBranch: storeTrx.rfBranch
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const storeTrx = this.createFromForm();
    if (storeTrx.id !== undefined) {
      this.subscribeToSaveResponse(this.storeTrxService.update(storeTrx));
    } else {
      this.subscribeToSaveResponse(this.storeTrxService.create(storeTrx));
    }
  }

  private createFromForm(): IStoreTrx {
    return {
      ...new StoreTrx(),
      id: this.editForm.get(['id']).value,
      trxAmount: this.editForm.get(['trxAmount']).value,
      trxMethod: this.editForm.get(['trxMethod']).value,
      trxBy: this.editForm.get(['trxBy']).value,
      trxDate: this.editForm.get(['trxDate']).value != null ? moment(this.editForm.get(['trxDate']).value, DATE_TIME_FORMAT) : undefined,
      rfBranch: this.editForm.get(['rfBranch']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStoreTrx>>) {
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

  trackRfBranchById(index: number, item: IRfBranch) {
    return item.id;
  }
}
