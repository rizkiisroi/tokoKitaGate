import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfItemUpdateComponent } from 'app/entities/rf-item/rf-item-update.component';
import { RfItemService } from 'app/entities/rf-item/rf-item.service';
import { RfItem } from 'app/shared/model/rf-item.model';

describe('Component Tests', () => {
  describe('RfItem Management Update Component', () => {
    let comp: RfItemUpdateComponent;
    let fixture: ComponentFixture<RfItemUpdateComponent>;
    let service: RfItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfItemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RfItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RfItem(123);
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
        const entity = new RfItem();
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
