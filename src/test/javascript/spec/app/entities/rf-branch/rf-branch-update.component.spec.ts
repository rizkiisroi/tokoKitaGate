import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfBranchUpdateComponent } from 'app/entities/rf-branch/rf-branch-update.component';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';
import { RfBranch } from 'app/shared/model/rf-branch.model';

describe('Component Tests', () => {
  describe('RfBranch Management Update Component', () => {
    let comp: RfBranchUpdateComponent;
    let fixture: ComponentFixture<RfBranchUpdateComponent>;
    let service: RfBranchService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfBranchUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfBranchUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfBranchUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfBranchService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfBranch(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfBranch();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
