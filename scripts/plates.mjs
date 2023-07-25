export {Plates};

class Plates {
  constructor(
    length=203.2, width=152.4, depth=76.2,
    thickness=.3, ringRadius=12.7,
    fontSize=10, multiplier=1,
    // beautifully engraved
    prettier=false,
    prettier_margins=1.5
    ) {
    //view
    // STATE or MODEL
    this.length= length;
    this.width = width;
    this.depth = depth; //pratt setting
    this.thickness =thickness; 
    this.ringRadius=ringRadius;
    this.fontSize  =fontSize;
    this.multiplier= multiplier; // pratt setting
    //prettier
    this.prettier = prettier;
    this.margins= prettier_margins;
  }
  _surfaceArea() {
    const length = this.length;
    const width  = this.width;
    const r = this.ringRadius;
    if (this.prettier) {
      length -= 2 * this.margins; // top and bottom
      //left to holes, ring diameter, left from holes, and right:
      width -= 3 * this.margins + 2*r;
      // do not subtract r: 
      r=0;
    }
    return length * width - (3*Math.PI * r**2);
  }
  _numPlates() {
    return this.depth / this.thickness;
  }
  calculatePlates() {
    return this.multiplier * this._surfaceArea() * this._numPlates() / 
           this.fontSize**2
  }

  update({
    length=null, width=null, depth=null,
    thickness=null, ringRadius=null,
    fontSize=null, multiplier=null
    } = {}) {
    // update state (absolutely should be another function)
      // (But.) I am way too convinced that there's a better way
      // to deal with this to repeat this construction of the 
      // arguments. Maybe the arg should be a dict and I should 
      //check for these keywords! But then the function isn't 
      // self-documenting. maybe I can for arg in kwargs, so long
      // as it lets me pull out the key. Maybe this just looks
      // kind-of gross but it actually very reasonable.
    if (length !== null) {this.length= length;}
    if (width !== null) {this.width = width;}
    if (depth !== null) {this.depth = depth;}
    if (thickness !== null) {this.thickness = thickness;}
    if (ringRadius !== null) {this.ringRadius= ringRadius;}
    if (fontSize !== null) {this.fontSize  = fontSize;}
    if (multiplier !== null) {this.multiplier= multiplier;}
    //calculate -> display
    return this.calculatePlates();
  }
  static inTomm(inches){
    return inches * 25.4;
  }
  static mmToin(mm) {
    return mm / 25.4;
  }
}