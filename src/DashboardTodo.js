import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { POSTTODODATA } from './actions/index';
import { connect } from 'react-redux';
// import DatePicker from "react-datepicker";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import swal from 'sweetalert';

var edit_info = ''

class DashboardTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: '',
            startDate: new Date(),
            todo_list: [],
            edit: false,
            index: '',
            page: 0

        }
    }
    HandelChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value }, function () {

        })
    }

    TodoInformation = (date) => {
        let page_value = this.state.page + 1
        let date_format = moment(date).format('DD MMM YYYY')
        let dataList = ''
        dataList = this.props.TodoInfo !== undefined && this.props.TodoInfo.filter((list) => !date_format.includes(list.todo))
        if (dataList && dataList.length > 0) {
            // i = i++
            dataList.push({ 'todo': date_format, 'id': page_value })
            this.props.POSTTODODATA(dataList)
            this.setState({ page: page_value })

        } else {
            // i = i++
            this.props.POSTTODODATA([{ 'todo': date_format, 'id': page_value }])
            this.setState({ page: page_value })
        }

        ToastsStore.success('Date Added Successfully.')
        this.setState({ startDate: '' })
    }
    handleDateChangeEventStart = (date) => {
        this.setState({ startDate: date })
    }
    componentWillReceiveProps = (nextprops) => {
        this.setState({ todo_list: nextprops.TodoInfo }, function () {
        })
    }
    ClearValue = () => {
        this.setState({ startDate : new Date() })
    }
    editForm = (date, idx) => {
        edit_info = date
        this.setState({ edit: true, index: idx }, function () {

        })
    }
    DeleteRecord = (id) => {
        swal({
            title: "",
            text: "Are You Sure to Delete ? ",
            icon: "warning",
            buttons: ["No", "Yes"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let dataList = ''
                dataList = this.props.TodoInfo && this.props.TodoInfo.filter((list) => id !== (list.id))
                ToastsStore.success('Date Deleted Successfully.')
                // this.props.GETEMPLOYEESDATA(dataList)
                this.props.POSTTODODATA(dataList)

            }

        })
    }
    HandelChangeEdit = (date) => {
        let date_format = moment(date).format('DD MMM YYYY')
        edit_info = date_format
        this.setState({ edit: true })

    }
    UpdateInfo = (date, index) => {
        let dataList = ''
        dataList = this.props.TodoInfo.map((data, idx) => {
            if (data.id === index) {
                data.todo = date
            }
            return data
        })
        ToastsStore.success('Date Updated Successfully.')
        this.props.POSTTODODATA(dataList)
        this.setState({ edit : false})
    }

    render() {
        var location = window.location.pathname
        var ToDo_List = ''
        let TodoList = this.state.todo_list !== undefined && this.state.todo_list.length > 0 ? this.state.todo_list : this.props.TodoInfo
        if (TodoList && TodoList.length > 0) {
            ToDo_List = TodoList.map((list, idx) => {
                return (
                    <tbody>
                        <tr key={idx}>
                            {list !== '' && list !== undefined ?
                                <td>
                                    {list !== "" && list !== undefined ?
                                        <React.Fragment>
                                            <span style = {{'position' : 'relative', 'right' : '15px'}}>
                                            <button type="button" data-toggle="modal" onClick={() => this.editForm(list.todo, list.id)} data-target="#exampleModalCenter"><span>Edit</span></button>
                                           </span>
                                            <button onClick={() => this.DeleteRecord(list.id)}>Delete</button>
                                        </React.Fragment>
                                        : null}
                                </td>
                                : null}
                            {list !== '' && list !== undefined ?
                                <td>{list !== '' && list !== undefined ? list.todo : ''}</td>
                                : null}
                            {list !== '' && list !== undefined ?
                                <td> - </td>
                                : null}
                        </tr>
                    </tbody>
                )
            })
        } else {
            ToDo_List = <tbody>
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
                                    <h5 class="modal-title" id="exampleModalLongTitle" onClick={this.ClearValue}> {this.state.edit === true ? "Edit Todo" : "Create Todo"}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* <form> */}
                                    {
                                        this.state.edit === true ?
                                        <React.Fragment>
                                            <label>Date Added 
                                                <span style={{'color' : "red"}}>*</span></label>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                value={edit_info}
                                                selectsStart
                                                onChange={this.HandelChangeEdit}
                                                className="form-control"
                                                dateFormat="d MMM yyyy"
                                                // placeholderText={moment(new Date()).format('DD MMM YYYY')}
                                                onFocus={e => e.target.blur()}
                                            /> 
                                      <i className="material-icons fa" style={{"position": "absolute" ,"right": "54px","top": "30px"}}>date_range</i>


                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                            <label>Date Added <span style={{'color' : "red"}}>*</span></label>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                selectsStart
                                                onChange={this.handleDateChangeEventStart}
                                                className="form-control"
                                                dateFormat="d MMM yyyy"
                                                // placeholderText={moment(new Date()).format('DD MMM YYYY')}
                                                onFocus={e => e.target.blur()}
                                            />
                                                <i className="material-icons fa" style={{"position": "absolute" ,"right": "54px","top": "30px"}}>date_range</i>
                                            </React.Fragment>

                                    }

                                    {/* </form> */}
                                </div>
                                {
                                    this.state.edit === true ?
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.UpdateInfo(edit_info, this.state.index)} >Update</button>
                                        </div>
                                        :
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.TodoInformation(this.state.startDate)} >Save</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="ant-btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.ClearValue}><span>Create Todo</span></button>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Actions</th>
                            <th scope="col">DateAdded</th>
                            <th scope="col">Operation</th>

                        </tr>
                    </thead>
                    {ToDo_List}
                </table>


            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        TodoInfo: state.reducer.todo
    }
}

export default connect(mapStateToProps, { POSTTODODATA })(DashboardTodo)