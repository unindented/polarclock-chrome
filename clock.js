var CLOCK = {};

/**
 * Polar clock animation.
 *
 * @param canvas Canvas on which to paint.
 * @param context Rendering context.
 * @param interval Milliseconds between repaints (1000 / FPS).
 * @param fields Data function.
 * @param callback Callback function.
 */
CLOCK.clock = function (spec) {
  var _canvas   = spec.canvas;
  var _context  = spec.context;
  var _interval = spec.interval;
  var _fields   = spec.fields;
  var _callback = spec.callback;
  var _timer    = 0;

  var that = {};

  /**
   * Starts the animation, calling <code>paint</code> every
   * <code>interval</code> milliseconds.
   */
  that.start = function () {
    if (_timer) {
      return;
    }

    _timer = window.setInterval(that.paint, _interval);
  };

  /**
   * Stops the animation.
   */
  that.stop = function () {
    if (!_timer) {
      return;
    }

    window.clearInterval(_timer);
    _timer = 0;
  };

  /**
   * Paints the polar clock on the canvas.
   */
  that.paint = function () {
    var width = _canvas.width;
    var height = _canvas.height;

    _context.save();

    _context.clearRect(0, 0, width, height);
    _context.translate(width / 2, height / 2);
    _context.rotate(-Math.PI / 2);
    _context.scale(1.25, 1.25);

    var radius = Math.min(width, height) / 2;

    for (var i = 0, fields = _fields(), len = fields.length; i < len; i++) {
      var f = fields[i];
      _context.lineWidth = (f.width - 0.0125) * radius;
      _context.strokeStyle = 'hsl(' + (360 * f.value - 180) + ', 50%, 50%)';
      _context.beginPath();
      _context.arc(0, 0, radius * f.index, 0, 2 * Math.PI * f.value, false);
      _context.stroke();
    }

    _context.restore();

    _callback && _callback();
  };

  return that;
};
