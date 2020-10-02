import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GETEMPLOYEESDATA } from './actions/index';
// import CustomData from '../src/Constant/CustomData';
import './App.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            edit: false,
            index: '',
            edit_name: '',
            users_list : [],
            page : 0
        }
    }
    // componentDidMount() {
    //     this.props.GETEMPLOYEESDATA()
    // }
    componentWillReceiveProps = (nextprops) => {
        this.setState({ users_list: nextprops.UsersInfo, check: false }, function () {
        })
    }

    HandelChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, function () {

        })
    }

    UserInformation = (name) => {
        let page_value = this.state.page + 1
        let dataList = ''
        dataList = this.props.UsersInfo !== undefined && this.props.UsersInfo.filter((list) => !name.includes(list.name))
        if (dataList && dataList.length > 0) {
            dataList.push({ 'name': name , 'id' : page_value })
            this.props.GETEMPLOYEESDATA(dataList)
            this.setState({ page: page_value })

        } else {
            this.props.GETEMPLOYEESDATA([{ 'name': name  , 'id' : page_value}])
            this.setState({ page: page_value })

        }
        if(name !== '') {
        ToastsStore.success('User Added Successfully.')
        }

        this.setState({ first_name: '' })

    }

    UpdateInfo = (name,idx) => {
        let dataList = ''
        if(this.props.UsersInfo){
            dataList =   this.props.UsersInfo.map((data,id)=>{
                if(data.id === idx){
                    data.name = name
                }
                return data
            })
        }
        ToastsStore.success('User Info Updated Successfully.')
        this.props.GETEMPLOYEESDATA(dataList)
        this.setState({ edit : false})
    }

    HandelChangeEdit = (e, idx) => {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value }, function () {
        })

    }

    editForm = (value, idx) => {
        this.setState({ edit: true, first_name: value, index: idx })
    }

    DeleteRecord = (idx) => {
         swal({
            title: "",
            text: "Are You Sure to Delete ? ",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let dataList = ''
                dataList = this.props.UsersInfo && this.props.UsersInfo.filter((list) => idx !== list.id)
                ToastsStore.success('User Deleted Successfully.')
                this.props.GETEMPLOYEESDATA(dataList)
            }

        })
    }
        ClearValue = () => {
            this.setState({ first_name : '' })
        }

        render() {
            var Users_List = ''
            var location = window.location.pathname
            // let usersList = (this.state.users_list !== undefined && this.state.users_list !== '') ? this.state.users_list : this.props.UsersInfo
            let usersList = (this.state.users_list !== undefined && this.state.users_list.length > 0) ? this.state.users_list : this.props.UsersInfo
            if (usersList && usersList.length > 0) {
                Users_List = usersList.map((list, idx) => {
                    return (
                        <tbody>
                            <tr key={idx}>
                                <td>{list.name}</td>
                                <td>
                                    {list.name ?
                                        <React.Fragment>
                                            <span style = {{'position' : 'relative', 'right' : '15px'}}>
                                            <button type="button" data-toggle="modal" onClick={() => this.editForm(list.name, list.id)} data-target="#exampleModalCenter"><span>Edit</span></button> 
                                            </span>
                                            <button onClick={() => this.DeleteRecord(list.id)}><span>Delete</span></button>
                                        </React.Fragment>
                                        : null}
                                </td>
                            </tr>
                        </tbody>
                    )
                })
            } else {
                Users_List = <tbody>
                    <tr>
                        <td colSpan="10" align='center' style={{ "background": "lightyellow", "padding": "30px", "font-size": "large" }}>
                            NO Records Found
                    </td>
                    </tr>
                </tbody>
            }

            return (
                <React.Fragment>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
                    <div className='main_div'>
                        <ul class="nav">
                            <li class="nav-item">
                                <Link to="/todo" className={location === '/todo' ? "bold_class" : "nav_link_color"}>Todos</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/" className={location === '/' ? "bold_class" : "nav_link_color"} >Users</Link>
                            </li>
                        </ul>


                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLongTitle">{this.state.edit === true ? "Edit User" : "Create User "}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                            {this.state.edit === true ?
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                                                    <input type="text" className="form-control" autoComplete='off' id="recipient-name" name='first_name' value={this.state.first_name} onChange={(e) => this.HandelChangeEdit(e, this.state.index)} />
                                                </div> :
                                                <div className="form-group">
                                                    <label htmlFor="recipient-name" className="col-form-label">Name:</label>
                                                    <input type="text" className="form-control" autoComplete='off' id="recipient-name" name='first_name' value={this.state.first_name} onChange={this.HandelChange} />
                                                </div>
                                            }

                                    </div>
                                    {this.state.edit === true ?
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.UpdateInfo(this.state.first_name , this.state.index)} >Update</button>
                                        </div>
                                        :
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.UserInformation(this.state.first_name)} >Save</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="ant-btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.ClearValue}><span>Create User</span></button>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {Users_List}
                    </table>


                </React.Fragment>

            )
        }
    }
    const mapStateToProps = (state) => {
        return {
            UsersInfo: state.reducer.data
        }
    }
    export default connect(mapStateToProps, { GETEMPLOYEESDATA })(Dashboard)
