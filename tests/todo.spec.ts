import {expect, test} from '@playwright/test';
import User from '../models/user';
import RegisterPage from '../pages/RegisterPage';
import NewTodoPage from '../pages/NewTodoPage';
import TodoPage from '../pages/TodoPage';

test('should be able to add a todo', async ({page, request}) => {
     const user = new User();

   const registerPage = new RegisterPage(page, request);
   await registerPage.registerUsingTheAPI(user);


    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask("playwright");
const todoPage = new TodoPage(page);
const todoText = await todoPage.gettodoTextByIndex(0);
 expect(todoText).toEqual('playwright');
 });

 test('should be able to delete a todo', async ({page, request}) => {
    const user = new User();
   const registerPage = new RegisterPage(page, request);
   await registerPage.registerUsingTheAPI(user);

const newTodoPage = new NewTodoPage(page, request);
await newTodoPage.addNewTaskUsingAPI(user);

    const todoPage = new TodoPage(page);
    await todoPage.load();
    await todoPage.deleteTodoByIndex(0);
     const noTodosMessage = todoPage.getNooTodosMessage();
     await expect(noTodosMessage).toBeVisible();
 });





  
