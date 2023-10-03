import React from 'react'
import '../Style/Phone.css'
const Phone = (props) => {
  const deletePhone = async () => {
    const phoneId = props.phone.id
    const contactId = props.contactId
    const res = await fetch(`http://localhost:80/api/contacts/${contactId}/phones/${phoneId}`, {
      method: 'DELETE'
    })
    if (res.status == 200) {
      window.location.href = "http://localhost:80"
    }
  }
  return (
    <div className="phone">
        <table>
            <tbody>
            <tr>
                <td>{props.phone.name}</td>
                <td>{props.phone.number}</td>
                <button class="btn btn-danger" onClick = {() => deletePhone()}>Delete</button>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Phone