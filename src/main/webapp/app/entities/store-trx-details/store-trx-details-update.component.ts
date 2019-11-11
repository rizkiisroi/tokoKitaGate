import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IStoreTrxDetails, StoreTrxDetails } from 'app/shared/model/store-trx-details.model';
import { StoreTrxDetailsService } from './store-trx-details.service';
import { IStoreTrx } from 'app/shared/model/store-trx.model';
import { StoreTrxService } from 'app/entities/store-trx/store-trx.service';

@Component({
  selector: 'jhi-store-trx-details-update',
  templateUrl: './store-trx-details-update.component.html'
})
export class StoreTrxDetailsUpdateComponent implements OnInit {
  isSaving: boolean;

  storetrxes: IStoreTrx[];

  editForm = this.fb.group({
    id: [],
    itemId: [null, [Validators.required, Validators.maxLength(100)]],
    finalPrice: [],
    discount: [],
    storeTrx: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected storeTrxDetailsService: StoreTrxDetailsService,
    protected storeTrxService: StoreTrxService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ storeTrxDetails }) => {
      this.updateForm(storeTrxDetails);
    });
    this.storeTrxService
      .query()
      .subscribe((res: HttpResponse<IStoreTrx[]>) => (this.storetrxes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(storeTrxDetails: IStoreTrxDetails) {
    this.editForm.patchValue({
      id: storeTrxDetails.id,
      itemId: storeTrxDetails.itemId,
      finalPrice: storeTrxDetails.finalPrice,
      discount: storeTrxDetails.discount,
      storeTrx: storeTrxDetails.storeTrx
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const storeTrxDetails = this.createFromForm();
    if (storeTrxDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.storeTrxDetailsService.update(storeTrxDetails));
    } else {
      this.subscribeToSaveResponse(this.storeTrxDetailsService.create(storeTrxDetails));
    }
  }

  private createFromForm(): IStoreTrxDetails {
    return {
      ...new StoreTrxDetails(),
      id: this.editForm.get(['id']).value,
      itemId: this.editForm.get(['itemId']).value,
      finalPrice: this.editForm.get(['finalPrice']).value,
      discount: this.editForm.get(['discount']).value,
      storeTrx: this.editForm.get(['storeTrx']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStoreTrxDetails>>) {
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

  trackStoreTrxById(index: number, item: IStoreTrx) {
    return item.id;
  }
}
