const http = new XMLHttpRequest();
const url = "http://10.1.5.135:3000/stall";

function setBathroomStatus(occupied) {
  document.getElementById('occupied').style.display = occupied ? 'inline' : 'none';
};

function log(msg) {
  document.getElementById('log').textContent = msg;
}
    
// Create a client instance
client = new Paho.MQTT.Client(
  location.hostname,
  parseInt(location.port||80),
  location.pathname.substr(0,location.pathname.lastIndexOf("/")+1),
   "clientId");
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// log("MQTT Connecting...");
// connect the client
client.connect({onSuccess:onConnect});
// called when the client connects
function onConnect() {
// log("MQTT Connected");
  client.subscribe("#"); // get everything
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    log("MQTT connection lost:"+responseObject.errorMessage);
  }
}
// called when a message arrives
function onMessageArrived(message) {
  // log(""+message.destinationName+"  ->  "+JSON.stringify(message.payloadString));
  if (message.destinationName.startsWith("/ble/advertise/stall-monitor-men/l")) {
    console.log(message.destinationName, ": ", message.payloadString);
    setBathroomStatus(message.payloadString === "1");
  }
}
