import { Component } from "react";

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { postPost } from "../../service/Service";

class AddPostModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
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
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            value={this.state.text}
                            onChange={(e) => this.setState({text: e.target.value})}
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        postPost({author: 'iliamikado',date: '2023-05-05', text: this.state.text})
                    }}>
                        Submit
                    </Button>
                </Modal.Footer>
          </Modal>
        )
    }
}

export default AddPostModal;