// robloxWebhook.js

export default async function handler(event, context) {
  try {
    // Read the stream and convert it to text
    const bodyText = await event.text();
    const requestData = JSON.parse(bodyText);

    // Access environment variable using Deno.env
    const discordWebhookUrl = Netlify.env.get('DISCORD_WEBHOOK_URL');

    // Send data to Discord webhook using fetch
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Roblox Event: ${JSON.stringify(requestData)}`,
      }),
    });

    // Ensure the response is a valid object
    const responseBody = response ? await response.json() : {};

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data sent to Discord successfully", responseBody }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

