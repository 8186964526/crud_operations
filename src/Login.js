import React, { Component } from 'react';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
 const CustomAuthData =
 {
    "user_name": "hruday@gmail.com",
    "password" : 'hruday123',
 }
 
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_name: '',
            password: '',
            user_name_err: '',
            password_err: '',
              
        }
    }
    Login = (e) => {
        localStorage.removeItem('login')
        if (this.state.user_name !== '') {
            this.setState({ user_name_err: '' })
        } else {
            this.setState({ user_name_err: 'Please enter Username' })
        }
        if (this.state.password !== '') {
            this.setState({ password_err: '' })
        } else {
            this.setState({ password_err: 'Please enter Password' })
        }

        if (this.state.user_name !== '' && this.state.password !== '') {
            if (this.state.user_name === CustomAuthData.user_name && this.state.password === CustomAuthData.password) {
                localStorage.setItem('login', 'success')
                if(this.props && this.props.history){
                    this.props.history.push('/dashboard')
                }else{
                window.location.pathname = window.location.pathname.replace(window.location.pathname, '/dashboard')
                }

            } else {
                ToastsStore.error("Credentionals wrong.please try again")
                this.setState({ user_name: '', password: '' })
            }

        }

    }
    HandleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        if (name === 'user_name') {
            this.setState({ user_name_err: '' })
        }
        if (name === 'password') {
            this.setState({ password_err: '' })

        }
        this.setState({ [name]: value })
    }
 
    render() {
        return (
            <React.Fragment>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
                <form className='login'>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <label htmlFor="name" className="col-sm-2 col-form-label"><b>Username :</b> </label>
                            <input type="text"  autoComplete='off' value={this.state.user_name} style={{ 'position': 'relative', 'left': '320px' }} name='user_name' className="form-control" id="name" placeholder='Enter Username' onChange={(e) => this.HandleChange(e)} />
                            <span className='err-msg' >{this.state.user_name_err}</span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label"><b>Password :</b></label>
                            <input type="password"  value={this.state.password} autoComplete='off' style={{ 'position': 'relative', 'left': '320px' }} name='password' className="form-control" id="inputPassword" placeholder="Enter Password" onChange={(e) => this.HandleChange(e)} />
                            <span className='err-msg'>{this.state.password_err}</span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-6">
                            <button style={{ "width": "751px", "position": "relative", 'padding': '10px', "left": "312px" }} type="button" onClick={this.Login} className="btn btn-success">Sign In</button>
                        </div>
                    </div>
                </form>
            </React.Fragment>

        )
    }
}
export default Login
