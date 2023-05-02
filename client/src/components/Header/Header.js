import { useState } from 'react';

import MainMenu from '../MainMenu/MainMenu';

import './Header.css';

const Header = (props) => {

    const {user, logout, addPost} = props;

    const [showMainMenu, setShowMainMenu] = useState(false);

    return (
        <div className='header'>
            <img src="/book.png" className='icon' alt="logo"/>
            <div className='name'>Guest Book</div>
            <img src="/menu.png" className='icon-menu' onClick={() => setShowMainMenu(true)} alt="menu"/>
            <MainMenu show={showMainMenu}
                setShow={setShowMainMenu}
                logout={logout}
                login={() => props.openLoginModal(false)}
                register={() => props.openLoginModal(true)}
                user={user}
                addPost={addPost}
            />
        </div>
    )
}

export default Header;