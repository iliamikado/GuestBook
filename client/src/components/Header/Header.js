import { Component } from 'react';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='name'>Guest Book</div>
            </div>
        )
    }
}

export default Header;