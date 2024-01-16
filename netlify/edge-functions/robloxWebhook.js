// robloxWebhook.js

export default async function handler(event, context) {
  try {
    // Read the stream and convert it to text
    const bodyText = await event.text();
    const requestData = JSON.parse(bodyText);

    // Access environment variable using Deno.env
    const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL'); // Netlify.env.get

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
    let responseBody;
    try {
      const text = await response.text();
      responseBody = JSON.parse(text);
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      responseBody = { error: 'Error parsing JSON response' };
    }

    console.log('Response Body:', responseBody);

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
