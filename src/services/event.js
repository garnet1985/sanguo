var Events = {
    pool: [],
    findEvent: function(eventName) {
      for (var i = this.pool.length - 1; i >= 0; i--) {
        if (this.pool[i].name === eventName) {
          return this.pool[i];
        }
      }
      return false;
    },
    uniqueCallback: function(event, callback) {

      var hasAdded = false;

      for (var i = 0; i < event.funcs.length; i++) {
        if (callback.toString() === event.funcs[i].toString()) {
          event.funcs[i] = callback;
          hasAdded = true;
          break;
        }
      }

      if (!hasAdded) {
        event.funcs.push(callback);
      }

    },
    removeEvent: function(eventName) {
      for (var i = this.pool.length - 1; i >= 0; i--) {
        if (this.pool[i].name === eventName) {
          this.pool.splice(i, 1);
          break;
        }
      }
    },
    destory: function(eventName) {
      this.removeEvent.call(this, eventName);
    },
    off: function(eventName) {
      this.removeEvent.call(this, eventName);
    },
    unSubscribe: function(eventName) {
      this.removeEvent.call(this, eventName);
    },
    once: function(eventName, callback) {
      var event = this.findEvent(eventName);
      if (event) {
        if (callback) {
          event.funcs.push(callback);
        }
      } else {
        event = {
          name: eventName,
          funcs: [callback],
          isOnce: true
        }
        this.pool.push(event);
      }
    },
    listen: function(eventName, callback) {

      var event = this.findEvent(eventName);

      if (event) {
        this.uniqueCallback(event, callback);
      } else {
        event = {
          name: eventName,
          funcs: [callback],
          isOnce: false
        }
        this.pool.push(event);
      }

    },
    on: function(eventName, callback) {
      this.listen.call(this, eventName, callback);
    },
    subscribe: function(eventName, callback) {
      this.listen.call(this, eventName, callback);
    },
    trigger: function(eventName, data) {

      var event = this.findEvent(eventName);

      if (event) {
        event.funcs.forEach(function(cb) {
          cb(data);
        });
        if (event.isOnce) {
          this.removeEvent(eventName)
        }
      }
    }
}

export default Events;