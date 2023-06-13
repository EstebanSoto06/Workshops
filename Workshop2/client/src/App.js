import './App.css';
import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


const url = 'http://localhost:3001/api/teachers/';

function teachersPOST(first_name, last_name, cedula, age){
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "first_name" : first_name,
      "last_name" : last_name,
      "cedula" : cedula,
      "age" : age
    })
  }).then((response) => {
    return response.json()
  }).then((res) => {
    if (res.status === 201) {
        console.log("Post successfully created!")
    }
  }).catch((error) => {
    console.log(error)
  })
}

function teachersDELETE(id){
  fetch(url + '?id=' + id, {
    method: 'DELETE',
  }).then((response) => {
    return response.text()
  }).then((res) => {
    if (res.status === 204) {
        console.log("Delete sucess!")
    }
  }).catch((error) => {
    console.log(error)
  })
}

// function modalInsertar(state){
//   state.setState({
//     form: null,
//     tipoModal: 'insertar',
//     modalInsertar: !this.state.modalInsertar
//   });
// }

// function selectTeacher(teacher){
//   this.setState({
//     tipoModal: 'actualizar',
//     form: {
//       id: teacher._id,
//       first_name: teacher.first_name,
//       last_name: teacher.last_name,
//       cedula: teacher.cedula,
//       age : teacher.age
//     }
//   })
// }

class App extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      first_name: '',
      last_name: '',
      cedula: '',
      age: ''
    }
  }

teachersGET=() => {
  fetch(url)
   .then((response) => {return response.json()})
   .then((data) => {this.setState({data: data})})
}

teachersDoPOST=(first_name, last_name, cedula, age) => {
  teachersPOST(first_name, last_name, cedula, age);
  this.teachersGET();
}

teachersDoPUT=(first_name, last_name, cedula, age) => {
  //teachersPUT(first_name, last_name, cedula, age);
  this.teachersGET();
}

teachersDoDELETE=(id) => {
  teachersDELETE(id);
  this.teachersGET();
}

componentDidMount() {
  this.teachersGET();
}


  render() {
    const {form}=this.state;
    return (
  <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={
    this.setState({
      form: null,
      tipoModal: 'insertar',
      modalInsertar: !this.state.modalInsertar
    })
  }>Add Teacher</button>
  <br /><br />
    <table className="table ">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cedula</th>
          <th>Edad</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(teachers=>{
          return(
            <tr>
          <td>{teachers._id}</td>
          <td>{teachers.first_name}</td>
          <td>{teachers.last_name}</td>
          <td>{teachers.cedula}</td>
          <td>{teachers.age}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.setState({modalInsertar: true})}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.teachersDoDELETE(teachers._id)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input className="form-control" type="text" name="first_name" id="first_name" readOnly onChange={this.handleChange} value={form?form.first_name: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="last_name">Last Name</label>
                    <input className="form-control" type="text" name="last_name" id="last_name" onChange={this.handleChange} value={form?form.last_name: ''}/>
                    <br />
                    <label htmlFor="cedula">Cedula</label>
                    <input className="form-control" type="text" name="cedula" id="cedula" onChange={this.handleChange} value={form?form.cedula: ''}/>
                    <br />
                    <label htmlFor="age">Age</label>
                    <input className="form-control" type="text" name="age" id="age" onChange={this.handleChange} value={form?form.age:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.teachersDoPOST()}>
                      Insertar
                    </button>: <button className="btn btn-primary" onClick={()=>this.teachersDoPUT()}>
                      Actualizar
                    </button>
                  }
                    <button className="btn btn-danger" onClick={()=>{this.setState({modalInsertar: false})}}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Delete Teacher?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" >Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>
   );
  }
}
export default App;
