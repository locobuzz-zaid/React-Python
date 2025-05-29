/* eslint-disable import/no-anonymous-default-export */
const config1 = {
  api_link: import.meta.env.VITE_API_LINK,
  consumer_key: import.meta.env.VITE_CONSUMER_KEY,
  uat_login: import.meta.env.VITE_UAT_LOGIN,
  app_id: import.meta.env.VITE_APP_ID,
  hub_address: import.meta.env.VITE_HUB_ADDRESS,
  angular_api_link: import.meta.env.VITE_ANGULAR_API_LINK,
};

export default { config1 };
