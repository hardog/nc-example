require(["cm", "cmmode"], function(CodeMirror) {
  CodeMirror.fromTextArea(document.getElementById("editor"), {
	    mode: 'markdown',
	    theme: 'paper',
	    indentWithTabs: true,
	    lineNumbers: false,
  });
});