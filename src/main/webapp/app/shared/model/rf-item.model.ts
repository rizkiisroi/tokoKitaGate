import { IRfBranch } from 'app/shared/model/rf-branch.model';

export interface IRfItem {
  id?: number;
  itemDesc?: string;
  qty?: number;
  netPrice?: number;
  sellPrice?: number;
  tax?: number;
  active?: boolean;
  rfBranch?: IRfBranch;
}

export class RfItem implements IRfItem {
  constructor(
    public id?: number,
    public itemDesc?: string,
    public qty?: number,
    public netPrice?: number,
    public sellPrice?: number,
    public tax?: number,
    public active?: boolean,
    public rfBranch?: IRfBranch
  ) {
    this.active = this.active || false;
  }
}
