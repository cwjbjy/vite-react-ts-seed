import Base from './base';

//触发器，实现发布-订阅模式
class Emitter extends Base {
  constructor() {
    super(
      {
        event_bus: {},
      },
      ...arguments,
    );
  }

  on(eventName, fn) {
    if (!this.event_bus[eventName]) {
      this.event_bus[eventName] = [];
    }
    this.event_bus[eventName].push(fn);
  }

  emit(eventName, ...rest) {
    let funcs = this.event_bus[eventName];
    if (funcs && funcs.length) {
      funcs.forEach((func) => func(...rest));
    }
  }

  off(eventName) {
    delete this.event_bus[eventName];
  }
}

export default Emitter;
