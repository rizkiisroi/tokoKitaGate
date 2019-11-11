import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfCompanyComponent } from 'app/entities/rf-company/rf-company.component';
import { RfCompanyService } from 'app/entities/rf-company/rf-company.service';
import { RfCompany } from 'app/shared/model/rf-company.model';

describe('Component Tests', () => {
  describe('RfCompany Management Component', () => {
    let comp: RfCompanyComponent;
    let fixture: ComponentFixture<RfCompanyComponent>;
    let service: RfCompanyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfCompanyComponent],
        providers: []
      })
        .overrideTemplate(RfCompanyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfCompanyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfCompanyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfCompany(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfCompanies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
