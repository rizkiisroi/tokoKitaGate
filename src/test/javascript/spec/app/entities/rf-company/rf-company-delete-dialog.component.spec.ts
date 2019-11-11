import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfCompanyDeleteDialogComponent } from 'app/entities/rf-company/rf-company-delete-dialog.component';
import { RfCompanyService } from 'app/entities/rf-company/rf-company.service';

describe('Component Tests', () => {
  describe('RfCompany Management Delete Component', () => {
    let comp: RfCompanyDeleteDialogComponent;
    let fixture: ComponentFixture<RfCompanyDeleteDialogComponent>;
    let service: RfCompanyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfCompanyDeleteDialogComponent]
      })
        .overrideTemplate(RfCompanyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfCompanyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfCompanyService);
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
