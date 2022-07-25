import EventEmitter from './event-emitter';
import uniqueId from 'lodash/uniqueId';

class Worker extends EventEmitter {
  constructor(Class) {
    super();
    this.Class = Class;
    this.worker = new Class();
    this.rpcHandlers = {};
    this.setEvents();
  }

  setEvents() {
    this.worker.onmessage = event => {
      const data = JSON.parse(event.data);
      this._emit(`event:${data.name}`, ...data.args);
    };
    this.on('rpc', res => {
      const handler = this.rpcHandlers[res.rpcId];
      if (!handler) return;
      handler(res);
    });
  }

  on(name, cb) {
    this._on(`event:${name}`, (...args) => {
      cb(...args);
    });
  }

  once(name, cb) {
    this._on(
      `event:${name}`,
      (...args) => {
        cb(...args);
      },
      true
    );
  }

  emit(name, ...args) {
    this.worker.postMessage(
      JSON.stringify({
        type: 'event',
        name: name,
        args,
      })
    );
  }

  async call(name, ...args) {
    return new Promise((resolve, reject) => {
      const req = {
        rpcId: uniqueId('rpc'),
        name: name,
        args: args,
      };
      this.emit('rpc', req);
      this.rpcHandlers[req.rpcId] = res => {
        if (res.success) {
          return resolve(res.result);
        }
        reject(new Error(res.error));
      };
    });
  }

  async _loadMethodsNames() {
    const names = await this.call('_getMethodsNames');
    this._methodsNames = names;
    this._methodsNames.forEach(methodName => {
      this[methodName] = (...args) => {
        return this.call(methodName, ...args);
      };
    });
  }
}

export default Worker;
