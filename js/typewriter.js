var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Static arrow + typed text
    this.el.innerHTML = 
      '<span style="font-size: 0.9rem; font-family: Fira Code, monospace;">>&nbsp;</span>' +
      '<span class="wrap" style="font-size: 0.9rem; font-family: Fira Code, monospace;">' +
      this.txt +
      '</span>';

    var that = this;
    var delta = 130 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } 
    // If word is fully deleted
    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // Optional blinking cursor style
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite .wrap { border-right: 0.05em solid #fff }";
    document.body.appendChild(css);
};
