export default class SgsRect {
  public x2: number;
  public y2: number;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.x2 = x + width;
    this.y2 = y + height;
  }

  contains(x: number, y: number) {
    return (
      this.x <= x &&
      x <= this.x + this.width &&
      this.y <= y &&
      y <= this.y + this.height
    );
  }

  containsRect(rect: SgsRect) {
    return (
      this.x <= rect.x &&
      rect.x2 <= this.x2 &&
      this.y <= rect.y &&
      rect.y2 <= this.y2
    );
  }

  intersectRect(r2: SgsRect) {
    return !(
      r2.x > this.x2 ||
      r2.x2 < this.x ||
      r2.y > this.y2 ||
      r2.y2 < this.y
    );
  }
}
