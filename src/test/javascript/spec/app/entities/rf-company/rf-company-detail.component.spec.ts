import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfCompanyDetailComponent } from 'app/entities/rf-company/rf-company-detail.component';
import { RfCompany } from 'app/shared/model/rf-company.model';

describe('Component Tests', () => {
  describe('RfCompany Management Detail Component', () => {
    let comp: RfCompanyDetailComponent;
    let fixture: ComponentFixture<RfCompanyDetailComponent>;
    const route = ({ data: of({ rfCompany: new RfCompany(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfCompanyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfCompanyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfCompanyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfCompany).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
