interface Radio {
  switchRadio(trigger: boolean): void;
};

interface Battery {
  checkBatteryStatus(): void;
}

interface RadioWithBattery {
  checkBatteryStatus(): void;
};

class Car implements Radio{
  switchRadio() {

  };
}

// class CellPhone implements Radio, Battery {
class CellPhone implements RadioWithBattery {
  switchRadio() {

  };

  checkBatteryStatus() {

  };
}


