import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [gender, setGender] = useState([])
  const [inputname, setName] = useState()


  function sendName(e) {
    e.preventDefault();

    const userName = e.target.name.value;
    setName(userName)
    console.log(userName);
    console.log(inputname);

    e.target.reset()

  }

  useEffect(() => {
    fetch(`https://api.genderize.io/?name=${inputname}`)
      .then((response) => response.json())
      .then((data) => setGender(data));
  }, [inputname]);



  const handleAddUser = (event) => {
    event.preventDefault();
    const date = event.target.date.value;
    const user = {date}
    
    //send data to server mdn fetch
    fetch("http://localhost:5000/date",{
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),

    })

    
        .then(response => response.json())
        .then(data => {

            console.log('Success:', data);
           
            event.target.reset()
        })

}


  return (
    <div className="App">

      <h1 className="bg-gray-500 py-4 text-white text-3xl">Slated</h1>

      <form className="contact-form" onSubmit={sendName}>

        <label
          htmlFor="exampleFormControlInput1"
          className="form-label text-light"
        >
          Name:
        </label>
        <input

          type="text"
          name="name"
          className="form-control border-2 ml-2"
          id="exampleFormControlInput1"
          placeholder="your name"
          required
        />


        <input type="submit" value="Send" className="btn btn-primary m-4" />
      </form>

      {


        <h2 className="text-3xl mt-3">Gender:  {gender?.gender}</h2>

      }


      <form onSubmit={handleAddUser}>
        <div>
          <span class="uppercase text-sm text-gray-600 font-bold">Date: </span>
          <input class="w-50 bg-gray-300 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" name="date" placeholder="Input Date" />
        </div>

        <div class="mt-8">
          <button type="submit"
            class="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-50 focus:outline-none focus:shadow-outline">
            Send Date
          </button>
        </div>
      </form>



    </div>
  );
}

export default App;
