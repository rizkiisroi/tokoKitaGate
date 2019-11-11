import { element, by, ElementFinder } from 'protractor';

export class StoreTrxComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-store-trx div table .btn-danger'));
  title = element.all(by.css('jhi-store-trx div h2#page-heading span')).first();

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

export class StoreTrxUpdatePage {
  pageTitle = element(by.id('jhi-store-trx-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  trxAmountInput = element(by.id('field_trxAmount'));
  trxMethodInput = element(by.id('field_trxMethod'));
  trxByInput = element(by.id('field_trxBy'));
  trxDateInput = element(by.id('field_trxDate'));
  rfBranchSelect = element(by.id('field_rfBranch'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTrxAmountInput(trxAmount) {
    await this.trxAmountInput.sendKeys(trxAmount);
  }

  async getTrxAmountInput() {
    return await this.trxAmountInput.getAttribute('value');
  }

  async setTrxMethodInput(trxMethod) {
    await this.trxMethodInput.sendKeys(trxMethod);
  }

  async getTrxMethodInput() {
    return await this.trxMethodInput.getAttribute('value');
  }

  async setTrxByInput(trxBy) {
    await this.trxByInput.sendKeys(trxBy);
  }

  async getTrxByInput() {
    return await this.trxByInput.getAttribute('value');
  }

  async setTrxDateInput(trxDate) {
    await this.trxDateInput.sendKeys(trxDate);
  }

  async getTrxDateInput() {
    return await this.trxDateInput.getAttribute('value');
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

export class StoreTrxDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-storeTrx-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-storeTrx'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
