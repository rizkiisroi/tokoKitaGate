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
import { IRfCompany, RfCompany } from 'app/shared/model/rf-company.model';
import { RfCompanyService } from './rf-company.service';
import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';

@Component({
  selector: 'jhi-rf-company-update',
  templateUrl: './rf-company-update.component.html'
})
export class RfCompanyUpdateComponent implements OnInit {
  isSaving: boolean;

  rfbranches: IRfBranch[];

  editForm = this.fb.group({
    id: [],
    companyName: [],
    registeredBy: [],
    registeredDate: [],
    approvedBy: [],
    approvedDate: [],
    active: [],
    rfBranch: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected rfCompanyService: RfCompanyService,
    protected rfBranchService: RfBranchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rfCompany }) => {
      this.updateForm(rfCompany);
    });
    this.rfBranchService
      .query()
      .subscribe((res: HttpResponse<IRfBranch[]>) => (this.rfbranches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(rfCompany: IRfCompany) {
    this.editForm.patchValue({
      id: rfCompany.id,
      companyName: rfCompany.companyName,
      registeredBy: rfCompany.registeredBy,
      registeredDate: rfCompany.registeredDate,
      approvedBy: rfCompany.approvedBy,
      approvedDate: rfCompany.approvedDate != null ? rfCompany.approvedDate.format(DATE_TIME_FORMAT) : null,
      active: rfCompany.active,
      rfBranch: rfCompany.rfBranch
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rfCompany = this.createFromForm();
    if (rfCompany.id !== undefined) {
      this.subscribeToSaveResponse(this.rfCompanyService.update(rfCompany));
    } else {
      this.subscribeToSaveResponse(this.rfCompanyService.create(rfCompany));
    }
  }

  private createFromForm(): IRfCompany {
    return {
      ...new RfCompany(),
      id: this.editForm.get(['id']).value,
      companyName: this.editForm.get(['companyName']).value,
      registeredBy: this.editForm.get(['registeredBy']).value,
      registeredDate: this.editForm.get(['registeredDate']).value,
      approvedBy: this.editForm.get(['approvedBy']).value,
      approvedDate:
        this.editForm.get(['approvedDate']).value != null ? moment(this.editForm.get(['approvedDate']).value, DATE_TIME_FORMAT) : undefined,
      active: this.editForm.get(['active']).value,
      rfBranch: this.editForm.get(['rfBranch']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfCompany>>) {
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
