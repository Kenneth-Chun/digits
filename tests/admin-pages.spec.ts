import { test, expect } from './auth-utils';

test.slow();
test('admin can view contacts and users', async ({ getUserPage }) => {
  const adminPage = await getUserPage('admin@foo.com', 'changeme');

  await adminPage.goto('http://localhost:3000/');
  await expect(adminPage.getByRole('button', { name: 'admin@foo.com' })).toBeVisible({
    timeout: 10000,
  });
  await expect(adminPage.getByRole('link', { name: 'digits' })).toBeVisible();
  await expect(adminPage.getByRole('link', { name: 'Add Contact' })).toBeVisible();
  await expect(adminPage.getByRole('link', { name: 'List Contacts' })).toBeVisible();
  await expect(adminPage.getByRole('link', { name: 'Admin' })).toBeVisible();

  await adminPage.getByRole('link', { name: 'Admin' }).click();
  await expect(adminPage.getByRole('heading', { name: 'List Contacts (Admin)' })).toBeVisible();
  await expect(adminPage.getByRole('heading', { name: 'List Users Admin' })).toBeVisible();
});
