import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxComponent } from 'app/entities/store-trx/store-trx.component';
import { StoreTrxService } from 'app/entities/store-trx/store-trx.service';
import { StoreTrx } from 'app/shared/model/store-trx.model';

describe('Component Tests', () => {
  describe('StoreTrx Management Component', () => {
    let comp: StoreTrxComponent;
    let fixture: ComponentFixture<StoreTrxComponent>;
    let service: StoreTrxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxComponent],
        providers: []
      })
        .overrideTemplate(StoreTrxComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StoreTrxComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StoreTrxService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StoreTrx(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.storeTrxes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
