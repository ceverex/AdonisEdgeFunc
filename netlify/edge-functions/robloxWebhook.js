// robloxWebhook.js

import "https://cdn.skypack.dev/axios";

export default async function handler(event, context) {
  try {
    const axios = window.axios; // Use window.axios since axios is loaded globally

    // ... (your existing code)

    const response = await axios.post(discordWebhookUrl, requestData);

    // Log the raw response body
    console.log("Response Body:", response.data);

    // Attempt to parse the response body as JSON
    const responseBody = JSON.parse(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data sent to Discord successfully" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
