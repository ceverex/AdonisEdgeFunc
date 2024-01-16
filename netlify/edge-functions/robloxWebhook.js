// robloxWebhook.js

export default async function handler(event, context) {
  try {
    // Import Axios directly within the function
    const axios = (await import("https://cdn.skypack.dev/axios")).default;

    // Read the stream and convert it to text
    const bodyText = await event.text();
    const requestData = JSON.parse(bodyText);

    // Access environment variable using import.meta.env
    const discordWebhookUrl = Netlify.env.get("DISCORD_WEBHOOK_URL");

    // Send data to Discord webhook using Axios
    const response = await axios.post(discordWebhookUrl, {
      content: `Roblox Event: ${JSON.stringify(requestData)}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data sent to Discord successfully", response }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}
