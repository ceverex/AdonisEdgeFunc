// robloxWebhook.js

import 'https://cdn.skypack.dev/axios';

export default async function handler(event, context) {
  try {
    const axios = window.axios; // Use window.axios since axios is loaded globally
    // const axios = require('axios'); // no longer a direct import

    // Extract data from the request (customize this based on Roblox payload structure)
    const requestData = JSON.parse(event.body);

    // Your Discord webhook URL
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    // Send data to Discord webhook
    await axios.post(discordWebhookUrl, {
      content: `Roblox Event: ${JSON.stringify(requestData)}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data sent to Discord successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}
