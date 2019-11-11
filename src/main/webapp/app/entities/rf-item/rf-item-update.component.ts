import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRfItem, RfItem } from 'app/shared/model/rf-item.model';
import { RfItemService } from './rf-item.service';
import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';

@Component({
  selector: 'jhi-rf-item-update',
  templateUrl: './rf-item-update.component.html'
})
export class RfItemUpdateComponent implements OnInit {
  isSaving: boolean;

  rfbranches: IRfBranch[];

  editForm = this.fb.group({
    id: [],
    itemDesc: [],
    qty: [],
    netPrice: [],
    sellPrice: [],
    tax: [],
    active: [],
    rfBranch: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfItemService: RfItemService,
    protected rfBranchService: RfBranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfItem }) => {
      this.updateForm(rfItem);
    });
    this.rfBranchService.query({ filter: 'rfitem-is-null' }).subscribe(
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

  updateForm(rfItem: IRfItem) {
    this.editForm.patchValue({
      id: rfItem.id,
      itemDesc: rfItem.itemDesc,
      qty: rfItem.qty,
      netPrice: rfItem.netPrice,
      sellPrice: rfItem.sellPrice,
      tax: rfItem.tax,
      active: rfItem.active,
      rfBranch: rfItem.rfBranch
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfItem = this.createFromForm();
    if (rfItem.id !== undefined) {
      this.subscribeToSaveResponse(this.rfItemService.update(rfItem));
    } else {
      this.subscribeToSaveResponse(this.rfItemService.create(rfItem));
    }
  }

  private createFromForm(): IRfItem {
    return {
      ...new RfItem(),
      id: this.editForm.get(['id']).value,
      itemDesc: this.editForm.get(['itemDesc']).value,
      qty: this.editForm.get(['qty']).value,
      netPrice: this.editForm.get(['netPrice']).value,
      sellPrice: this.editForm.get(['sellPrice']).value,
      tax: this.editForm.get(['tax']).value,
      active: this.editForm.get(['active']).value,
      rfBranch: this.editForm.get(['rfBranch']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfItem>>) {
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
