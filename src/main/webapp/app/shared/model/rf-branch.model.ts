import { Moment } from 'moment';
import { IRfCompany } from 'app/shared/model/rf-company.model';
import { IRfItem } from 'app/shared/model/rf-item.model';
import { IStoreTrx } from 'app/shared/model/store-trx.model';

export interface IRfBranch {
  id?: number;
  branchName?: string;
  branchAddress?: string;
  branchCity?: string;
  branchPhone?: number;
  registeredBy?: string;
  registeredDate?: Moment;
  approvedBy?: string;
  approvedDate?: Moment;
  active?: boolean;
  rfCompanies?: IRfCompany[];
  rfItem?: IRfItem;
  storeTrx?: IStoreTrx;
}

export class RfBranch implements IRfBranch {
  constructor(
    public id?: number,
    public branchName?: string,
    public branchAddress?: string,
    public branchCity?: string,
    public branchPhone?: number,
    public registeredBy?: string,
    public registeredDate?: Moment,
    public approvedBy?: string,
    public approvedDate?: Moment,
    public active?: boolean,
    public rfCompanies?: IRfCompany[],
    public rfItem?: IRfItem,
    public storeTrx?: IStoreTrx
  ) {
    this.active = this.active || false;
  }
}
