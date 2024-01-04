import './sass/index.scss'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import AddTask from './components/AddTask';
import DisplayTasks from './components/DisplayTasks';
import { Provider } from 'react-redux';
import { store } from './store/store.js';



export default function App() {
  return (
    <div className='container'>
      
      <Provider store={store}>
        <AddTask/>
        <DisplayTasks/> 
      </Provider>
      
    </div>
  );
  
}