test('GET /api/v1/status should return application health status', async () => {
  const res = await fetch('http://localhost:3000/api/v1/status');
  const resBody = await res.json();
  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();

  expect(res.status).toBe(200);
  expect(resBody.status).toBe("I'M ALIVE");

  expect(resBody.updated_at).toEqual(parsedUpdatedAt);

  expect(resBody.database.db_version).toBeDefined();
  expect(resBody.database.db_version).toBe('16.11')

  expect(resBody.database.db_max_connections).toBeDefined();
  expect(resBody.database.db_max_connections).toBe(100);

  expect(resBody.database.db_open_connections).toBeDefined();
  expect(resBody.database.db_open_connections).toBe(1);
});

test.skip('GET /api/v1/status SQL injection validation', async () => {
  await fetch("http://localhost:3000/api/v1/status?db_name='; SELECT pg_sleep(4); --");
});
