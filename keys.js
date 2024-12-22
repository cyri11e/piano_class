class Key {
  constructor(index, startNote,keyType, originX, originY , size, isPlayed, isScale, label){
    this.index = index
    this.startNote = startNote
    this.keyType = keyType
    this.setNote()
    this.size = size
    this.w = this.size
    this.h = this.size*6
    this.x = originX
    this.y = windowHeight-this.h-this.x
    this.isHover = false
    this.isPlayed = isPlayed
    this.isScale = isScale  
    this.label = label
    this.thickness = 1
    this.isWhiteKey = true
    
    this.frameColor = 'green'
    this.scaleColor = 'white'
    this.scaleColorWhite = 'rgb(255,255,255)'
    this.scaleColorBlack = '#000000(0,0,0)'
    this.playedColor = '#00B0FF'
    this.colorModes = ['BW','color','fullcolor','invisible']
    this.colorMode = 'BW'
  }

  setNote(){
    this.startNoteChroma = this.getNoteChroma(this.startNote)
    this.noteChroma =this.index+this.startNoteChroma
    this.midiNote = this.getMidiNote(this.startNote)+this.index
    this.midiNoteLabel = Tonal.Note.fromMidi(this.midiNote)
    this.noteLabel = Tonal.Note.pitchClass(this.midiNoteLabel)
    this.chromaNote = this.getChromaNote()  
  }

  setColors(chroma){
    // touches noires
    if ([1,3,6,8,10].includes(chroma%12)){
      if (this.colorMode=='invisible'){
        this.scaleColor = 'lime' 
        this.playedColor = 'white'
        } else  if ((this.colorMode=='BW')||(this.colorMode=='color')){
        this.scaleColor = 'rgb(22,21,21)'  
        this.playedColor = 'cyan'
      }
      else {
        this.scaleColor = color(30*(chroma%12),20,30)  
        this.playedColor = color(30*(chroma%12),100,70)  
      }
   } else { 
   // touches blanches
   if (this.colorMode=='invisible'){
    this.scaleColor = 'lime' 
    this.playedColor = 'white'
    } else if (this.colorMode=='BW'){
       this.scaleColor = 'rgb(249,249,238)' 
       this.playedColor = 'cyan'
     }
     else {
       this.scaleColor = color(30*(chroma%12),20,60)
       this.playedColor = color(30*(chroma%12),100,60)
     }     
   } 
   if (this.isScale) {
     stroke('black')
     this.color= this.scaleColor      
   } 
   if (this.isPlayed){
     stroke('white')
     this.color =this.playedColor
   } 
  }

  getNoteChroma(note){
    let noteChroma 
    noteChroma=Tonal.Note.get(note).chroma
    return noteChroma
  }

  updateSize(size){
    this.size = size
    this.w = this.size
    this.h = this.size*6
  }

  updateColor(){
    let indexColorMode
    indexColorMode = this.colorModes.indexOf(this.colorMode)
    indexColorMode =(indexColorMode +1)%this.colorModes.length
    this.colorMode = this.colorModes[indexColorMode]
  }
  updateLiveNotes(liveNotes){
    this.liveNotes = liveNotes
    if (liveNotes.includes(this.midiNote))
      this.isPlayed =true
    else
      this.isPlayed =false
  }

  display(){    
    noFill()
    colorMode(HSL,360,100,100) 
    strokeWeight(1)
    
    // recuparation de la couleur
    this.setColors(this.chromaNote)
    // coordonnées
    this.getX()
    // forme
    let shape = this.getShape(this.chromaNote)  
    
    fill(this.color)
    this.displayKey(shape, this.keyX, this.y, this.w, this.h)
    
    if (this.midiNoteLabel.includes('C')){    
      fill('silver')
      this.displayLabel()
    }
    if (this.isPlayed){    
      this.displayNote()
    }

  } 
  getX(){
    this.delta = this.getDelta(this.noteChroma)
    let delta2 = this.getDelta(this.startNoteChroma) // pour recaler non C
    this.keyX = this.x+this.delta-delta2  //-this.getDelta(this.startNoteChroma)    
    
    if (['C','F'].includes(this.noteLabel)) this.labelX = this.keyX + 0.4*this.w/2
    if (['D','G','A'].includes(this.noteLabel)) this.labelX = this.keyX + 0.6*this.w/2
    if (['E','B'].includes(this.noteLabel)) this.labelX = this.keyX + 0.8*this.w/2
    if (!this.isWhiteKey) this.labelX = this.keyX + 0.4*this.w/2

  }

  getDelta(index){
    //calcule loffset entre le X d origine 
    // et l endroit on on dessin la note
    let delta 
    let octave = Math.floor(index/12)   
    //decalage par defaut = 1/2 touche
    delta = index*this.w/2    
    // pour les touches noire on reajuste a 2/3
    if ([1,3,6,8,10].includes(index%12)) {
      delta = delta +this.w/6     
    } 
    if ( (index%12) > 4) delta = delta +this.w/2 //+octave*this.w/2
    if ( octave>0 ) delta = delta +(octave)*this.w    
    return delta
  }
    
    displayKey(shape, x, y, w, h) {
      if (shape === 'b') {
        this.blackKeyShape(x, y, w, h);
      } else {
        this.generalKeyShape(shape, x, y, w, h);
      }
    }
  
    generalKeyShape(shape, x, y, w, h) {
      beginShape();
      switch (shape) {
        case 'I':
          vertex(x, y);
          vertex(x + w - this.thickness, y);
          vertex(x + w - this.thickness, y + h);
          vertex(x, y + h);
          break;
        case 'C':
          vertex(x, y);
          vertex(x, y + h);
          vertex(x + w - this.thickness, y + h);
          vertex(x + w - this.thickness, y + h * 0.6);
          vertex(x + w / 1.5, y + h * 0.6);
          vertex(x + w / 1.5, y);
          break;
        case 'D':
          vertex(x + (w / 3), y);
          vertex(x + w / 1.5, y);
          vertex(x + w / 1.5, y + h * 0.6);
          vertex(x + w - this.thickness, y + h * 0.6);
          vertex(x + w - this.thickness, y + h);
          vertex(x, y + h);
          vertex(x, y + h * 0.6);
          vertex(x + (w / 3), y + h * 0.6);
          break;
        case 'E':
          vertex(x + w / 3, y);
          vertex(x + w - this.thickness, y);
          vertex(x + w - this.thickness, y + h);
          vertex(x, y + h);
          vertex(x, y + h * 0.6);
          vertex(x + w / 3, y + h * 0.6);
          break;
      }
      endShape(CLOSE);
    }
  
    blackKeyShape(x, y, w, h) {
      rect(x + this.thickness, y, w / 1.5 - this.thickness * 2, h * 0.6 - this.thickness);
    }
  
  
  displayLabel(){
    noStroke()
    textFont('Arial')
    textSize(this.w/2)
    textAlign(LEFT,TOP)
    text(this.midiNoteLabel,this.labelX, this.y+this.h-this.w/2)
  }

  displayNote(){
    noStroke()

    fill('white')
    textFont('Arial')
    textSize(this.w)
    textAlign(LEFT,TOP)
    textKeyNote(this.noteLabel,this.labelX, this.y-this.w)
  } 
  

  CShape(x,y,w,h){
    beginShape();  
    vertex(x, y);
    vertex(x, y+h)
    vertex(x+w-this.thickness, y+h )
    vertex(x+w-this.thickness, y+h*0.6) 
    vertex(x+w/1.5, y+h*0.6)
    vertex(x+w/1.5, y );
    endShape(CLOSE)
  }
  
  blackKeyShape(x,y,w,h){
    rect(x+this.thickness, y,
         w/1.5-this.thickness*2 , h*0.6 -this.thickness);
  }
  
  DShape(x,y,w,h){
    beginShape();  
    vertex(x+(w/3), y);
    vertex(x+w/1.5, y);
    vertex(x+w/1.5, y+h*0.6);
    vertex(x+w-this.thickness, y+h*0.6 );
    vertex(x+w-this.thickness, y+h);
    vertex(x, y+h );
    vertex(x, y+h*0.6 )
    vertex(x+(w/3), y+h*0.6)
    endShape(CLOSE)
  }
 
  EShape(x,y,w,h){
    beginShape();
    vertex(x+w/3, y);
    vertex(x+w-this.thickness, y);
    vertex(x+w-this.thickness, y+h );
    vertex(x, y+h );
    vertex(x, y+h*0.6 );
    vertex(x+w/3, y+h*0.6 );
    endShape(CLOSE)
  }
  
  IShape(x,y,w,h){    
    rect(x, y, w-this.thickness ,h );
  }

    
  getShape(midiNote){
    let shape,note,letter,isBlack
    note = Tonal.Midi.midiToNoteName(midiNote, { pitchClass: true })
    letter = Tonal.Note.get(note).letter
    isBlack = (Tonal.Note.get(note).alt != 0)

    if (isBlack) {
      this.isWhiteKey = false
      return 'b'
    }
    // cas particuler des 1ere et derniere note
    if (this.keyType=='first'){
      if (['B','E'].includes(letter))
        shape = 'I'
      if (['C','D','F','G','A'].includes(letter))
        shape = 'C'
    } else if (this.keyType=='last'){
            if (['D','E','G','A'].includes(letter))
              shape = 'E'
            if (['F','C'].includes(letter))
              shape = 'I'
    } else {
     // cas normaux  
        if (['C','F'].includes(Tonal.Note.get(note).letter))
          shape = 'C'
        else if (['D','G','A'].includes(Tonal.Note.get(note).letter))
          shape = 'D'
        else if (['E','G','B'].includes(Tonal.Note.get(note).letter))
          shape = 'E'
        } 
  
    return shape
  }

  updateOctave(octave){    
    if (octave==1)
      this.startNote = Tonal.Note.transpose(this.startNote,'8P')
    else
      this.startNote = Tonal.Note.transpose(this.startNote,'-8P')
    this.setNote()
  }

  getMidiNote(note){
    let midiNote
    midiNote = Tonal.Midi.toMidi(note)
    return midiNote
  }
  
  getChromaNote(){
    let chromaNote
    chromaNote = this.midiNote%12   
    return chromaNote
  }  
  
  mouseMoved(){
    
    if ( this.isWhiteKey) {
      if ((mouseX > this.keyX)&&(mouseX < this.keyX+this.w)&&
          (mouseY > this.y+this.h*0.6)&&(mouseY < this.y+this.h)) 
      this.isHover  =true
      else 
      this.isHover  =false      
    } else {
        if ((mouseX > this.keyX)&&(mouseX < this.keyX+this.w)&&
          (mouseY > this.y)&&(mouseY < this.y+this.h*0.6)) 
      this.isHover  =true
      else 
      this.isHover  =false       
    }
  }
  
  mousePressed(){
    if (this.isHover)
      this.toggleLock()
  }
  
  toggleLock(){
    this.isLocked = !this.isLocked

    this.isPlayed =this.isLocked
  }
}