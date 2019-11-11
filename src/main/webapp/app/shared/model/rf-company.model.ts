import { Moment } from 'moment';
import { IRfBranch } from 'app/shared/model/rf-branch.model';

export interface IRfCompany {
  id?: number;
  companyName?: string;
  registeredBy?: string;
  registeredDate?: string;
  approvedBy?: string;
  approvedDate?: Moment;
  active?: boolean;
  rfBranch?: IRfBranch;
}

export class RfCompany implements IRfCompany {
  constructor(
    public id?: number,
    public companyName?: string,
    public registeredBy?: string,
    public registeredDate?: string,
    public approvedBy?: string,
    public approvedDate?: Moment,
    public active?: boolean,
    public rfBranch?: IRfBranch
  ) {
    this.active = this.active || false;
  }
}
