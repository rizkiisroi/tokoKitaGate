import { Moment } from 'moment';
import { IRfBranch } from 'app/shared/model/rf-branch.model';
import { IStoreTrxDetails } from 'app/shared/model/store-trx-details.model';

export interface IStoreTrx {
  id?: number;
  trxAmount?: number;
  trxMethod?: string;
  trxBy?: string;
  trxDate?: Moment;
  rfBranch?: IRfBranch;
  storeTrxDetails?: IStoreTrxDetails[];
}

export class StoreTrx implements IStoreTrx {
  constructor(
    public id?: number,
    public trxAmount?: number,
    public trxMethod?: string,
    public trxBy?: string,
    public trxDate?: Moment,
    public rfBranch?: IRfBranch,
    public storeTrxDetails?: IStoreTrxDetails[]
  ) {}
}
