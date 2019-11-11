import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfBranchDetailComponent } from 'app/entities/rf-branch/rf-branch-detail.component';
import { RfBranch } from 'app/shared/model/rf-branch.model';

describe('Component Tests', () => {
  describe('RfBranch Management Detail Component', () => {
    let comp: RfBranchDetailComponent;
    let fixture: ComponentFixture<RfBranchDetailComponent>;
    const route = ({ data: of({ rfBranch: new RfBranch(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfBranchDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RfBranchDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfBranchDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rfBranch).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
