import { Component, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postPost } from "../../service/Service";
import MySpinner from "../MySpinner/MySpinner";

class AddPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            sended: false,
            sending: false
        }
    }

    setSended = (sended) => {this.setState({sended})}
    setSending = (sending) => {this.setState({sending})}

    render() {
        return (
            <Modal
                show
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add post
                    </Modal.Title>
                </Modal.Header>
                {this.state.sended ? <SendedStatus setSended={this.setSended}/> : null}
                {this.state.sending ? <MySpinner/> : null}
                {!this.state.sended && !this.state.sending ? <PostForm {...this.props} setSended={this.setSended} setSending={this.setSending}/> : null}
          </Modal>
        )
    }
}

export default AddPostModal;

const SendedStatus = (props) => {
    return (
        <>
            <Modal.Body>
                Posted succesfully
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setSended(false)}>
                    Post again
                </Button>
            </Modal.Footer>
        </>
    )
}

const PostForm = (props) => {
    const [text, setText] = useState('');
    return (
        <>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    props.setSending(true);
                    postPost({user_id: props.userId, value: text, login: props.user})
                        .then(data => {
                            if (data && data.status === 200) {
                                props.setSended(true);
                            }
                            props.setSending(false);
                        })
                        .catch(() => console.log('ups'));
                }}>
                    Submit
                </Button>
            </Modal.Footer>
        </>
    )
}