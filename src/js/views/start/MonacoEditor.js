class MonacoEditor {

    constructor(containerID) {

        

        // Save Monaco's amd require and restore Node's require
        var amdRequire = global.require;
        global.require = nodeRequire;

        // require node modules before loader.js comes in
        var path = require('path');

        function uriFromPath(_path) {
            var pathName = path.resolve(_path).replace(/\\/g, '/');
            if (pathName.length > 0 && pathName.charAt(0) !== '/') {
                pathName = '/' + pathName;
            }
            return encodeURI('file://' + pathName);
        }
        amdRequire.config({
            baseUrl: uriFromPath(path.join(__dirname, '../../node_modules/monaco-editor/min'))
        });
        // workaround monaco-css not understanding the environment
        self.module = undefined;
        // workaround monaco-typescript not understanding the environment
        self.process.browser = true;
        amdRequire(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript',
                theme:'vs-dark'
            });
            
            window.onresize = ()=>{
                editor.layout();
            }
        });

    }

}

window.onload = ()=>{
    new MonacoEditor("monaco-editor");
}