//负责增加唯一标识name
class Base {
  constructor() {
    Object.assign(
      this,
      {
        name: Number(Math.random().toFixed(20)).toString(36).replace(0, this.constructor.name),
      },
      ...arguments,
    );
  }
}

export default Base;
