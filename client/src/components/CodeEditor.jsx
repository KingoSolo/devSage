import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";


function CodeEditor({code,setCode}) {
    return (
        <div className="w-full max-w-2xl">
            <CodeMirror
                value={code}
                onChange={(value) => setCode(value)}
                extensions={[javascript()]}
                height="400px"
                theme={"dark"}
                placeholder={"//Paste your code here"}
            />
        </div>
    );
}

export default CodeEditor;