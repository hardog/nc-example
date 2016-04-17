define(["cm", "cmmode"], function(CodeMirror) {
	let showEditor = function(){
		CodeMirror.fromTextArea(document.getElementById("editor"), {
		    mode: 'markdown',
		    theme: 'paper',
		    indentWithTabs: true,
		    lineNumbers: false,
	  });
	};

	return {showEditor};
});