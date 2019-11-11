import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfCompanyUpdateComponent } from 'app/entities/rf-company/rf-company-update.component';
import { RfCompanyService } from 'app/entities/rf-company/rf-company.service';
import { RfCompany } from 'app/shared/model/rf-company.model';

describe('Component Tests', () => {
  describe('RfCompany Management Update Component', () => {
    let comp: RfCompanyUpdateComponent;
    let fixture: ComponentFixture<RfCompanyUpdateComponent>;
    let service: RfCompanyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfCompanyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfCompanyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfCompanyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfCompanyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfCompany(123);
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
        const entity = new RfCompany();
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
