let ace
if (window.ace) {
  // use the already loaded instance of Ace
  ace = window.ace
} else {
  try {
    // load Ace editor
    ace = require('ace-builds/src-noconflict/ace')

    // load required Ace plugins
    require('ace-builds/src-noconflict/mode-json')
    require('ace-builds/src-noconflict/ext-searchbox')
    require('ace-builds/src-noconflict/ext-language_tools')
    // embed Ace json worker
    // https://github.com/ajaxorg/ace/issues/3913
    // The worker source is bundled as plain text and turned into a blob url at
    // runtime, so no base64 encoded JavaScript ends up in the package.
    const jsonWorkerSource = require('../generated/worker-json-source')
    const jsonWorkerBlob = new Blob([jsonWorkerSource], { type: 'application/javascript' })
    ace.config.setModuleUrl('ace/mode/json_worker', URL.createObjectURL(jsonWorkerBlob))
  } catch (err) {
    // failed to load Ace (can be minimalist bundle).
    // No worries, the editor will fall back to plain text if needed.
  }
}

module.exports = ace
