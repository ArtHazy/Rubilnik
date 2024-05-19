import { useState } from "react";
import { ViewNavigation } from "./Controls";
import { ViewProfile } from "./ViewProfile";
import { user } from "../data.mjs";
import { useNavigate } from "react-router-dom";
import { ViewLibrary } from "./ViewLibrary";




export let currentView;

export function callView(jsxElement, name){
  console.log('sdfsf',jsxElement);
  return {jsxElement, name}
}


function App() {
  if (user){
    const [view, set_view] = useState(callView(()=>ViewLibrary({}),'Library'))
    let navigate = useNavigate()
    return (
      <div className={"App"}>

        <div className="Header">
          <div className='header-content-container'>
            <div>
              {view.name}
            </div>
          </div>
        </div>

        {view.jsxElement()}

        <ViewNavigation view={view} set_view={set_view} />

        
      </div>
    );
  } else {
    {window.location.href = "/login"}
  }
}

export default App;
