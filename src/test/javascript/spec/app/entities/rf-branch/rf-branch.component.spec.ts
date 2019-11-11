import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TokoKitaGateTestModule } from '../../../test.module';
import { RfBranchComponent } from 'app/entities/rf-branch/rf-branch.component';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';
import { RfBranch } from 'app/shared/model/rf-branch.model';

describe('Component Tests', () => {
  describe('RfBranch Management Component', () => {
    let comp: RfBranchComponent;
    let fixture: ComponentFixture<RfBranchComponent>;
    let service: RfBranchService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TokoKitaGateTestModule],
        declarations: [RfBranchComponent],
        providers: []
      })
        .overrideTemplate(RfBranchComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfBranchComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfBranchService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfBranch(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfBranches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
