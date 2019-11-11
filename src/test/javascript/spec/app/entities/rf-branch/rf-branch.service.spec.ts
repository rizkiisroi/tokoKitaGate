import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RfBranchService } from 'app/entities/rf-branch/rf-branch.service';
import { IRfBranch, RfBranch } from 'app/shared/model/rf-branch.model';

describe('Service Tests', () => {
  describe('RfBranch Service', () => {
    let injector: TestBed;
    let service: RfBranchService;
    let httpMock: HttpTestingController;
    let elemDefault: IRfBranch;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(RfBranchService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RfBranch(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            registeredDate: currentDate.format(DATE_TIME_FORMAT),
            approvedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a RfBranch', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            registeredDate: currentDate.format(DATE_TIME_FORMAT),
            approvedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            registeredDate: currentDate,
            approvedDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new RfBranch(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a RfBranch', () => {
        const returnedFromService = Object.assign(
          {
            branchName: 'BBBBBB',
            branchAddress: 'BBBBBB',
            branchCity: 'BBBBBB',
            branchPhone: 1,
            registeredBy: 'BBBBBB',
            registeredDate: currentDate.format(DATE_TIME_FORMAT),
            approvedBy: 'BBBBBB',
            approvedDate: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            registeredDate: currentDate,
            approvedDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of RfBranch', () => {
        const returnedFromService = Object.assign(
          {
            branchName: 'BBBBBB',
            branchAddress: 'BBBBBB',
            branchCity: 'BBBBBB',
            branchPhone: 1,
            registeredBy: 'BBBBBB',
            registeredDate: currentDate.format(DATE_TIME_FORMAT),
            approvedBy: 'BBBBBB',
            approvedDate: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            registeredDate: currentDate,
            approvedDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a RfBranch', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
