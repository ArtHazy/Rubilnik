import { useState } from "react";
import { Footer, ViewNavigation } from "./Footer";
import { Header } from "./Header";
import { ViewProfile } from "./ViewProfile";
import { user } from "../data.mjs";
import { useNavigate } from "react-router-dom";
import { callView } from "../main";



export let currentView;


function App() {
  if (user){
    const [view, set_view] = useState(callView(()=>ViewProfile({}),'Profile'))
    let navigate = useNavigate()
    return (
      <div className={"App"}>
        <Header>
          {view.name}
        </Header>
        <div id='view-container' className="view-container">
          {console.log('render', view.jsxElement())}
          {view.jsxElement()}
          
        </div>
        <Footer bottom={5}>
          <ViewNavigation set_view={set_view}></ViewNavigation>
        </Footer>
      </div>
    );
  } else {
    {window.location.href = "/login"}
  }
}

export default App;
