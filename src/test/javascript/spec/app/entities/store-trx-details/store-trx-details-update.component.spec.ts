import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDetailsUpdateComponent } from 'app/entities/store-trx-details/store-trx-details-update.component';
import { StoreTrxDetailsService } from 'app/entities/store-trx-details/store-trx-details.service';
import { StoreTrxDetails } from 'app/shared/model/store-trx-details.model';

describe('Component Tests', () => {
  describe('StoreTrxDetails Management Update Component', () => {
    let comp: StoreTrxDetailsUpdateComponent;
    let fixture: ComponentFixture<StoreTrxDetailsUpdateComponent>;
    let service: StoreTrxDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDetailsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StoreTrxDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreTrxDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StoreTrxDetails(123);
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
        const entity = new StoreTrxDetails();
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
