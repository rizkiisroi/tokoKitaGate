import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RfCompanyService } from 'app/entities/rf-company/rf-company.service';
import { IRfCompany, RfCompany } from 'app/shared/model/rf-company.model';

describe('Service Tests', () => {
  describe('RfCompany Service', () => {
    let injector: TestBed;
    let service: RfCompanyService;
    let httpMock: HttpTestingController;
    let elemDefault: IRfCompany;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(RfCompanyService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RfCompany(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
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

      it('should create a RfCompany', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            approvedDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            approvedDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new RfCompany(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a RfCompany', () => {
        const returnedFromService = Object.assign(
          {
            companyName: 'BBBBBB',
            registeredBy: 'BBBBBB',
            registeredDate: 'BBBBBB',
            approvedBy: 'BBBBBB',
            approvedDate: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should return a list of RfCompany', () => {
        const returnedFromService = Object.assign(
          {
            companyName: 'BBBBBB',
            registeredBy: 'BBBBBB',
            registeredDate: 'BBBBBB',
            approvedBy: 'BBBBBB',
            approvedDate: currentDate.format(DATE_TIME_FORMAT),
            active: true
          },
          elemDefault
        );
        const expected = Object.assign(
          {
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

      it('should delete a RfCompany', () => {
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
