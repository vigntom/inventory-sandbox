const EventManager = (function createEventManager () {
  const events = {}

  return {
    subscribe (event, handler) {
      if (event in events) {
        events[event].push(handler)
        return
      }
      events[event] = [handler]
    },

    unsubscribe(event, handler) {
      if (event in events) {
        events[event] = events[event].filter(
          eventHandler => eventHandler !== handler
        )
      }
    },
    trigger(event, args) {
      events[event].forEach(handler => handler(args))
    }
  }
}())

const inventoryAPI = {
  show (toggle) {
    EventManager.trigger('inventory:show', toggle)
  },

  update (items) {
    EventManager.trigger('inventory:update', items)
  }
}
