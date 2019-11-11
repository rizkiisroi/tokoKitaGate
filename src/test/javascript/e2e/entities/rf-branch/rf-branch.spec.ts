import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfBranchComponentsPage, RfBranchDeleteDialog, RfBranchUpdatePage } from './rf-branch.page-object';

const expect = chai.expect;

describe('RfBranch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfBranchComponentsPage: RfBranchComponentsPage;
  let rfBranchUpdatePage: RfBranchUpdatePage;
  let rfBranchDeleteDialog: RfBranchDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfBranches', async () => {
    await navBarPage.goToEntity('rf-branch');
    rfBranchComponentsPage = new RfBranchComponentsPage();
    await browser.wait(ec.visibilityOf(rfBranchComponentsPage.title), 5000);
    expect(await rfBranchComponentsPage.getTitle()).to.eq('Rf Branches');
  });

  it('should load create RfBranch page', async () => {
    await rfBranchComponentsPage.clickOnCreateButton();
    rfBranchUpdatePage = new RfBranchUpdatePage();
    expect(await rfBranchUpdatePage.getPageTitle()).to.eq('Create or edit a Rf Branch');
    await rfBranchUpdatePage.cancel();
  });

  it('should create and save RfBranches', async () => {
    const nbButtonsBeforeCreate = await rfBranchComponentsPage.countDeleteButtons();

    await rfBranchComponentsPage.clickOnCreateButton();
    await promise.all([
      rfBranchUpdatePage.setBranchNameInput('branchName'),
      rfBranchUpdatePage.setBranchAddressInput('branchAddress'),
      rfBranchUpdatePage.setBranchCityInput('branchCity'),
      rfBranchUpdatePage.setBranchPhoneInput('5'),
      rfBranchUpdatePage.setRegisteredByInput('registeredBy'),
      rfBranchUpdatePage.setRegisteredDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rfBranchUpdatePage.setApprovedByInput('approvedBy'),
      rfBranchUpdatePage.setApprovedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await rfBranchUpdatePage.getBranchNameInput()).to.eq('branchName', 'Expected BranchName value to be equals to branchName');
    expect(await rfBranchUpdatePage.getBranchAddressInput()).to.eq(
      'branchAddress',
      'Expected BranchAddress value to be equals to branchAddress'
    );
    expect(await rfBranchUpdatePage.getBranchCityInput()).to.eq('branchCity', 'Expected BranchCity value to be equals to branchCity');
    expect(await rfBranchUpdatePage.getBranchPhoneInput()).to.eq('5', 'Expected branchPhone value to be equals to 5');
    expect(await rfBranchUpdatePage.getRegisteredByInput()).to.eq(
      'registeredBy',
      'Expected RegisteredBy value to be equals to registeredBy'
    );
    expect(await rfBranchUpdatePage.getRegisteredDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected registeredDate value to be equals to 2000-12-31'
    );
    expect(await rfBranchUpdatePage.getApprovedByInput()).to.eq('approvedBy', 'Expected ApprovedBy value to be equals to approvedBy');
    expect(await rfBranchUpdatePage.getApprovedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected approvedDate value to be equals to 2000-12-31'
    );
    const selectedActive = rfBranchUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await rfBranchUpdatePage.getActiveInput().click();
      expect(await rfBranchUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await rfBranchUpdatePage.getActiveInput().click();
      expect(await rfBranchUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await rfBranchUpdatePage.save();
    expect(await rfBranchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfBranchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfBranch', async () => {
    const nbButtonsBeforeDelete = await rfBranchComponentsPage.countDeleteButtons();
    await rfBranchComponentsPage.clickOnLastDeleteButton();

    rfBranchDeleteDialog = new RfBranchDeleteDialog();
    expect(await rfBranchDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rf Branch?');
    await rfBranchDeleteDialog.clickOnConfirmButton();

    expect(await rfBranchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
