import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDeleteDialogComponent } from 'app/entities/store-trx/store-trx-delete-dialog.component';
import { StoreTrxService } from 'app/entities/store-trx/store-trx.service';

describe('Component Tests', () => {
  describe('StoreTrx Management Delete Component', () => {
    let comp: StoreTrxDeleteDialogComponent;
    let fixture: ComponentFixture<StoreTrxDeleteDialogComponent>;
    let service: StoreTrxService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDeleteDialogComponent]
      })
        .overrideTemplate(StoreTrxDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StoreTrxDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxService);
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
