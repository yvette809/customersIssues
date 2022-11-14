import React from 'react'
import { useState,useEffect } from 'react'
import {Button,Modal} from 'react-bootstrap'
import { useParams } from 'react-router-dom'


const IssueDetails = () => {

    const {id} = useParams()
    const [issue, setIssue] = useState({})
    const[title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId]  = useState(0)
    const [users,setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)


    // get user by id
    const  getIssueById =  async (caseId)=>{
        const res = await fetch(`https://localhost:7219/api/Cases/${caseId}`)  
        const data = await res.json()
        console.log('issue', data)
        setIssue(data)
    
    }

    // update issue
    const issuesUpdate = async(issueId)=>{
        
        const issue = { title, description, userId }
        const res = await fetch(`https://localhost:7219/api/Cases/${issueId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(issue)
        })  

        const data = await res.json()
        setTitle(data.title)
        setDescription(data.description)
        setUserId(data.user.id)
        console.log('update', data)


    }

    
    // get users
    const fetchData = async () => {
        const res = await fetch('http://localhost:5219/api/users')
        setUsers(await res.json())
        console.log('res', res)
    }
    useEffect(()=>{
        getIssueById(id)
        issuesUpdate(id)
        fetchData()
    }, [id])
  return (
    <>
    <div className=" details-container">
        <h3>{issue.title}</h3>
        <p>{issue.description}</p>
        <p>{issue.created}</p>
        {issue.isCompleted?<button><i onClick={() => setShowModal(true)} class="fa-solid fa-check fa.2x"></i></button>:<button><i onClick={() => setShowModal(true)} class="fa-solid fa-x"></i></button>}
        </div>
        {showModal &&<Modal.Dialog >
      <Modal.Header closeButton onClick={() => setShowModal(false)}>
        <Modal.Title className='text-center'>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <form className="issues-form mt-5">
    <div className="mb-3">
        <label className="form-label">customer</label>
        <select className="form-select" onChange={(e) => setUserId(e.target.value)}>
            <option value={0}>-- state the customer --</option>
            {users.map(user=> <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)}
        </select>
    </div>
    <div className="mb-3">
        <label className="form-label">Write Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
    
    <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
    </div>

    <button type="submit" className="btn btn-success">Save</button>
</form>
      </Modal.Body>
    </Modal.Dialog>}
        
        
   
</>

    
  )
}

export default IssueDetails