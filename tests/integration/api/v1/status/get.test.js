test('GET /api/v1/status should return application status', async () => {
  const res = await fetch('http://localhost:3000/api/v1/status');
  const resBody = await res.json();
  const parsedUpdatedAt = new Date(resBody.updated_at).toISOString();

  expect(res.status).toBe(200);
  expect(resBody.status).toBe("I'M ALIVE");

  expect(resBody.updated_at).toEqual(parsedUpdatedAt);

  expect(resBody.database.db_version).toBeDefined();
  expect(resBody.database.db_version).toBe('16.11');

  expect(resBody.database.db_max_connections).toBeDefined();
  expect(resBody.database.db_max_connections).toBe(100);

  expect(resBody.database.db_open_connections).toBeDefined();
  expect(resBody.database.db_open_connections).toBe(1);
});

test.skip('GET /api/v1/status SQL injection example', async () => {
  await fetch(
    "http://localhost:3000/api/v1/status?db_name='; SELECT pg_sleep(4); --",
  );
  // type ? allow send query parameter when application make a request
  // after =' type ; will finish the query sended to database
  // and depend on how application use parameterized queries, it could force another query
  // to execute inside our database, in this fake scenario: SELECT pg_sleep(4).
  // then you finish the second query with ; and send -- which tell database that everything after
  // the malicious query is a comment.
});
