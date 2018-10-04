const SENSOR = D14;
var state = false;
var time = getTime();
var newTime = 0;
var options = {
  name: "Skookum Stall Monitor",
  interval:1000,
  manufacturer:0x0590
};

function setAdvertisingData(doorState, duration) {
  options.manufacturerData = JSON.stringify({
    l: doorState ? 1 : 0,
    d: Math.round(duration)
  });
  
  //console.log(options);
  
  NRF.setAdvertising({
      0x180F : [Math.round((NRF.getBattery()-2.5)/0.8*100)]
      // This causes a DATA_SIZE error
      //0x1809 : [Math.round(E.getTemperature())]
    }, options
  );
}

// Initialization

pinMode(D14, 'input_pulldown');
NRF.setLowPowerConnection(true);
setAdvertisingData(!SENSOR.read(), 0);

// Main

setWatch(function(e) {
  if(state !== e.state) {
    newTime = getTime();
    //console.log('Door', e.state ? 'Unlocked' : 'Locked');
    //console.log('Duration:', (newTime - time));

    setAdvertisingData(!e.state, newTime - time);
    
    time = newTime;
  }
  
  state = e.state;
}, SENSOR, { repeat: true, edge: 'both', debounce: 1000 });
