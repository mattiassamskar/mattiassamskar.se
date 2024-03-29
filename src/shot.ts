import { GameImage } from "./utils";

export class Shot implements GameImage {
  image: HTMLImageElement;
  audioName: string;
  audioContext: AudioContext;
  audioBuffer: AudioBuffer;
  bufferSource: AudioBufferSourceNode;
  readonly name: string;
  readonly width: number;
  readonly height: number;
  left: number;
  top: number;
  isVisible: boolean;

  constructor(name: string, audioName: string, x: number, y: number) {
    this.name = "shot";
    this.left = x;
    this.top = y;
    this.width = 9;
    this.height = 50;
    this.image = new Image(this.width, this.height);
    this.image.src = name;
    this.audioName = audioName;
    this.isVisible = false;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  async init() {
    this.audioContext = new AudioContext();
    this.audioContext.resume();
    const response = await fetch(this.audioName);
    const audioData = await response.arrayBuffer();
    this.audioBuffer = await this.audioContext.decodeAudioData(audioData);
  }

  playSound() {
    this.bufferSource = this.audioContext.createBufferSource();
    this.bufferSource.buffer = this.audioBuffer;
    this.bufferSource.connect(this.audioContext.destination);
    this.bufferSource.start();
  }

  move(secondsPassed: number) {
    this.top -= 700 * secondsPassed;
    if (this.bottom < 0) {
      this.isVisible = false;
    }
  }
}
