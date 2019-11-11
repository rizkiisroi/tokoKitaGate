import { element, by, ElementFinder } from 'protractor';

export class RfCompanyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rf-company div table .btn-danger'));
  title = element.all(by.css('jhi-rf-company div h2#page-heading span')).first();

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

export class RfCompanyUpdatePage {
  pageTitle = element(by.id('jhi-rf-company-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  companyNameInput = element(by.id('field_companyName'));
  registeredByInput = element(by.id('field_registeredBy'));
  registeredDateInput = element(by.id('field_registeredDate'));
  approvedByInput = element(by.id('field_approvedBy'));
  approvedDateInput = element(by.id('field_approvedDate'));
  activeInput = element(by.id('field_active'));
  rfBranchSelect = element(by.id('field_rfBranch'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setCompanyNameInput(companyName) {
    await this.companyNameInput.sendKeys(companyName);
  }

  async getCompanyNameInput() {
    return await this.companyNameInput.getAttribute('value');
  }

  async setRegisteredByInput(registeredBy) {
    await this.registeredByInput.sendKeys(registeredBy);
  }

  async getRegisteredByInput() {
    return await this.registeredByInput.getAttribute('value');
  }

  async setRegisteredDateInput(registeredDate) {
    await this.registeredDateInput.sendKeys(registeredDate);
  }

  async getRegisteredDateInput() {
    return await this.registeredDateInput.getAttribute('value');
  }

  async setApprovedByInput(approvedBy) {
    await this.approvedByInput.sendKeys(approvedBy);
  }

  async getApprovedByInput() {
    return await this.approvedByInput.getAttribute('value');
  }

  async setApprovedDateInput(approvedDate) {
    await this.approvedDateInput.sendKeys(approvedDate);
  }

  async getApprovedDateInput() {
    return await this.approvedDateInput.getAttribute('value');
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

export class RfCompanyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfCompany-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfCompany'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
