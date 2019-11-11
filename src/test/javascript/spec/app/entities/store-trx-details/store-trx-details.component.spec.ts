import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDetailsComponent } from 'app/entities/store-trx-details/store-trx-details.component';
import { StoreTrxDetailsService } from 'app/entities/store-trx-details/store-trx-details.service';
import { StoreTrxDetails } from 'app/shared/model/store-trx-details.model';

describe('Component Tests', () => {
  describe('StoreTrxDetails Management Component', () => {
    let comp: StoreTrxDetailsComponent;
    let fixture: ComponentFixture<StoreTrxDetailsComponent>;
    let service: StoreTrxDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDetailsComponent],
        providers: []
      })
        .overrideTemplate(StoreTrxDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreTrxDetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxDetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StoreTrxDetails(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.storeTrxDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
