(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // netlify/edge-functions/robloxWebhook.js
  async function handler(event, context) {
    try {
      const axios = __require("axios");
      const requestData = JSON.parse(event.body);
      const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
      await axios.post(discordWebhookUrl, {
        content: `Roblox Event: ${JSON.stringify(requestData)}`
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Data sent to Discord successfully" })
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" })
      };
    }
  }
})();
