import { useState } from "react";
import { Footer, ViewNavigation } from "./Footer";
import { Header } from "./Header";
import { ViewProfile } from "./ViewProfile";

export const SERVER_URL = "http://localhost:3000"

export let currentView;

function App() {
  const [view, set_view] = useState(()=>()=>ViewProfile())


  return (
    <div className={"App"}>
      <Header>
        {view.toString()}
      </Header>
      <div id='view-container' className="view-container">
        {view()}
      </div>
      <Footer bottom={5}>
        <ViewNavigation set_view={set_view}></ViewNavigation>
      </Footer>
    </div>
  );
}

export default App;
