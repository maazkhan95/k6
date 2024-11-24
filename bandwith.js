import * as fs from 'k6/fs';
import http from 'k6/http';
import { open } from 'k6/fs';
import { sleep } from 'k6';




export let options = {
    stages: [
        { duration: '1m', target: 10 }, // Ramp up to 10 users over 1 minute
        { duration: '1m', target: 10 }, // Maintain 10 users for 1 minute
        { duration: '1m', target: 0 },  // Ramp down to 0 users over 1 minute
    ],
};

const filePath = './100Mb.dat'; // Path to the file in the same folder
const uploadEndpoint = 'https://wordpress-1312510-4789320.cloudwaysapps.com/'; // Replace with your upload endpoint

export default function () {
    // Read the file in binary mode
    const fileData = open(filePath, 'b');

    // Upload the file
    const res = http.post(uploadEndpoint, fileData, {
        headers: { 'Content-Type': 'application/octet-stream' },
    });

    // Log the response status
    console.log(`Uploaded file | Status: ${res.status} | Response time: ${res.timings.duration} ms`);

    // Pause for a moment to simulate user behavior
    sleep(1);
}
