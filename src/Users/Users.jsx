import {
    Container,
    Modal,
    Form,Table,
    Button
} from 'react-bootstrap';
import './Users.css';
import { useState } from 'react';
const App = ()=>{

    const [modalState,setModalState] = useState(false);
    const [formState,setFormState] = useState([]);
    const formHandler = (e)=>{
        e.preventDefault();
        const userData = {};
        const form = e.target;
        const formData = new FormData(form);
        for(let data of formData.entries()){
            const key = data[0];
           let value = data[1];
            if(typeof value === 'object'){
                value = URL.createObjectURL(value);
            }
            userData[key] = value;
        }
        setFormState([...formState,userData]);
        setModalState(false);
    }

    return <>
                <Container className='py-3'>
                    <h1 className='display-4 text-center'>Users</h1>
                    <button className='btn btn-primary add-btn rounded-circle'
                     onClick={()=>setModalState(true)
                    }>
                        <i className='fa fa-plus'></i>
                    </button>
                    <Modal show={modalState}>
                        <Modal.Header closeButton onHide={()=>{setModalState(false)}}>
                            <Modal.Title>User Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formHandler}>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control type="text" name="fullname"/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="number" name="mobile"/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email"/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Upload</Form.Label>
                                    <Form.Control type="file" name="picture" accept='image/*'/>
                                </Form.Group>
                                <button className='btn btn-danger px-3 py-2'>Submit</button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>S.no</td>
                            <th>First Name</th>
                            <th>profile</th>
                            <th>number</th>
                            <th>email</th>
                            <th>Date</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formState.map((data,index)=>{
                                    console.log(data)
                                   return  <tr>
                                                <td>{index+1}</td>
                                                <td>{data.fullname}</td>
                                                <td>
                                                    <img src={data.picture} 
                                                    alt="profile-pic" 
                                                    width="50" 
                                                    height="50"
                                                    className="rounded-circle" />
                                                </td>
                                                <td>{data.mobile}</td>
                                                <td>{data.email}</td>
                                                <td>{new Date().toLocaleDateString()}</td>
                                                <td>
                                                    <Button style = {{marginRight:'8px'}}className="badge" variant="info">
                                                        <i className='fa fa-edit'></i>
                                                        Edit
                                                    </Button>
                                                    <Button className="badge" variant="danger">
                                                        <i className='fa fa-trash'></i>
                                                        Delete
                                                    </Button>
                                                </td>
                                           </tr>
                                })
                            }
                            
                        </tbody>
                    </Table>
                </Container>
       
           </>

}
export default App;