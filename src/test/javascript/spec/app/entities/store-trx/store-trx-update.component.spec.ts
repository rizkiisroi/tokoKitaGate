import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxUpdateComponent } from 'app/entities/store-trx/store-trx-update.component';
import { StoreTrxService } from 'app/entities/store-trx/store-trx.service';
import { StoreTrx } from 'app/shared/model/store-trx.model';

describe('Component Tests', () => {
  describe('StoreTrx Management Update Component', () => {
    let comp: StoreTrxUpdateComponent;
    let fixture: ComponentFixture<StoreTrxUpdateComponent>;
    let service: StoreTrxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StoreTrxUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreTrxUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StoreTrx(123);
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
        const entity = new StoreTrx();
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
