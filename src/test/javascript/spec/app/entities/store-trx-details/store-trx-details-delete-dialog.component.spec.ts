import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDetailsDeleteDialogComponent } from 'app/entities/store-trx-details/store-trx-details-delete-dialog.component';
import { StoreTrxDetailsService } from 'app/entities/store-trx-details/store-trx-details.service';

describe('Component Tests', () => {
  describe('StoreTrxDetails Management Delete Component', () => {
    let comp: StoreTrxDetailsDeleteDialogComponent;
    let fixture: ComponentFixture<StoreTrxDetailsDeleteDialogComponent>;
    let service: StoreTrxDetailsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDetailsDeleteDialogComponent]
      })
        .overrideTemplate(StoreTrxDetailsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StoreTrxDetailsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxDetailsService);
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
