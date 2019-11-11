import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDetailsDetailComponent } from 'app/entities/store-trx-details/store-trx-details-detail.component';
import { StoreTrxDetails } from 'app/shared/model/store-trx-details.model';

describe('Component Tests', () => {
  describe('StoreTrxDetails Management Detail Component', () => {
    let comp: StoreTrxDetailsDetailComponent;
    let fixture: ComponentFixture<StoreTrxDetailsDetailComponent>;
    const route = ({ data: of({ storeTrxDetails: new StoreTrxDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StoreTrxDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StoreTrxDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.storeTrxDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
