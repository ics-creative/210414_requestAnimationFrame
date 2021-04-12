/**
 * スクロールアニメーションするクラスです。
 */
export class ScrollAnimation {
  startPositionX = 0;
  startPositionY = 0;
  endPositionX = 0;
  endPositionY = 0;
  startTime = 0;
  duration = 1000;
  animationId;
  constructor({ duration }) {
    this.duration = duration;
  }

  /**
   * アニメーションのイージング関数です
   * @param x
   * @returns {number}
   */
  easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  /**
   * フレームごとにスクロールを実行する関数です。
   * これを連続的に繰り返すことでアニメーションさせています。
   * @param time
   */
  animation(time) {
    if (time < this.startTime + this.duration) {
      const progress = (time - this.startTime) / this.duration;
      const scrollValX =
        this.startPositionX +
        (this.endPositionX - this.startPositionX) * this.easeOutQuart(progress);
      const scrollValY =
        this.startPositionY +
        (this.endPositionY - this.startPositionY) * this.easeOutQuart(progress);
      window.scrollTo(scrollValX, scrollValY);
      this.animationId = window.requestAnimationFrame(
        this.animation.bind(this)
      );
    }
  }

  /**
   * アニメーションをキャンセルします
   */
  cancelScroll() {
    window.cancelAnimationFrame(this.animationId);
  }

  /**
   * スクロールアニメーションを実行します
   * @param target
   */
  exeScroll({ target }) {
    this.startPositionX = window.scrollX;
    this.startPositionY = window.scrollY;
    this.endPositionX = target.x != null ? target.x : window.scrollX;
    this.endPositionY = target.y != null ? target.y : window.scrollY;
    this.startTime = performance.now();
    this.animation(performance.now());
  }
}