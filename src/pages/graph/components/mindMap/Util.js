export default class Util {
  static uuid() {
    const id = (this._uuid || parseInt('zzz', 36)) + 1;
    return '_' + (this._uuid = id).toString(36).slice(1);
  }
  static random(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }
  static context() {
    return this._context || (this._context = document.createElement('canvas').getContext('2d'));
  }
}
