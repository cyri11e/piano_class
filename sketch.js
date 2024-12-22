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
  
}

function mouseDragged(){

}

function mouseWheel(event) {  
  let direction
  if (event.delta > 0) {
    direction = +1;
  } else {
    direction = -1;
  }

}
  function windowResized() {
    wW =windowWidth
    wH = windowHeight
    resizeCanvas(wW, wH);

    for (const piano of pianos)
      piano.updateSize()
}

function keyPressed(){
  console.log(keyCode)
      // c couleur /transparent
      if (keyCode == 67) {
        for (const piano of pianos)
          piano.updateColor()
      } 
      //z mode zoom
      if (keyCode == 90) {
        for (const piano of pianos)
          piano.updateKeyCount(toggleKeyCount(piano.keyCount))
      } 
      //haut octave +
      if (keyCode == 38) {
        for (const piano of pianos)
          piano.updateOctave(1)
      }       
      //haut octave -
      if (keyCode == 40) {
        for (const piano of pianos)
          piano.updateOctave(-1)
      } 

        // Changer le nombre de touches du piano
  if (keyCode == 50) { // touche '2'
    for (const piano of pianos)
      piano.updateKeyCount(25);
  }
  if (keyCode == 52) { // touche '4'
    for (const piano of pianos)
      piano.updateKeyCount(49);
  }
  if (keyCode == 54) { // touche '6'
    for (const piano of pianos)
      piano.updateKeyCount(61);
  }
  if (keyCode == 55) { // touche '7'
    for (const piano of pianos)
      piano.updateKeyCount(76);
  }
  if (keyCode == 56) { // touche '8'
    for (const piano of pianos)
      piano.updateKeyCount(88);
  }
}

function toggleKeyCount(k){
    let keyCountindex,keyCount
    keyCountindex=keyCounts.indexOf(k)
    keyCountindex++
    keyCountindex=(keyCountindex) %keyCounts.length
    keyCount=keyCounts[keyCountindex]
    console.log(k +'>'+keyCount)
    return keyCount
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