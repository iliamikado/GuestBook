import Spinner from 'react-bootstrap/Spinner';

function MySpinner() {
    return (
        <div style={{margin: '50px auto', width: '32px'}}>
            <Spinner animation="border" variant='primary'/>
        </div>
    );
}

export default MySpinner;