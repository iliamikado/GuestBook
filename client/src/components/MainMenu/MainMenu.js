
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';

const MainMenu = (props) => {
    const {show, setShow, logout, login, register, user, addPost} = props;
    return (
        <Offcanvas show={show} onHide={() => setShow(false)} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{user ? `Logged in as ${user}` : 'Not logged in'}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{padding: 0}}>
                <ListGroup variant='flush'>
                    {!user ?
                        <>
                            <ListGroup.Item action onClick={login}>Login</ListGroup.Item>
                            <ListGroup.Item action onClick={register}>Register</ListGroup.Item>
                        </>
                    :                         
                        <>
                            <ListGroup.Item action onClick={addPost}>Add post</ListGroup.Item>
                            <ListGroup.Item action onClick={logout}>Logout</ListGroup.Item>
                        </>
                    }
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default MainMenu;