// record-command.js

export default async function handler(event, context) {
  try {
    // Read the stream and convert it to text
    const bodyText = await event.text();
    const requestData = JSON.parse(bodyText);

    // Access environment variable using import.meta.env
    const discordWebhookUrl = Netlify.env.get("DISCORD_WEBHOOK_URL");

    // Update payload structure for embed
    const payload = {
      username: "Ceverex Logging System",
      avatar_url: "https://cdn.discordapp.com/attachments/1143722298268979210/1168756865648300123/ceverex2.png?ex=6552eca7&is=654077a7&hm=beef911b4835fdc3e821192a8425febac108612e9bb97e727d3d3426ac22d184&",
      embeds: requestData.embeds,  // assuming embeds are sent directly
    };

    // Send data to Discord webhook using fetch
    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
