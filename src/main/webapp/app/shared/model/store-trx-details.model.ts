import { IStoreTrx } from 'app/shared/model/store-trx.model';

export interface IStoreTrxDetails {
  id?: number;
  itemId?: string;
  finalPrice?: number;
  discount?: number;
  storeTrx?: IStoreTrx;
}

export class StoreTrxDetails implements IStoreTrxDetails {
  constructor(
    public id?: number,
    public itemId?: string,
    public finalPrice?: number,
    public discount?: number,
    public storeTrx?: IStoreTrx
  ) {}
}
