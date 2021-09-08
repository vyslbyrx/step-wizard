import './App.css';
import {useEffect, useState} from "react";


function App() {

    const Prev = 'Prev';
    const Next = 'Next';
    const Finish = 'Finish';
    const [name,setName] = useState('');
    const [lastName,setLastName] = useState('');
    const [age,setAge] = useState('');
    const [job,setJob] = useState('');
    const [salary,setSalary] = useState('');
    const [wizard,setWizard] = useState(0);
    const [mode,setMode] = useState(false);
    const [finish,setFinish] = useState(false);
    const [toaster,setToaster] = useState(false);

    const INITIAL_STATE = [
        {id:0, placeholder: "First Name",value: name,set: setName},
        {id:1, placeholder: "Last Name",value: lastName,set:setLastName},
        {id:2, placeholder: "Age",value: age,set: setAge},
        {id:3, placeholder: "Job",value: job,set: setJob},
        {id:4, placeholder: "Salary",value: salary,set: setSalary},
    ]

    const handleMode = () => {setMode(!mode)}
    const handleWizardPlus = () => {
        if(wizard < INITIAL_STATE.length - 1 && INITIAL_STATE[wizard].value !== '') {
            setWizard(wizard + 1);
        }
        if(INITIAL_STATE[wizard].value === '') {
            setToaster(true)
        }
    }
    const handleWizardMinus = () => {
        if(wizard > 0) {
            setWizard(wizard - 1);
        }
        if(INITIAL_STATE.length < wizard + 1) {
            setFinish(false)
        }
    }
    const handleFormFinish = () => {
        if(INITIAL_STATE[wizard].value === '') {
            setToaster(true)
        } else {
            setWizard(wizard + 1);
            setFinish(true);
        }
    }

    useEffect(function () {
        setInterval(function () {
            setToaster(false)
        },2500)
    },[setToaster])

  return (
      <div>
          <div className={`wizard ${mode ? '' : 'dark'} ${toaster ? 'false': ''}`}>
              <label className="switch">
                  <input type="checkbox" onChange={handleMode} />
                  <span className=" slider"></span>
              </label>
              <div className="wizard-foot">
                  {INITIAL_STATE.map(item => {
                      return <div key={item.id}>
                          {wizard === item.id &&
                          <label>
                              <input placeholder={item.placeholder} type="text" value={item.value} onChange={ (e) => item.set(e.target.value) }/>
                          </label>
                          }
                      </div>
                  })}
              </div>
              {finish && <ul className="wizard-list">
                  {INITIAL_STATE.map( (item,key) => {
                      return <li key={key}> <strong>{item.placeholder}</strong>: {item.value} </li>
                  })}
              </ul>}
                  {wizard + 1 > INITIAL_STATE.length ? '' : <div className="wizard-buttons">
                  {wizard > 0 && <button onClick={handleWizardMinus} >{Prev}</button>}
                  {wizard < INITIAL_STATE.length - 1 && <button onClick={handleWizardPlus}>{Next}</button>}
                  {wizard + 1 === INITIAL_STATE.length && <button onClick={handleFormFinish}>{Finish}</button>}
              </div>
              }
          </div>
          {wizard < INITIAL_STATE.length &&  <div className={`wizard-alert ${toaster ? 'active' : ''} `}><b>{INITIAL_STATE[wizard].placeholder}</b> field cannot be blank</div>}
      </div>

  );
}

export default App;
