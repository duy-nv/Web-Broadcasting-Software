// merges multiple Sources

var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

var SourceMover = require('./../display/common/sourcemover')

inherits(Scene, EventEmitter)

function Scene (output, opts) {
  var self = this
  if (!(self instanceof Scene)) return new Scene()
  
  opts = opts || {}
  opts.width = opts.width || 400*3
  opts.height = opts.height || 400*3
  
  self.sources = []
  
  self._output = output
}

Scene.prototype.addSource = function (source) {
  var self = this
  
  var mover = new SourceMover(source, self._output)
  source.mover = mover
  
  self._output.addStream(source.stream, {
    draw: mover.draw.bind(mover)
  })
  
  self.sources.push(source)
  
  self.emit('mover', mover)
}

Scene.prototype.removeSource = function (source) {
  var self = this
  
  for (var i=0; i<self.sources.length; i++) {
    if (self.sources[i].id === source.id) {
      self.sources[i].destroy()
      self.sources.splice(i, 1)
      i--
    }
  }
  
  self._output.removeStream(source.stream)
}

Scene.prototype.focusSource = function (source) {
  var self = this
  
  for (var i=0; i<self.sources.length; i++) {
    if (source && self.sources[i].id === source.id) {
      self.sources[i].mover.focus()
    } else {
      self.sources[i].mover.blur()
    }
  }
}

Scene.prototype.show = function () {
  var self = this
  
  for (var i=0; i<self.sources.length; i++) {
    self._output.addStream(self.sources[i].stream, {
      draw: self.sources[i].mover.draw.bind(self.sources[i].mover)
    })
    self.sources[i].mover.show()
  }
}

Scene.prototype.hide = function () {
  var self = this
  
  for (var i=0; i<self.sources.length; i++) {
    self._output.removeStream(self.sources[i].stream)
    self.sources[i].mover.hide()
  }
}

Scene.prototype.destroy = function () {
  var self = this
  
  for (var i=0; i<self.sources.length; i++) {
    self.sources[i].destroy()
  }
  
  self.sources = []
}
  
module.exports = Scene