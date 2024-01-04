// Content script

class SubtitleControl {
  constructor(subtitleElement = '.player-timedtext', shortcutSwitcherKey = 'c') {
    this._subtitleElement = subtitleElement
    this._shortcutKey = shortcutSwitcherKey
    this._styleElement = null
    this._subtitleIsVisible = true
    this._createStyleElement()
    this._bindKeyPressDetector()
    this._warning('Remember to turn on the subtitles :)')
  }

  hide() {
    this._setSubtitleDisplayStyle('none')
    return false
  }

  show() {
    this._setSubtitleDisplayStyle('block')
    return true
  }

  switchSubtitleStatus() {
    this._subtitleIsVisible = this._subtitleIsVisible ? this.hide() : this.show()
  }

  _bindKeyPressDetector() {
    var callback = (function (e) {
      if (e.key === this._shortcutKey) this.switchSubtitleStatus()
    }).bind(this)
    document.onkeydown = callback
  }

  _createStyleElement() {
    this._styleElement = document.createElement('style')
    document.head.appendChild(this._styleElement)
  }

  _setSubtitleDisplayStyle(displayStyle) {
    this._styleElement.innerHTML = `${this._subtitleElement} { display: ${displayStyle} !important }`
  }

  _warning(msg) {
    console.log(msg)
  }

}

let subtitleIsVisible = true;
const subtitleElement = '.player-timedtext';
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

function setSubtitleDisplayStyle(displayStyle) {
  styleElement.innerHTML = `${subtitleElement} { display: ${displayStyle} !important }`
}

document.addEventListener("keydown", function (event) {
  // Show an alert with the pressed key
  console.log("Key Pressed: " + event.key);
  if(event.key === "c" || event.key === "C"){
    console.log("Switching subtitle status");
    if(subtitleIsVisible){
      setSubtitleDisplayStyle("none");
      subtitleIsVisible = false;
    }else{
      setSubtitleDisplayStyle("block");
      subtitleIsVisible = true;
    }
  }

});
