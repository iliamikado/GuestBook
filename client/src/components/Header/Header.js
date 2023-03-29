import { Component } from 'react';

import './Header.css';

class Header extends Component {
    render() {
        const {user} = this.props;
        return (
            <div className='header'>
                <div className='name'>Guest Book</div>
                <div className='login' onClick={this.props.openLoginModal}>{user ? user : 'Login'}</div>
            </div>
        )
    }
}

export default Header;