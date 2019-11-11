import { element, by, ElementFinder } from 'protractor';

export class RfBranchComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-rf-branch div table .btn-danger'));
  title = element.all(by.css('jhi-rf-branch div h2#page-heading span')).first();

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

export class RfBranchUpdatePage {
  pageTitle = element(by.id('jhi-rf-branch-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  branchNameInput = element(by.id('field_branchName'));
  branchAddressInput = element(by.id('field_branchAddress'));
  branchCityInput = element(by.id('field_branchCity'));
  branchPhoneInput = element(by.id('field_branchPhone'));
  registeredByInput = element(by.id('field_registeredBy'));
  registeredDateInput = element(by.id('field_registeredDate'));
  approvedByInput = element(by.id('field_approvedBy'));
  approvedDateInput = element(by.id('field_approvedDate'));
  activeInput = element(by.id('field_active'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setBranchNameInput(branchName) {
    await this.branchNameInput.sendKeys(branchName);
  }

  async getBranchNameInput() {
    return await this.branchNameInput.getAttribute('value');
  }

  async setBranchAddressInput(branchAddress) {
    await this.branchAddressInput.sendKeys(branchAddress);
  }

  async getBranchAddressInput() {
    return await this.branchAddressInput.getAttribute('value');
  }

  async setBranchCityInput(branchCity) {
    await this.branchCityInput.sendKeys(branchCity);
  }

  async getBranchCityInput() {
    return await this.branchCityInput.getAttribute('value');
  }

  async setBranchPhoneInput(branchPhone) {
    await this.branchPhoneInput.sendKeys(branchPhone);
  }

  async getBranchPhoneInput() {
    return await this.branchPhoneInput.getAttribute('value');
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

export class RfBranchDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rfBranch-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rfBranch'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
