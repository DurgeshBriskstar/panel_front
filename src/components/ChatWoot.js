import  { useEffect } from "react";
// Config
import { CHATWOOT_TOKEN } from '../config';

const ChatWoot = () => {

  useEffect(() => {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      // type: "expanded_bubble",
      showPopoutButton: true,
    };

    (function (d, t) {
      const BASE_URL = "https://app.chatwoot.com";
      const g = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];
      g.src = `${BASE_URL}/packs/js/sdk.js`;
      s.parentNode.insertBefore(g, s);
      g.defer = true;
      g.async = true;
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: CHATWOOT_TOKEN, // token
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);
  return null;
};
export default ChatWoot;