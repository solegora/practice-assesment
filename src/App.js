
import './App.css';
import { Navigation } from './components/nav/Nav';
import { UserTable } from './components/table/Usertable';
function App() {
  return (
    <div className='App-background'>
     <Navigation/>
     <UserTable/>
    </div>
  );
}

export default App;
