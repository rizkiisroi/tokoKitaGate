import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RfItemComponentsPage, RfItemDeleteDialog, RfItemUpdatePage } from './rf-item.page-object';

const expect = chai.expect;

describe('RfItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rfItemComponentsPage: RfItemComponentsPage;
  let rfItemUpdatePage: RfItemUpdatePage;
  let rfItemDeleteDialog: RfItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RfItems', async () => {
    await navBarPage.goToEntity('rf-item');
    rfItemComponentsPage = new RfItemComponentsPage();
    await browser.wait(ec.visibilityOf(rfItemComponentsPage.title), 5000);
    expect(await rfItemComponentsPage.getTitle()).to.eq('Rf Items');
  });

  it('should load create RfItem page', async () => {
    await rfItemComponentsPage.clickOnCreateButton();
    rfItemUpdatePage = new RfItemUpdatePage();
    expect(await rfItemUpdatePage.getPageTitle()).to.eq('Create or edit a Rf Item');
    await rfItemUpdatePage.cancel();
  });

  it('should create and save RfItems', async () => {
    const nbButtonsBeforeCreate = await rfItemComponentsPage.countDeleteButtons();

    await rfItemComponentsPage.clickOnCreateButton();
    await promise.all([
      rfItemUpdatePage.setItemDescInput('itemDesc'),
      rfItemUpdatePage.setQtyInput('5'),
      rfItemUpdatePage.setNetPriceInput('5'),
      rfItemUpdatePage.setSellPriceInput('5'),
      rfItemUpdatePage.setTaxInput('5'),
      rfItemUpdatePage.rfBranchSelectLastOption()
    ]);
    expect(await rfItemUpdatePage.getItemDescInput()).to.eq('itemDesc', 'Expected ItemDesc value to be equals to itemDesc');
    expect(await rfItemUpdatePage.getQtyInput()).to.eq('5', 'Expected qty value to be equals to 5');
    expect(await rfItemUpdatePage.getNetPriceInput()).to.eq('5', 'Expected netPrice value to be equals to 5');
    expect(await rfItemUpdatePage.getSellPriceInput()).to.eq('5', 'Expected sellPrice value to be equals to 5');
    expect(await rfItemUpdatePage.getTaxInput()).to.eq('5', 'Expected tax value to be equals to 5');
    const selectedActive = rfItemUpdatePage.getActiveInput();
    if (await selectedActive.isSelected()) {
      await rfItemUpdatePage.getActiveInput().click();
      expect(await rfItemUpdatePage.getActiveInput().isSelected(), 'Expected active not to be selected').to.be.false;
    } else {
      await rfItemUpdatePage.getActiveInput().click();
      expect(await rfItemUpdatePage.getActiveInput().isSelected(), 'Expected active to be selected').to.be.true;
    }
    await rfItemUpdatePage.save();
    expect(await rfItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rfItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RfItem', async () => {
    const nbButtonsBeforeDelete = await rfItemComponentsPage.countDeleteButtons();
    await rfItemComponentsPage.clickOnLastDeleteButton();

    rfItemDeleteDialog = new RfItemDeleteDialog();
    expect(await rfItemDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Rf Item?');
    await rfItemDeleteDialog.clickOnConfirmButton();

    expect(await rfItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
