import { trackEvent } from "@aptabase/react-native"

const Events = {
  // App lifecycle
  APP_FOREGROUND: "app_foreground",
  APP_BACKGROUND: "app_background",

  // Applications list
  APP_LIST_SWIPE_OPEN: "app_list_swipe_open",
  APP_RESTART: "app_restart",
}

function track(event, properties = {}) {
  trackEvent(event, properties)
}

export default {
  Events,
  track,
}
