
import './App.css';
import { DescriptionPomodoro } from './components/DescriptionPomodoro';
import { MyTimer } from './components/MyTimer';
import { Notifyer } from './services/notifyer';

function App() {

  Notifyer.init();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 25 * 60); // 25 minutes timer

  document.title = 'Técnica Pomodoro'
  return (
    <div className="App">
      <div className='container'>
        <div className='side-left'>

        </div>
        <div className='side-center'>
          <MyTimer expiryTimestamp={time} />
        </div>
        <div className='side-right'>

        </div>
      </div>
      <div className='description'>
        <div className='side-left'>

        </div>
        <div className='side-center'>
          <DescriptionPomodoro />
        </div>
        <div className='side-right'>

        </div>
      </div>
    </div>
  );
}

export default App;
