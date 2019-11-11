import { element, by, ElementFinder } from 'protractor';

export class StoreTrxDetailsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-store-trx-details div table .btn-danger'));
  title = element.all(by.css('jhi-store-trx-details div h2#page-heading span')).first();

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

export class StoreTrxDetailsUpdatePage {
  pageTitle = element(by.id('jhi-store-trx-details-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  itemIdInput = element(by.id('field_itemId'));
  finalPriceInput = element(by.id('field_finalPrice'));
  discountInput = element(by.id('field_discount'));
  storeTrxSelect = element(by.id('field_storeTrx'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setItemIdInput(itemId) {
    await this.itemIdInput.sendKeys(itemId);
  }

  async getItemIdInput() {
    return await this.itemIdInput.getAttribute('value');
  }

  async setFinalPriceInput(finalPrice) {
    await this.finalPriceInput.sendKeys(finalPrice);
  }

  async getFinalPriceInput() {
    return await this.finalPriceInput.getAttribute('value');
  }

  async setDiscountInput(discount) {
    await this.discountInput.sendKeys(discount);
  }

  async getDiscountInput() {
    return await this.discountInput.getAttribute('value');
  }

  async storeTrxSelectLastOption() {
    await this.storeTrxSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async storeTrxSelectOption(option) {
    await this.storeTrxSelect.sendKeys(option);
  }

  getStoreTrxSelect(): ElementFinder {
    return this.storeTrxSelect;
  }

  async getStoreTrxSelectedOption() {
    return await this.storeTrxSelect.element(by.css('option:checked')).getText();
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

export class StoreTrxDetailsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-storeTrxDetails-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-storeTrxDetails'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
