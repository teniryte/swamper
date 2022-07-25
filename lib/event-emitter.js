class EventEmitter {
  handlers = {};

  _on(name, handler, oneTime) {
    this.handlers[name] = this.handlers[name] || [];
    this.handlers[name].push({
      oneTime: !!oneTime,
      handler: handler,
    });
    return this;
  }

  _one(name, handler) {
    return this._on(name, handler, true);
  }

  _once(...args) {
    return this._one(...args);
  }

  _emit(name) {
    const args = Array.prototype.slice.call(arguments, 1),
      handlers = this.handlers[name] || [];
    handlers.forEach((ev, i) => {
      ev.handler.apply(this, args);
      if (ev.oneTime) {
        handlers.splice(i, 1);
      }
    });
    return this;
  }
}

export default EventEmitter;
