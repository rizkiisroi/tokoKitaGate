import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfCompanyComponentsPage, RfCompanyDeleteDialog, RfCompanyUpdatePage } from './rf-company.page-object';

const expect = chai.expect;

describe('RfCompany e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfCompanyComponentsPage: RfCompanyComponentsPage;
  let rfCompanyUpdatePage: RfCompanyUpdatePage;
  let rfCompanyDeleteDialog: RfCompanyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfCompanies', async () => {
    await navBarPage.goToEntity('rf-company');
    rfCompanyComponentsPage = new RfCompanyComponentsPage();
    await browser.wait(ec.visibilityOf(rfCompanyComponentsPage.title), 5000);
    expect(await rfCompanyComponentsPage.getTitle()).to.eq('Rf Companies');
  });

  it('should load create RfCompany page', async () => {
    await rfCompanyComponentsPage.clickOnCreateButton();
    rfCompanyUpdatePage = new RfCompanyUpdatePage();
    expect(await rfCompanyUpdatePage.getPageTitle()).to.eq('Create or edit a Rf Company');
    await rfCompanyUpdatePage.cancel();
  });

  it('should create and save RfCompanies', async () => {
    const nbButtonsBeforeCreate = await rfCompanyComponentsPage.countDeleteButtons();

    await rfCompanyComponentsPage.clickOnCreateButton();
    await promise.all([
      rfCompanyUpdatePage.setCompanyNameInput('companyName'),
      rfCompanyUpdatePage.setRegisteredByInput('registeredBy'),
      rfCompanyUpdatePage.setRegisteredDateInput('registeredDate'),
      rfCompanyUpdatePage.setApprovedByInput('approvedBy'),
      rfCompanyUpdatePage.setApprovedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rfCompanyUpdatePage.rfBranchSelectLastOption()
    ]);
    expect(await rfCompanyUpdatePage.getCompanyNameInput()).to.eq('companyName', 'Expected CompanyName value to be equals to companyName');
    expect(await rfCompanyUpdatePage.getRegisteredByInput()).to.eq(
      'registeredBy',
      'Expected RegisteredBy value to be equals to registeredBy'
    );
    expect(await rfCompanyUpdatePage.getRegisteredDateInput()).to.eq(
      'registeredDate',
      'Expected RegisteredDate value to be equals to registeredDate'
    );
    expect(await rfCompanyUpdatePage.getApprovedByInput()).to.eq('approvedBy', 'Expected ApprovedBy value to be equals to approvedBy');
    expect(await rfCompanyUpdatePage.getApprovedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected approvedDate value to be equals to 2000-12-31'
    );
    const selectedActive = rfCompanyUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await rfCompanyUpdatePage.getActiveInput().click();
      expect(await rfCompanyUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await rfCompanyUpdatePage.getActiveInput().click();
      expect(await rfCompanyUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await rfCompanyUpdatePage.save();
    expect(await rfCompanyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfCompanyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfCompany', async () => {
    const nbButtonsBeforeDelete = await rfCompanyComponentsPage.countDeleteButtons();
    await rfCompanyComponentsPage.clickOnLastDeleteButton();

    rfCompanyDeleteDialog = new RfCompanyDeleteDialog();
    expect(await rfCompanyDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rf Company?');
    await rfCompanyDeleteDialog.clickOnConfirmButton();

    expect(await rfCompanyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
