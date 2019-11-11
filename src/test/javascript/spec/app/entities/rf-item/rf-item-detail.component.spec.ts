import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfItemDetailComponent } from 'app/entities/rf-item/rf-item-detail.component';
import { RfItem } from 'app/shared/model/rf-item.model';

describe('Component Tests', () => {
  describe('RfItem Management Detail Component', () => {
    let comp: RfItemDetailComponent;
    let fixture: ComponentFixture<RfItemDetailComponent>;
    const route = ({ data: of({ rfItem: new RfItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
