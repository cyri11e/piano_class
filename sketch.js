let wH 
let wW 
let pianos = []
let keyCounts = [25,49,61,76,88]
let liveNotes =[]


function setup() {
  wH = windowHeight
  wW = windowWidth
  createCanvas(wW, wH);  
  

    
  // clavier
  pianos.push(new Piano(10, 50, keyCounts[1] )) 

  for (const piano of pianos)
    initializeMidi(piano)
}

function draw() {
  background('lime');
 
  // clavier
  for (const piano of pianos)
    piano.display()
  
}

function mouseMoved(){
  for (const piano of pianos)
    piano.mouseMoved()    
}

function mousePressed(){
  for (const piano of pianos)
    piano.mousePressed()
}

function mouseReleased(){
  for (const piano of pianos)
    piano.mouseReleased()
}

function mouseDragged(){

}

function mouseWheel(event) {  

}

function keyPressed(){
  for (const piano of pianos)
    piano.keyPressed(keyCode)
}

function windowResized() {
  wW =windowWidth
  wH = windowHeight
  resizeCanvas(wW, wH);

  for (const piano of pianos)
    piano.updateSize()
}


function notePressed(midiNote) {
  liveNotes.push(midiNote)
  for (const piano of pianos)
    piano.updateLiveNotes(liveNotes)
}

function noteReleased(midiNote) { 
  // retirer la note relachee
  if (liveNotes.includes(midiNote))
      liveNotes.splice(liveNotes.indexOf(midiNote), 1)  
  for (const piano of pianos)
    piano.updateLiveNotes(liveNotes)   
}

