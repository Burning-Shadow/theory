class Dep {
  constructor(val) {
    this.effects = [];
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newValue) {
    this._val = newValue;
    this.notify();
  }

  depend() {
    if (Dep.currentEffect) this.effects.push(Dep.currentEffect);
  };

  notify() {
    this.effects.forEach(effect => effect());
  };
};

function effectWatcher (subscribe) {
  Dep.currentEffect = subscribe;
  subscribe();
  Dep.currentEffect = null;
};

const dep = new Dep(10);
let b;
effectWatcher(() => {
  console.log('嗨害嗨');
  b = dep.value + 10;
  console.log(b);
});
dep.value = 20;