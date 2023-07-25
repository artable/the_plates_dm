export class Conversion {
    constructor(toMin, toMax, fromMax) {

        this.offset = toMin;
        this.ratio = (toMax - toMin) / fromMax;
    }
    forward(measurement) { return measurement * this.ratio + this.offset;}
    reverse(measurement) { return (measurement - this.offset) / this.ratio;}
}