import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfItemComponent } from 'app/entities/rf-item/rf-item.component';
import { RfItemService } from 'app/entities/rf-item/rf-item.service';
import { RfItem } from 'app/shared/model/rf-item.model';

describe('Component Tests', () => {
  describe('RfItem Management Component', () => {
    let comp: RfItemComponent;
    let fixture: ComponentFixture<RfItemComponent>;
    let service: RfItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfItemComponent],
        providers: []
      })
        .overrideTemplate(RfItemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfItemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfItemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfItem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
