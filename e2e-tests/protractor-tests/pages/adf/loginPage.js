/**
 * Created by jdosti on 12/09/2017.
 */

var Util = require("../../util/util.js");
var TestConfig = require("../../test.config.js");

var LoginPage = function (){

    var txtUsername = element(by.css("input[id='username']"));
    var txtPassword = element(by.css("input[id='password']"));
    var usernameTooltip = element(by.css("span[data-automation-id='username-error']"));
    var passwordTooltip = element(by.css("span[data-automation-id='password-required']"));
    var loginTooltip = element(by.css("span[class='login-error-message']"));
    var usernameInactive = element(by.css("input[id='username'][aria-invalid='false']"));
    var passwordInactive = element(by.css("input[id='password'][aria-invalid='false']"));
    var adfLogo = element(by.css("img[class='adf-img-logo ng-star-inserted']"));
    var usernameHighlighted = element(by.css("input[id='username'][aria-invalid='true']"));
    var passwordHighlighted = element(by.css("input[id='password'][aria-invalid='true']"));
    var signInButton = element(by.id('login-button'));
    var showPassword = element(by.css("mat-icon[data-automation-id='show_password']"));
    var hidePassword = element(by.css("mat-icon[data-automation-id='hide_password']"));
    var rememberMe = element(by.css("mat-checkbox[id='adf-login-remember']"));
    var needHelp = element(by.css("div[id='adf-login-action-left']"));
    var register = element(by.css("div[id='adf-login-action-right']"));
    var acsSwitch = element(by.id("switch1"));
    var apsSwitch = element(by.id("switch2"));
    var footerSwitch = element(by.id("switch4"));
    var userPicture = element(by.id("userinfo_container"));
    var cardBackground = element(by.css("mat-card[class*='adf-login-card']"));

    /**
     * Provides the longer wait required
     * @property waitForElements
     * @type protractor.Element
     * */
    this.waitForElements = function (){
            Util.waitUntilElementIsVisible(txtUsername);
            Util.waitUntilElementIsVisible(txtPassword);
    };

    /**
     * Fills the username input
     * @method enterUsername
     * @param {String} username
     */
    this.enterUsername = function (username){
            Util.waitUntilElementIsVisible(txtUsername);
            txtUsername.clear();
            txtUsername.sendKeys(username);
    };

    /**
     * Fills the password input
     * @method enterPassword
     * @param {String} password
     */
    this.enterPassword = function (password){
            Util.waitUntilElementIsVisible(txtPassword);
            txtPassword.clear();
            txtPassword.sendKeys(password);
    };

    /**
     * clears username input
     * @method clearUsername
     * @param {String} username
     */
    this.clearUsername = function(){
        Util.waitUntilElementIsVisible(txtUsername);
        txtUsername.click().clear();
    };

    /**
     * clears password input
     * @method clearPassword
     * @param {String} password
     */
    this.clearPassword = function (){
        Util.waitUntilElementIsVisible(txtPassword);
        txtPassword.getAttribute('value').then(function (value){
            for (var i = value.length; i >= 0; i--) {
                txtPassword.sendKeys(protractor.Key.BACK_SPACE);
                }
        });
    };

    /**
     * checks username tooltips
     * @method checkUsernameTooltip
     * @param {String} message
     */
    this.checkUsernameTooltip = function (message){
            Util.waitUntilElementIsVisible(usernameTooltip);
    };

    /**
     * checks password tooltips
     * @method checkPasswordTooltip
     * @param {String} message
     */
    this.checkPasswordTooltip = function (message){
            Util.waitUntilElementIsVisible(passwordTooltip);
    };

    /**
     * checks login error tooltips
     * @method checkLoginError
     * @param {String} message
     */
    this.checkLoginError = function (message){
            Util.waitUntilElementIsVisible(loginTooltip);
            expect(loginTooltip.getText()).toEqual(message);
    };

    /**
     * checks username field is inactive
     * @method checkUsernameInactive
     */
    this.checkUsernameInactive = function (){
            Util.waitUntilElementIsVisible(usernameInactive);
    },

    /**
     * checks password field is inactive
     * @method checkPasswordInactive
     */
    this.checkPasswordInactive = function (){
            Util.waitUntilElementIsVisible(passwordInactive);
    };

    /**
     * checks username field is highlighted
     * @method checkUsernameHighlighted
     */
    this.checkUsernameHighlighted = function (){
            adfLogo.click();
            Util.waitUntilElementIsVisible(usernameHighlighted);
    };

    /**
     * checks password field is highlighted
     * @method checkPasswordHighlighted
     */
    this.checkPasswordHighlighted = function (){
            adfLogo.click();
            Util.waitUntilElementIsVisible(passwordHighlighted);
    };

    /**
     * check Username tooltip is not visible
     * @method checkUsernameTooltipIsNotVisible
     */
    this.checkUsernameTooltipIsNotVisible = function (){
            Util.waitUntilElementIsNotVisible(usernameTooltip);
    };

    /**
     * checks password tooltip is not visible
     * @method checkPasswordTooltipIsNotVisible
     */
    this.checkPasswordTooltipIsNotVisible = function (){
            Util.waitUntilElementIsNotVisible(passwordTooltip);
    };

    /**
     * checks sign in button is enabled
     * @method checkSignInButtonIsEnabled
     */
    this.checkSignInButtonIsEnabled = function (){
            Util.waitUntilElementIsVisible(signInButton);
            expect(signInButton.isEnabled()).toBe(true);
    };

    /**
     * Logs into adf using default host config
     * @method defaultLogin
     */
    this.defaultLogin = function (){
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        this.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);
    };

    /**
     * Logs into adf using userModel
     * @method loginUsingUserModel
     */
    this.loginUsingUserModel = function (userModel){
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        this.login(userModel.getId(), userModel.getPassword());
    };

    /**
     * Logs into ADF using userModel - only Process Services enabled
     * @method loginUsingUserModel
     */
    this.loginToProcessServicesUsingUserModel = function (userModel){
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        this.disableACS();
        this.enableAPS();
        this.login(userModel.email, userModel.password);
    };


    this.loginToProcessServicesUsingDefaultUser = function (){
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        this.disableACS();
        this.enableAPS();
        this.login(TestConfig.adf_aps.apsAdminEmail, TestConfig.adf_aps.apsAdminPassword);
    };

    this.loginToContentServicesUsingUserModel = function (userModel) {
        browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_login);
        this.enableACS();
        this.disableAPS();
        this.login(userModel.getId(), userModel.getPassword());
    };

    /** 
     * Go to adf login page 
     * @method goToLoginPage 
     */
     this.goToLoginPage = function (){ 
         browser.driver.get(TestConfig.adf.base + TestConfig.adf.adf_port);
     };

    /**
     * checks sign in button is disabled
     * @method checkSignInButtonIsDisabled
     */
    this.checkSignInButtonIsDisabled = function (){
            Util.waitUntilElementIsVisible(signInButton);
            expect(signInButton.isEnabled()).toBe(false);
    };

    /**
     * clicks the sign in button
     * @method clickSignInButton
     */
    this.clickSignInButton = function (){
            Util.waitUntilElementIsVisible(signInButton);
            signInButton.click();
    };

    /**
     * clicks icon to show password
     * @method showPassword
     */
    this.showPassword = function (){
            Util.waitUntilElementIsVisible(showPassword);
            showPassword.click();
    };

    this.getShowPasswordIconColor = function (){
        Util.waitUntilElementIsVisible(showPassword);
        return showPassword.getCssValue("color").then(function (value) {
            return value;
        });
    };

    this.getSignInButtonColor = function (){
        Util.waitUntilElementIsVisible(signInButton);
        return signInButton.getCssValue("color").then(function (value) {
            return value;
        });
    };

    this.getBackgroundColor = function (){
        Util.waitUntilElementIsVisible(cardBackground);
        return cardBackground.getCssValue("color").then(function (value) {
            return value;
        });
    };

    /**
     * clicks icon to hide password
     * @method hidePassword
     */
    this.hidePassword = function (){
            Util.waitUntilElementIsVisible(hidePassword);
            hidePassword.click();
    };

    /**
     * checks if password is shown
     * @method checkPasswordIsShown
     * @param password
     */
    this.checkPasswordIsShown = function (password){
            txtPassword.getAttribute('value').then(function (text) {
                expect(text).toEqual(password);
            });
    };

    /**
     * checks if password is hidden
     * @method checkPasswordIsHidden
     */
    this.checkPasswordIsHidden = function (){
            Util.waitUntilElementIsVisible(txtPassword);
    };

    /**
     * checks 'Remember me' is displayed
     * @method checkRememberIsDisplayed
     */
    this.checkRememberIsDisplayed = function (){
            Util.waitUntilElementIsVisible(rememberMe);
    };

    /**
     * checks 'Remember me' is not displayed
     * @method checkRememberIsNotDisplayed
     */
    this.checkRememberIsNotDisplayed = function (){
            Util.waitUntilElementIsNotVisible(rememberMe);
    };

    /**
     * checks 'Need help' is Displayed
     * @method checkNeedHelpIsDisplayed
     */
    this.checkNeedHelpIsDisplayed = function (){
            Util.waitUntilElementIsVisible(needHelp);
    };

    /**
     * checks 'Need Help' is not displayed
     * @method checkNeedHelpIsNotDisplayed
     */
    this.checkNeedHelpIsNotDisplayed = function (){
            Util.waitUntilElementIsNotVisible(needHelp);
    };

    /**
     * checks 'Register' is displayed
     * @method checkRegisterDisplayed
     */
    this.checkRegisterDisplayed = function (){
            Util.waitUntilElementIsVisible(register);
    };

    /**
     * checks 'Register' is not displayed
     * @method checkRegisterIsNotDisplayed
     */
    this.checkRegisterIsNotDisplayed = function (){
            Util.waitUntilElementIsNotVisible(register);
    };

    /**
     * enables Content Services
     * @method enableACS
     */
    this.enableACS = function () {
            Util.waitUntilElementIsVisible(acsSwitch);
            acsSwitch.getAttribute('class').then(function (check) {
                if (check == 'mat-slide-toggle mat-primary') {
                    acsSwitch.click();
                    expect(acsSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary mat-checked');
                }
            })
    };

    /**
     * disables Content Services
     * @method disableACS
     */
    this.disableACS = function (){
            Util.waitUntilElementIsVisible(acsSwitch);
            acsSwitch.getAttribute('class').then(function (check) {
                if (check =='mat-slide-toggle mat-primary mat-checked'){
                    acsSwitch.click();
                    expect(acsSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary');
                }
            })
    };

    /**
     * enables Process Services
     * @method enableAPS
     */
    this.enableAPS = function (){
            Util.waitUntilElementIsVisible(apsSwitch);
            apsSwitch.getAttribute('class').then(function (check) {
                if (check == 'mat-slide-toggle mat-primary'){
                    apsSwitch.click();
                    expect(apsSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary mat-checked');
                }
            })
    };

    /**
     * disables Process Services
     * @method disableAPS
     */
    this.disableAPS = function (){
            Util.waitUntilElementIsVisible(apsSwitch);
            apsSwitch.getAttribute('class').then(function (check) {
                if (check =='mat-slide-toggle mat-primary mat-checked'){
                    apsSwitch.click();
                    expect(apsSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary');
                }
            })
    };

    /**
     * enables footer switch
     * @method enableFooter
     */
    this.enableFooter = function (){
            Util.waitUntilElementIsVisible(footerSwitch);
            footerSwitch.getAttribute('class').then(function (check) {
                if (check == 'mat-slide-toggle mat-primary'){
                    footerSwitch.click();
                    expect(footerSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary mat-checked');
                }
            })
    };

    /**
     * disables footer switch
     * @method disableFooter
     */
    this.disableFooter = function (){
            Util.waitUntilElementIsVisible(footerSwitch);
            footerSwitch.getAttribute('class').then(function (check) {
                if (check =='mat-slide-toggle mat-primary mat-checked'){
                    footerSwitch.click();
                    expect(footerSwitch.getAttribute('class')).toEqual('mat-slide-toggle mat-primary');
                }
            })
    };

    /**
     * logs in with a valid user
     * @method login
     * @param {String, String} username, password
     */
    this.login = function (username, password) {
            this.waitForElements();
            this.enterUsername(username);
            this.enterPassword(password);
            this.clickSignInButton();
            Util.waitUntilElementIsVisible(userPicture);
    };

};

module.exports = LoginPage;