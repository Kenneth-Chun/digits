import { test, expect } from './auth-utils';

test.slow();
test('John can view his contacts', async ({ getUserPage }) => {
  const johnPage = await getUserPage('john@foo.com', 'changeme');

  await johnPage.goto('http://localhost:3000/');
  await expect(johnPage.getByRole('button', { name: 'john@foo.com' })).toBeVisible({
    timeout: 10000,
  });
  await expect(johnPage.getByRole('link', { name: 'Add Contact' })).toBeVisible();
  await expect(johnPage.getByRole('link', { name: 'List Contacts' })).toBeVisible();

  await johnPage.getByRole('link', { name: 'List Contacts' }).click();
  await expect(johnPage.getByRole('heading', { name: 'List Contacts' })).toBeVisible();
  await expect(johnPage.getByText('Philip Johnson')).toBeVisible();
  await expect(johnPage.getByText('Henri Casanova')).toBeVisible();
});
