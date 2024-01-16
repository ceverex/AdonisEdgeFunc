// robloxWebhook.js

export default async function handler(event, context) {
  try {
    // Read the stream and convert it to text
    const bodyText = await event.text();
    const requestData = JSON.parse(bodyText);

    // Access environment variable using import.meta.env
    const discordWebhookUrl = Netlify.env.get("DISCORD_WEBHOOK_URL"); // const discordWebhookUrl = import.meta.env.DISCORD_WEBHOOK_URL;

    // Send data to Discord webhook using fetch
    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `Roblox Event: ${JSON.stringify(requestData)}`,
      }),
    });

    // Log the raw response body
    console.log("Response Body:", await response.text());

    // Check if the response status is okay
    if (!response.ok) {
      console.error("Discord Webhook Error:", response.statusText);
      throw new Error("Failed to send data to Discord");
    }

    return new Response(JSON.stringify({ message: "Data sent to Discord successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
