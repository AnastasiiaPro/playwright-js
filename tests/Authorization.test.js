const { test, expect } = require("@playwright/test");

const user = require("../user");

test.describe ('Page', () => {
    test("successful authorization", async ({ page }) => {
     
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.getByPlaceholder("Email").fill(user.validUser.email);
        await page.getByPlaceholder("Пароль").fill(user.validUser.password);  
        await page.getByTestId("login-submit-btn").click();
        await expect(page).toHaveTitle("Моё обучение", {timeout: 30000});
    });

    test("unsuccessful authorization", async ({ page }) => {
     
        await page.goto("https://netology.ru/?modal=sign_in");
        await page.getByPlaceholder("Email").fill(user.invalidUser.email);
        await page.getByPlaceholder("Пароль").fill(user.invalidUser.password);  
        await page.getByTestId("login-submit-btn").click();
        await expect(page.getByTestId("login-error-hint")).toHaveText("Вы ввели неправильно логин или пароль");
    });
});
