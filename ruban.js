class Ruban {
  constructor(midiNote, label, startX, startY, endY, width) {
    this.midiNote = midiNote;
    this.label = label;
    this.startX = startX;
    this.startY = startY;
    this.endY = endY;
    this.width = width;
    this.isPlaying = true;
    this.speed = 2; // Vitesse constante
  }

  update() {
    if (this.isPlaying) {
      this.startY -= this.speed;
    } else {
      this.startY -= this.speed;  
      this.endY -= this.speed;
    }

    // Supprimer le ruban lorsque le segment stop atteint le haut de l'écran
    if (this.endY <= 0) {
      this.isPlaying = false;
    }
  }

  display() {
    if (this.endY > 0) {
      push();
      noFill();
      stroke(255); // Couleur blanche
      strokeWeight(this.width / 30); // Augmenter l'épaisseur du trait
      rect(this.startX, this.startY, this.width, this.endY - this.startY, 10); // Coins arrondis

      // Afficher le label si le ruban est assez long
      if (this.endY - this.startY > 40) {
        fill(255);
        noStroke();
        textSize(this.width / 2); // Augmenter la taille du texte
        textAlign(CENTER, TOP);
        text(this.label, this.startX + this.width / 2, this.startY + this.width / 10);
      }
      if (this.endY - this.startY > 80 && !this.isPlaying) {
        fill(255);
        noStroke();
        textSize(this.width / 2); // Augmenter la taille du texte
        textAlign(CENTER, BOTTOM);
        text(this.label, this.startX + this.width / 2, this.endY - this.width / 10);
      }
      pop();
    }
  }

  stop() {
    console.log('stop' + this.label);
    this.isPlaying = false;
  }
}
