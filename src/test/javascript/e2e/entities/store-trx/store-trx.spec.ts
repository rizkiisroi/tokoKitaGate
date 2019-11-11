import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StoreTrxComponentsPage, StoreTrxDeleteDialog, StoreTrxUpdatePage } from './store-trx.page-object';

const expect = chai.expect;

describe('StoreTrx e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let storeTrxComponentsPage: StoreTrxComponentsPage;
  let storeTrxUpdatePage: StoreTrxUpdatePage;
  let storeTrxDeleteDialog: StoreTrxDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StoreTrxes', async () => {
    await navBarPage.goToEntity('store-trx');
    storeTrxComponentsPage = new StoreTrxComponentsPage();
    await browser.wait(ec.visibilityOf(storeTrxComponentsPage.title), 5000);
    expect(await storeTrxComponentsPage.getTitle()).to.eq('Store Trxes');
  });

  it('should load create StoreTrx page', async () => {
    await storeTrxComponentsPage.clickOnCreateButton();
    storeTrxUpdatePage = new StoreTrxUpdatePage();
    expect(await storeTrxUpdatePage.getPageTitle()).to.eq('Create or edit a Store Trx');
    await storeTrxUpdatePage.cancel();
  });

  it('should create and save StoreTrxes', async () => {
    const nbButtonsBeforeCreate = await storeTrxComponentsPage.countDeleteButtons();

    await storeTrxComponentsPage.clickOnCreateButton();
    await promise.all([
      storeTrxUpdatePage.setTrxAmountInput('5'),
      storeTrxUpdatePage.setTrxMethodInput('trxMethod'),
      storeTrxUpdatePage.setTrxByInput('trxBy'),
      storeTrxUpdatePage.setTrxDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      storeTrxUpdatePage.rfBranchSelectLastOption()
    ]);
    expect(await storeTrxUpdatePage.getTrxAmountInput()).to.eq('5', 'Expected trxAmount value to be equals to 5');
    expect(await storeTrxUpdatePage.getTrxMethodInput()).to.eq('trxMethod', 'Expected TrxMethod value to be equals to trxMethod');
    expect(await storeTrxUpdatePage.getTrxByInput()).to.eq('trxBy', 'Expected TrxBy value to be equals to trxBy');
    expect(await storeTrxUpdatePage.getTrxDateInput()).to.contain('2001-01-01T02:30', 'Expected trxDate value to be equals to 2000-12-31');
    await storeTrxUpdatePage.save();
    expect(await storeTrxUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await storeTrxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StoreTrx', async () => {
    const nbButtonsBeforeDelete = await storeTrxComponentsPage.countDeleteButtons();
    await storeTrxComponentsPage.clickOnLastDeleteButton();

    storeTrxDeleteDialog = new StoreTrxDeleteDialog();
    expect(await storeTrxDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Store Trx?');
    await storeTrxDeleteDialog.clickOnConfirmButton();

    expect(await storeTrxComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
