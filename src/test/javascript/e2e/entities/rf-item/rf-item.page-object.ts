import { element, by, ElementFinder } from 'protractor';

export class RfItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rf-item div table .btn-danger'));
  title = element.all(by.css('jhi-rf-item div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class RfItemUpdatePage {
  pageTitle = element(by.id('jhi-rf-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  itemDescInput = element(by.id('field_itemDesc'));
  qtyInput = element(by.id('field_qty'));
  netPriceInput = element(by.id('field_netPrice'));
  sellPriceInput = element(by.id('field_sellPrice'));
  taxInput = element(by.id('field_tax'));
  activeInput = element(by.id('field_active'));
  rfBranchSelect = element(by.id('field_rfBranch'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setItemDescInput(itemDesc) {
    await this.itemDescInput.sendKeys(itemDesc);
  }

  async getItemDescInput() {
    return await this.itemDescInput.getAttribute('value');
  }

  async setQtyInput(qty) {
    await this.qtyInput.sendKeys(qty);
  }

  async getQtyInput() {
    return await this.qtyInput.getAttribute('value');
  }

  async setNetPriceInput(netPrice) {
    await this.netPriceInput.sendKeys(netPrice);
  }

  async getNetPriceInput() {
    return await this.netPriceInput.getAttribute('value');
  }

  async setSellPriceInput(sellPrice) {
    await this.sellPriceInput.sendKeys(sellPrice);
  }

  async getSellPriceInput() {
    return await this.sellPriceInput.getAttribute('value');
  }

  async setTaxInput(tax) {
    await this.taxInput.sendKeys(tax);
  }

  async getTaxInput() {
    return await this.taxInput.getAttribute('value');
  }

  getActiveInput() {
    return this.activeInput;
  }

  async rfBranchSelectLastOption() {
    await this.rfBranchSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rfBranchSelectOption(option) {
    await this.rfBranchSelect.sendKeys(option);
  }

  getRfBranchSelect(): ElementFinder {
    return this.rfBranchSelect;
  }

  async getRfBranchSelectedOption() {
    return await this.rfBranchSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RfItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfItem'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
