import http from 'k6/http';
import { sleep } from 'k6';



export let options = {
  insecureSkipTLSVerify: true,
  stages: [
    { duration: '1m', target: 100 }, // Ramp up to 10 users over 1 minute
    { duration: '2m', target: 100 }, // Stay at 10 users for 2 minutes
    { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
  ],
};

const base_url = 'https://wordpress-1369533-5048320.cloudwaysapps.com/';
const largePayload = JSON.stringify({ data: 'x'.repeat(100 * 1024 * 1024) });


export default function () {
  // // Send a request with JSON content type
  // const jsonHeaders = { 'Content-Type': 'application/json' };
  // const jsonData = { key: 'value' };
  // http.post(`${base_url}/json-endpoint`, JSON.stringify(jsonData), { headers: jsonHeaders });
  http.post(`${base_url}/large-payload-endpoint`, largePayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  // Simulate requests from different countries by adding headers
  const usHeaders = { 'X-Country': 'US' };
  http.get(`${base_url}/endpoint`, { headers: usHeaders });

  const ukHeaders = { 'X-Country': 'UK' };
  http.get(`${base_url}/endpoint`, { headers: ukHeaders });

  // Sleep to simulate user behavior
  sleep(1);
}