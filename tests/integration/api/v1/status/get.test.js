test('GET /api/v1/status should return 200', async () => {
  const res = await fetch('http://localhost:3000/api/v1/status');
  const resBody = await res.json();

  expect(res.status).toBe(200);
  expect(resBody.status).toBe('OK');
});
