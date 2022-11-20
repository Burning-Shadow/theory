class Subject {
  constructor() {
    this.observerList = [];
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  removeObserver(observer) {
    const index = this.observerList.findIndex(o => o.name === observer.name);
    this.observerList.splice(index, 1);
  }

  notifyObservers(message) {
    const observers = this.observerList;
    observers.forEach(observer => observer.notify(message));
  }
}


class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    if (subject) {
      subject.addObserver(this);
    }
  }

  notify(message) {
    console.log(this.name, 'got message', message);
    // this.subject.notifyObservers(message);
  }
}

const subject = new Subject();
const observerA = new Observer('observerA', subject);
const observerB = new Observer('observerB');
subject.addObserver(observerB);
subject.notifyObservers('Hello from subject');
subject.removeObserver(observerA);
subject.notifyObservers('Hello again');