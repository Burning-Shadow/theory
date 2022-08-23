let currentEffect = null;

class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newValue) {
    this._val = newValue;
    this.notice();
  }

  depend() {
    if (currentEffect) this.effects.add(currentEffect);
  };

  notice() {
    this.effects.forEach(effect => effect());
  };
};

function effectWatcher (effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
};

const dep = new Dep(10);
let b;
effectWatcher(() => {
  console.log('heihei');
  b = dep.value + 10;
  console.log(b);
});
dep.value = 20;
