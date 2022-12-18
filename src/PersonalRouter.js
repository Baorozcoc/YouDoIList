import Initial from './Initial';
import Principal from './Principal';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

const PersonalRouter=()=>(
    <Router>
      <Routes>
        <Route exact path="/" element={<Initial/>}/>
        <Route path="/Principal" element={<Principal/>}/>
      </Routes>
    </Router>
);
export default PersonalRouter;