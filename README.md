# evacutation-occupation-sensor

A remote occupancy sensor for the single bathroom stall in a large office.

This solution leverages a battery powered [Espruino MDBT42Q](http://www.espruino.com/MDBT42Q) and a RaspberryPi 3 loaded with [EspruinoHub](https://github.com/espruino/EspruinoHub) to broadcast BLE sensor data via MQTT and serve a static dashboard page.

## Setup

Follow the installation instructions for EspruinoHub on a Raspberry Pi 3.  

Update `config.json` with the MDBT42Q address and put it in `~/pi/EspruinoHub`.

Open the Espruino IDE at `http://RASPBERRY_PI_IP:1888/ide`.  Load `MDBT42Q.js` to the MDBT42Q and run `save()`.

Navigate to `http://RASPBERRY_PI_IP:1888/mqtt` to verify MQTT broadcast.

Navigate to `http://RASPBERRY_PI_IP:1888/bathroom` to view the bathroom status.

## Hardware

[Espruino MDBT42Q](http://www.espruino.com/MDBT42Q)

![MDBT42Q Image](http://www.espruino.com/refimages/MDBT42Q_board.jpg)

[Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)

![RPi3](https://www.raspberrypi.org/app/uploads/2017/05/Raspberry-Pi-3-462x322.jpg)

[Adafruit 500 mAh LiPo Battery](https://www.adafruit.com/product/1578)
[Adafruit LiPo Charger](https://github.com/adafruit/Adafruit-MicroLipo-PCB)
[Sparkfun Tilt Sensor](https://www.sparkfun.com/products/10289)
Slide Switch

## System Design

![Whiteboard image of system](doc/whiteboard.jpg)

## Software

### [EspruinoHub](https://github.com/espruino/EspruinoHub)

An excellent bridging solution to serve BLE advertising data via MQTT.  This lives on the Raspberry Pi 3 and serves the following topics:

```
/ble/advertise/stall-monitor-men/l  // Lock Status
/ble/advertise/stall-monitor-men/d  // Previous State Duration (sec)
/ble/advertise/stall-monitor-men/battery // Battery Status (Percentage based on max voltage of 3.3V and min voltage of 2.5V)
/ble/advertise/stall-monitor-men/rssi // RSSI
```

### Espruino IDE

The BLE sensor itself runs Javascript, with a number of libraries built in for GPIO and BLE control.  See the sensor code in `MDBT42Q.js`.

The code uses `setWatch` and `NRF.setLowPowerConnection` to maximize battery life.

### Dashboard

## Case Design

The case was designed in AutoDesk Fusion 360, and printed on a MakerBot Replicator 2.  Design files can be found in `/case`
