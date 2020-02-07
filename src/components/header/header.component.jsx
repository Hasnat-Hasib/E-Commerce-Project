import React from 'react';
import {Link} from 'react-router-dom';
import{ ReactComponent as Logo } from '../../assets/crown.svg';
import {aut} from '../../firebase/firebase.utils';

import './header.styles.scss';


const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to ='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className = 'option' to ='/shop'>
                SHOP
            </Link>
            <Link className = 'option' to ='/contact'>
                CONTACT
            </Link>
            {
            currentUser?
            <Link className='option' onClick={()=>aut.signOut()}>SIGN OUT </Link>
            :
            <Link className='option' to ='/signin'>SIGN IN</Link>
            }

        </div>

    </div>

);

export default Header;