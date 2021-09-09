import { ADD_NOTIFICATION,REMOVE_NOTIFICATION } from "../../constant";


export function addNotification(payload) {
    return {
      type: ADD_NOTIFICATION,
      payload
    }
  }

export function removeNotification(payload) {
    return {
      type: REMOVE_NOTIFICATION,
      payload
    }
  }