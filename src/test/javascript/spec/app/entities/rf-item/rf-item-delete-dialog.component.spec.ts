import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfItemDeleteDialogComponent } from 'app/entities/rf-item/rf-item-delete-dialog.component';
import { RfItemService } from 'app/entities/rf-item/rf-item.service';

describe('Component Tests', () => {
  describe('RfItem Management Delete Component', () => {
    let comp: RfItemDeleteDialogComponent;
    let fixture: ComponentFixture<RfItemDeleteDialogComponent>;
    let service: RfItemService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfItemDeleteDialogComponent]
      })
        .overrideTemplate(RfItemDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfItemDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfItemService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
