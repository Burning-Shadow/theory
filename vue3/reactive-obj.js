const targetMap = new Map();

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

function effectWatcher(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
};

function getDep(target, key) {
  console.log(key);

  // 一个 key 对应一个 dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);

      dep.depend();

      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    }
  })
};

const user = reactive({
  age: 19,
});
let double;
effectWatcher(() => {
  console.log('=== reactive ===');
  double = user.age;
  console.log('double = ', double);
});

user.age = 20;