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
  pianos.push(new Piano(10, 50, 25 )) 
  //pianos.push(new Piano(10, 250, 10, 61 )) 
  //pianos.push(new Piano(10, 250, 10, 76 )) 
  //pianos.push(new Piano(10, 350, 10, 88 ))
}

function draw() {
  background('lime');
 
  // clavier
  push()
  
  for (const piano of pianos)
    piano.display()

  pop()
  
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
  for (const piano of pianos)
    piano.mouseDragged()
}

function mouseWheel(event) {  
  for (const piano of pianos)
    piano.mouseWheel(event)
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

// Supprimer la fonction toggleKeyCount de sketch.js car elle est maintenant dans la classe Piano

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

function textKeyNote(note,x,y){ 
  let size = textSize()
  push()


  if (!note) // return
      console.log('oops')

  if (note.includes('##')) note = note.replace('##', '𝄪')
  if (note.includes('#')) note = note.replace('#', '♯')
  if (note.includes('bb')) note = note.replace('bb', '𝄫')
  if (note.includes('b')) note = note.replace('b', '♭')
  

  if (note.length > 2) {

      text(note[0],x-0.3*size,y)
      textSize(0.6*size)
      text(note[1]+note[2],x+0.3*size,y-0.3*size)
  } else
  if (note.length == 2) {
      text(note[0],x-0.1*size,y)
      textSize(0.6*size)
      text(note[1],x+0.3*size,y-0.2*size)
  } else {
      textSize(size)
      text(note[0],x,y)
  }
  
  pop()
}