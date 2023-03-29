import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { postUser, loginUser } from '../../service/Service';

import './LoginModal.css';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            login: '',
            password: '',
            passwordRepeat: ''
        }
    }

    onSubmit = () => {
        const {register, login, password, passwordRepeat} = this.state;
        if (register) {
            if (password.length > 3 && passwordRepeat === password) {
                postUser({login, password}).then(data => {
                    if (data.status === 200) {
                        this.props.setUser(login);
                        this.props.onHide();
                    }
                });
            }
        } else {
            loginUser({login, password}).then(data => {
                if (data.status === 200) {
                    this.props.setUser(login);
                    this.props.onHide();
                }
            });
        }
    }

    render() {

        const {register, login, password, passwordRepeat} = this.state;

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
                        <Form.Group className="mb-3">
                            <Form.Control placeholder="Login" value={login} onChange={(e) => {this.setState({login: e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control type="password" value={password} onChange={(e) => {this.setState({password: e.target.value})}} placeholder="Password" />
                        </Form.Group>

                        {register ? 
                            <Form.Group className="mb-3">
                                <Form.Control type="password" value={passwordRepeat} onChange={(e) => {this.setState({passwordRepeat: e.target.value})}} placeholder="Password again" />
                            </Form.Group>
                        : null}

                        <Button onClick={this.onSubmit}>
                            Submit
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{justifyContent: 'flex-start'}}>
                    {register ? 
                        <div className='changing-link' onClick={() => this.setState({register: false})}>Login</div> : 
                        <div className='changing-link' onClick={() => this.setState({register: true})}>Register</div>
                    }
                </Modal.Footer>
            </Modal>
        );
    }
}

export default LoginModal;