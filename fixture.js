// Shared helpers for the fixture pages. Nothing is sent anywhere: messages carry only event names.

// Prepends a timestamped line to the page's #log panel.
function fixtureLog(msg) {
  const line = document.createElement('div');
  line.textContent = new Date().toISOString().slice(11, 19) + '  ' + msg;
  document.getElementById('log').prepend(line);
}

// Frames are sandboxed into an opaque origin, so the parent origin cannot be named; '*' is safe
// because the payload holds no user data.
function fixtureNotify(payload) {
  parent.postMessage(payload, '*');
}

// Calls handler only for messages from the given frame elements.
function onFrameMessage(getFrames, handler) {
  window.addEventListener('message', (event) => {
    const fromKnownFrame = getFrames().some((frame) => frame && frame.contentWindow === event.source);
    if (fromKnownFrame && event.data) handler(event.data);
  });
}
