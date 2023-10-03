import React from 'react'
import {useState, useEffect} from 'react'
import '../Style/Contact.css'
import Phone from './Phone';
const Contact = (props) => {
  const [phones, setPhones] = useState([]);
  const [number, setNumber] = useState({});
  const getPhones = async () => {
    const res = await fetch(`http://localhost:80/api/contacts/${props.contact.id}/phones`);
    const data = await res.json();
    if (data.length > 0) {
      setPhones(data);
    }
  }
  console.log(phones);
  useEffect(() => {
    getPhones(props.contact.id)
  }, [])
  const deleteContact = async () => {
    const res = await fetch(`http://localhost:80/api/contacts/${props.contact.id}`, {
      method: 'DELETE'
    })
    if (res.status == 200) {
      props.setContact()
    }
}
  const addNumber = async () => {
    if (!number.name || !number.number || number.name.length == 0 || number.number.length == 0) {
      return
    }
    const res = await fetch(`http://localhost:80/api/contacts/${props.contact.id}/phones`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(number)
    })
    if (res.status == 201) {
      getPhones()
    }
  }
  return (
    <div>
        <div className="contact">
            <div className="name">{props.contact.name}</div>
            <div className="phone">
              <form>
              <input type="text" placeholder="Phone type" onChange={(e) => setNumber({...number, name: e.target.value})}/>
              <input type="text" placeholder="Phone number" onChange={(e) => setNumber({...number, number: e.target.value})}/>
              <button className='btn btn-success w-25 ml-5' onClick = {() => addNumber()}>Add number</button>
              </form>
            </div>
            {
              phones.map(phone => {
                return (
                  <Phone phone = {phone} contactId = {props.contact.id} />
                )
              })
            }
            <button className="btn btn-danger delete w-50" onClick = {() => deleteContact()}>Delete contact</button>           
        </div>
    </div>
  )
}

export default Contact