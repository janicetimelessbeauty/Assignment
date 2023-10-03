import { useState, useEffect } from 'react';  // import useEffect
import Contact from './Components/Contact';
import './Style/Home.css'
function App() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState("");
    const getContacts = async () => {
        const res = await fetch("http://localhost:80/api/contacts");
        console.log(res);
        const data = await res.json();
        setContacts(data)
    }
    const handleValue = (newValue) => {
            setNewContact(newValue);
    }
    const addContact = async () => {
        if (newContact.length > 0) {
            const addContact = {};
            addContact.name = newContact;
            const res = await fetch("http://localhost:80/api/contacts", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(addContact)
            })
            if (res.status == 201) {
                getContacts();
            }
        }
    }
    const [calcus, setCalcu] = useState({});
    const loadStat = async () => {
      try {
      const stats = await fetch("http://localhost:80/api/stats");
      const calculations = await stats.json();
      setCalcu(calculations);
      }
      catch(err) {
          console.log(err.message)
      }   
    }
    useEffect(() => {
        getContacts();
    }, [])
    useEffect(() => {
        loadStat()
      }, []);
    console.log(contacts)
    return (
        <div className='container'>     
            <h1 style={{textAlign : 'center'}}>Contactor app</h1>
            <form>
            <input type="text" placeholder="Name" onChange={(e) => handleValue(e.target.value)}/>
            <button class="btn btn-success w-50 m-3 create" onClick = {() => {addContact()}}>Create contact</button>
            </form>
            <div className='contact'>
                {
                    contacts.map((contact, index) => {
                        return (
                            <Contact contact={contact} index = {index} setContact={getContacts}/>
                        )
                    })
                }
            </div>
            <button type="button" class="btn btn-warning m-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
             Show stats
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Current stats</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="calcu">
    <div className="num">Number of contacts: <span>{calcus.numContacts && calcus.numContacts.numContacts}</span></div>
    <div className="num">Earliest contact: <span>{calcus.earliest && calcus.earliest.earlyDate}</span></div>
    <div className="num">Latest contact: <span>{calcus.latest && calcus.latest.latestContact}</span></div>
    <div className="num">Number of phones: <span>{calcus.numPhones && calcus.numPhones.numPhones}</span></div>
   </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default App;