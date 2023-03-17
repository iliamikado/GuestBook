import { Component, useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postPost } from "../../service/Service";

class AddPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            sended: false
        }
    }

    setSended = (sended) => {
        this.setState({sended});
    }

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
                {!this.state.sended ? <PostForm setSended={this.setSended}/> : null}
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
                    postPost({author: 'iliamikado',date: '2023-05-05', text: text})
                        .then(data => {
                            if (data && data.status === 200) {
                                props.setSended(true);
                            }
                        })
                        .catch(() => console.log('ups'));
                }}>
                    Submit
                </Button>
            </Modal.Footer>
        </>
    )
}