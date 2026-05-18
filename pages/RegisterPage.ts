import { APIRequestContext, Page } from "@playwright/test";
import User from "../models/user";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";

export default class RegisterPage{

private page :Page;
private request?: APIRequestContext;
    //contructor
constructor(page:Page, requst?:APIRequestContext){
    this.page = page;
    this.request = requst;
}


    //elements
private get firstNameInput() {
    return '[data-testid="first-name"]';
}
private get lastNameInput() {
    return '[data-testid="last-name"]';
}
private get emailInput() {
    return '[data-testid="email"]';
}
private get passwordInput() {
    return '[data-testid="password"]';
}
private get confirPasswordInput() {
    return '[data-testid="confirm-password"]';
}
private get submitButton() {
    return '[data-testid="submit"]';
}



    // methods
    async load(){
    await this.page.goto('/signup');
    }
    async register(user: User) {
    await this.page.fill(this.firstNameInput, user.getFirstName());
    await this.page.fill(this.lastNameInput, user.getLastName());
    await this.page.fill(this.emailInput, user.getEmail());
    await this.page.fill(this.passwordInput, user.getPassword());
    await this.page.fill(this.confirPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);
}
 
async registerUsingTheAPI(user:User) { 
    //register via API
    const response = await new UserApi(this.request!).register(user);
    //set cookies
    const responseBody = await response.json();
    const accessToken = responseBody.access_token;
    user.setAccessToken(accessToken);
    const userID = responseBody.userID;
    const firstName = responseBody.firstName;
    await this.page.context().addCookies([
        {
            name: 'access_token',
            value: accessToken,
            url: config.use?.baseURL,
        },
         {
            name: 'firstName',
            value: firstName,
            url: config.use?.baseURL,
        },
 {
            name: 'userID',
            value: userID,
            url: config.use?.baseURL,
        },


    ]);}
}