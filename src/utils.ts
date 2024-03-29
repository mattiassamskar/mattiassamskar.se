export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getGradient = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const gradient = context.createRadialGradient(
    width * 0.3,
    height,
    30,
    width * 0.8,
    height,
    width
  );
  gradient.addColorStop(0, "orange");
  gradient.addColorStop(0.2, "yellow");
  gradient.addColorStop(0.4, "orange");
  gradient.addColorStop(0.6, "yellow");
  gradient.addColorStop(0.8, "orange");
  gradient.addColorStop(1, "yellow");

  return gradient;
};

export interface GameImage {
  name: string;
  left: number;
  top: number;
  bottom: number;
  right: number;
}

export const detectCollision = (a: GameImage, b: GameImage) => {
  if (
    a.right > b.left &&
    a.left < b.right &&
    a.top < b.bottom &&
    a.bottom > b.top
  ) {
    return true;
  }
  return false;
};
