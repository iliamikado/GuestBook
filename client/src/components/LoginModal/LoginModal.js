import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postUser, loginUser } from '../../service/Service';

import MySpinner from '../MySpinner/MySpinner';

import './LoginModal.css';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: props.register,
            login: '',
            password: '',
            passwordRepeat: '',
            loading: false,
            passwordRepeatWrong: false,
            passwordShort: false,
            loginTaken: false,
            wrongPasswordOrLogin: false
        }
    }

    onSubmit = () => {
        const {register, login, password, passwordRepeat} = this.state;
        if (register) {
            if (password.length <= 3) {
                this.setState({passwordShort: true});
            } else if (passwordRepeat !== password) {
                this.setState({passwordRepeatWrong: true});
            } else {
                this.setState({loading: true});
                postUser({login, password}).then(data => {
                    this.setState({loading: false});
                    if (data.status === 200) {
                        this.props.setUser(login);
                        this.props.setUserId(data.user_id);
                        this.props.onHide();
                    } else if (data.status === 400) {
                        this.setState({loginTaken: true});
                    } else {
                        console.log(data);
                    }
                });
            }
        } else {
            this.setState({loading: true});
            loginUser({login, password}).then(data => {
                this.setState({loading: false});
                if (data.status === 200) {
                    this.props.setUser(login);
                    this.props.setUserId(data.user_id);
                    this.props.onHide();
                } else if (data.status === 400) {
                    this.setState({wrongPasswordOrLogin: true});
                } else {
                    console.log(data);
                }
            });
        }
    }

    onChangeInput = (e, field) => {
        this.setState({
            passwordRepeatWrong: false,
            passwordShort: false,
            loginTaken: false,
            wrongPasswordOrLogin: false
        });
        this.setState({[field]: e.target.value});
    }

    render() {

        const {register, login, password, passwordRepeat} = this.state;
        const {loginTaken, wrongPasswordOrLogin, passwordShort, passwordRepeatWrong, loading} = this.state;

        return (
            <Modal
                show
                onHide={this.props.onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {register ? 'Register' : 'Login'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {loading ? <MySpinner/> : <>
                            <Form.Group className="mb-3">
                                <Form.Control placeholder="Login" value={login} onChange={(e) => {this.onChangeInput(e, 'login')}}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control type="password" value={password} onChange={(e) => {this.onChangeInput(e, 'password')}} placeholder="Password" />
                            </Form.Group>

                            {register ? 
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" value={passwordRepeat} onChange={(e) => {this.onChangeInput(e, 'passwordRepeat')}} placeholder="Password again" />
                                </Form.Group>
                            : null}
                        </>}

                        <Button onClick={this.onSubmit} disabled={loading}>
                            Submit
                        </Button>

                        <div className='error-message'>
                            {wrongPasswordOrLogin ? 'Wrong login or password' : null}
                            {passwordShort ? 'Password is too short' : null}
                            {passwordRepeatWrong ? 'Different passwords' : null}
                            {loginTaken ? 'This login is already taken' : null}
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;