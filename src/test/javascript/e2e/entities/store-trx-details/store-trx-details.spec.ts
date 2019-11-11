import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StoreTrxDetailsComponentsPage, StoreTrxDetailsDeleteDialog, StoreTrxDetailsUpdatePage } from './store-trx-details.page-object';

const expect = chai.expect;

describe('StoreTrxDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let storeTrxDetailsComponentsPage: StoreTrxDetailsComponentsPage;
  let storeTrxDetailsUpdatePage: StoreTrxDetailsUpdatePage;
  let storeTrxDetailsDeleteDialog: StoreTrxDetailsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StoreTrxDetails', async () => {
    await navBarPage.goToEntity('store-trx-details');
    storeTrxDetailsComponentsPage = new StoreTrxDetailsComponentsPage();
    await browser.wait(ec.visibilityOf(storeTrxDetailsComponentsPage.title), 5000);
    expect(await storeTrxDetailsComponentsPage.getTitle()).to.eq('Store Trx Details');
  });

  it('should load create StoreTrxDetails page', async () => {
    await storeTrxDetailsComponentsPage.clickOnCreateButton();
    storeTrxDetailsUpdatePage = new StoreTrxDetailsUpdatePage();
    expect(await storeTrxDetailsUpdatePage.getPageTitle()).to.eq('Create or edit a Store Trx Details');
    await storeTrxDetailsUpdatePage.cancel();
  });

  it('should create and save StoreTrxDetails', async () => {
    const nbButtonsBeforeCreate = await storeTrxDetailsComponentsPage.countDeleteButtons();

    await storeTrxDetailsComponentsPage.clickOnCreateButton();
    await promise.all([
      storeTrxDetailsUpdatePage.setItemIdInput('itemId'),
      storeTrxDetailsUpdatePage.setFinalPriceInput('5'),
      storeTrxDetailsUpdatePage.setDiscountInput('5'),
      storeTrxDetailsUpdatePage.storeTrxSelectLastOption()
    ]);
    expect(await storeTrxDetailsUpdatePage.getItemIdInput()).to.eq('itemId', 'Expected ItemId value to be equals to itemId');
    expect(await storeTrxDetailsUpdatePage.getFinalPriceInput()).to.eq('5', 'Expected finalPrice value to be equals to 5');
    expect(await storeTrxDetailsUpdatePage.getDiscountInput()).to.eq('5', 'Expected discount value to be equals to 5');
    await storeTrxDetailsUpdatePage.save();
    expect(await storeTrxDetailsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await storeTrxDetailsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last StoreTrxDetails', async () => {
    const nbButtonsBeforeDelete = await storeTrxDetailsComponentsPage.countDeleteButtons();
    await storeTrxDetailsComponentsPage.clickOnLastDeleteButton();

    storeTrxDetailsDeleteDialog = new StoreTrxDetailsDeleteDialog();
    expect(await storeTrxDetailsDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Store Trx Details?');
    await storeTrxDetailsDeleteDialog.clickOnConfirmButton();

    expect(await storeTrxDetailsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
