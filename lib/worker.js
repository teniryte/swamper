import PromiseWorker from 'promise-worker';

class Worker {
  constructor(Class) {
    this.Class = Class;
    this.worker = new PromiseWorker(new Class());
  }

  async call(name, ...args) {
    const req = {
      method: name,
      args,
    };
    const content = JSON.stringify(req);
    const res = await this.worker.postMessage(content);
    if (res.success) {
      return res.result;
    }
    throw new Error(res.error);
  }

  async _loadMethodsNames() {
    const names = await this.call('_methodsNames');
    this._methodsNames = names;
    this._methodsNames.forEach(methodName => {
      this[methodName] = (...args) => {
        return this.call(methodName, ...args);
      };
    });
  }
}

export default Worker;
