import './AddPostButton.css';

function AddPostButton(props) {
    return (
        <button className="add-post-button" onClick={props.onClick}>
            +
        </button>
    )
}

export default AddPostButton;