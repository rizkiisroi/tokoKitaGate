import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { StoreTrxDetailComponent } from 'app/entities/store-trx/store-trx-detail.component';
import { StoreTrx } from 'app/shared/model/store-trx.model';

describe('Component Tests', () => {
  describe('StoreTrx Management Detail Component', () => {
    let comp: StoreTrxDetailComponent;
    let fixture: ComponentFixture<StoreTrxDetailComponent>;
    const route = ({ data: of({ storeTrx: new StoreTrx(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [StoreTrxDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StoreTrxDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StoreTrxDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.storeTrx).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
