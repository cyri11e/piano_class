// Enable WEBMIDI.js and trigger the onEnabled() function when ready
WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

// Function triggered when WEBMIDI.js is ready
function onEnabled() {

  // if (WebMidi.inputs.length < 1) {
  //   document.body.innerHTML+= "No device detected.";
  // } 
  // else {
  //   WebMidi.inputs.forEach((device, index) => {
  //     document.body.innerHTML+= `${index}: ${device.name} <br>`;
  //   });
  // }
  
  const mySynth = WebMidi.inputs[0];  
  mySynth.channels[1].addListener("noteon", e => notePressed(e.data[1]))
  mySynth.channels[1].addListener("noteoff", e => noteReleased(e.data[1]))
  mySynth.channels[1].addListener("controlchange", e => controlChange(e))
  mySynth.channels[2].addListener("noteon", e => notePressed(e.data[1]))
  mySynth.channels[2].addListener("noteoff", e => noteReleased(e.data[1]))
  mySynth.channels[2].addListener("controlchange", e => controlChange(e))  
  mySynth.channels[3].addListener("noteon", e => notePressed(e.data[1]))
  mySynth.channels[3].addListener("noteoff", e => noteReleased(e.data[1]))
  mySynth.channels[3].addListener("controlchange", e => controlChange(e)) 
  mySynth.channels[4].addListener("noteon", e => notePressed(e.data[1]))
  mySynth.channels[4].addListener("noteoff", e => noteReleased(e.data[1]))
  mySynth.channels[4].addListener("controlchange", e => controlChange(e)) 
}