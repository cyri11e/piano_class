class Piano {
  constructor( x, y, keyCount ){
     this.x = x
     this.y = y
     this.updateKeyCount(keyCount)
     this.chord = []
     this.chordName=''
     this.ChordLocked = false

 
  }
     
  
  setKeyCount(count) {
    this.keyCount = count;
    this.updateSize();
  }

  updateKeyCount(keyCount){
    this.keyCount = keyCount //25 C4 49 C3, 61 C2, 76 E1, 88 A0 
    this.s = (windowWidth-2*this.x)/this.whiteCount(keyCount)     
    this.keys = []
    this.startNote = this.getStartNote(keyCount) 
    for ( let i=0; i<keyCount; i++){
      let keyType =this.getKeyType(i,keyCount)
      this.keys.push(new Key(i,
                            this.startNote,
                            keyType,
                            this.x,
                            this.y,
                            this.s,
                            false,
                            true,
                            'X')
                          )                   
    }
  }

  display(){
    for (let key of this.keys){
      key.display()         
    }
    textAlign((CENTER,CENTER))
    
    
    this.displayChord()
    this.displayFromFifthChord()
    this.displayToFifthChord()
  }

  displayChord(){
    if (!this.chordName) return
    let size = ((20-this.chordName.length)/20)*this.s*6/2 
    textSize(size)
    fill('white')

    text(this.chordName,windowWidth/2,windowHeight/2-this.s*4)
  }

  displayToFifthChord(){
    if (!this.chordName) return
    let size = ((20-this.chordName.length)/20)*this.s*6/4 
    textSize(size)
    fill('white')

    text(Tonal.Chord.transpose(this.chordName, '-5P'),3*windowWidth/4,windowHeight/2-this.s*6)
  }
  displayFromFifthChord(){
    if (!this.chordName) return
    let size = ((20-this.chordName.length)/20)*this.s*6/4 
    textSize(size)
    fill('white')

    text(this.getSecondaryDominant(this.chordName),windowWidth/4,windowHeight/2-this.s*6)
  }
  updateSize(){
    for (let key of this.keys){
      key.updateSize((windowWidth-2*this.x)/this.whiteCount(this.keyCount) )         
    }
  }

  getSecondaryDominant(chordName){
    let secondaryDominant,root,chord
    chord = Tonal.Chord.get(chordName)
    root = chord.tonic
    secondaryDominant = Tonal.Chord.transpose(Tonal.Chord.getChord('7', root).symbol, '5P')    
    return secondaryDominant
  }


  updateLiveNotes(liveNotes){
    this.selectedNotes = []
    for (let key of this.keys){
      key.updateLiveNotes(liveNotes)
      this.selectedNotes.push(key.midiNoteLabel)
    }
    if (this.selectedNotes.length>2){
      this.chordName = Tonal.Chord.detect(liveNotes.toSorted()
      .map(n => Tonal.Midi.midiToNoteName(n, { pitchClass: true, sharps: false } )), { assumePerfectFifth: true })
      .filter(e => !e.includes('#5'))[0]
    } else {
      this.chordName = ''
    }
  }

  updateColor(){
    for (let key of this.keys){
      key.updateColor()          
    }
  }   

  updateOctave(octave){
    for (let key of this.keys){
      key.updateOctave(octave)         
    }  
  }

  // interactions
  mouseMoved() {
    for (let key of this.keys){
      key.mouseMoved()         
    }  
  }
     
  mousePressed(){
    this.selectedNotes = []
    for (let key of this.keys){
        key.mousePressed()   
        if (key.isPlayed)    
          this.selectedNotes.push(key.midiNote)  
      }
      
      this.setChord()
  }

  mouseReleased() {
    // Ajoutez la logique de mouseReleased ici si nécessaire
  }

  mouseDragged() {
    // Ajoutez la logique de mouseDragged ici si nécessaire
  }

  mouseWheel(event) {  
    let direction
    if (event.delta > 0) {
      direction = +1;
    } else {
      direction = -1;
    }
    // Ajoutez la logique de mouseWheel ici si nécessaire
  }

  toggleKeyCount(k){
    let keyCountindex, keyCount
    keyCountindex = keyCounts.indexOf(k)
    keyCountindex++
    keyCountindex = (keyCountindex) % keyCounts.length
    keyCount = keyCounts[keyCountindex]
    console.log(k + '>' + keyCount)
    return keyCount
  }

  keyPressed(keyCode) {
    console.log(keyCode)
    // c couleur /transparent
    if (keyCode == 67) {
      this.updateColor()
    } 
    //z mode zoom
    if (keyCode == 90) {
      this.updateKeyCount(this.toggleKeyCount(this.keyCount))
    } 
    //haut octave +
    if (keyCode == 38) {
      this.updateOctave(1)
    }       
    //haut octave -
    if (keyCode == 40) {
      this.updateOctave(-1)
    } 

    // Changer le nombre de touches du piano
    if (keyCode == 50) { // touche '2'
      this.updateKeyCount(25);
    }
    if (keyCode == 52) { // touche '4'
      this.updateKeyCount(49);
    }
    if (keyCode == 54) { // touche '6'
      this.updateKeyCount(61);
    }
    if (keyCode == 55) { // touche '7'
      this.updateKeyCount(76);
    }
    if (keyCode == 56) { // touche '8'
      this.updateKeyCount(88);
    }
  }

  setChord(){
    if (this.selectedNotes.length>2){
      this.chordName = Tonal.Chord.detect(this.selectedNotes.toSorted()
      .map(n => Tonal.Midi.midiToNoteName(n, { pitchClass: true, sharps: false } )), { assumePerfectFifth: true })
      .filter(e => !e.includes('#5'))[0]
    } else this.chordName = ''
  }


  // utils
  whiteCount( keyCount){
    let whiteCount   
      if (this.keyCount==25)
        whiteCount= 15
      if (this.keyCount==49)
        whiteCount= 29
      if (this.keyCount==61)
        whiteCount= 36
      if (this.keyCount==76)
        whiteCount= 45
      if (this.keyCount==88)
        whiteCount= 52
    return whiteCount
  }

  getStartNote(keyCount){
    let startNote
    if (keyCount==88)
      startNote = 'A0'
    else if (keyCount==76)
      startNote = 'E1'
    else if (keyCount==61)
     startNote = 'C2' 
    else
      startNote = 'C3'
    return startNote
  }

  getKeyType(index,keyCount){
    let keyType ='middle'
    if (index==0)
      keyType='first'
    else if (index==keyCount-1)
      keyType='last'
    return keyType  
  }

  cleanChordLabel(chord){

  }

} // Class