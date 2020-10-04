import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {Link} from 'react-router-dom';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.util';
import {connect} from 'react-redux';
/* connect is a higher order component that lets us modify our component to have access 
things related to redux*/
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart/cart-dropdown/cart-dropdown.component';

const HeaderComponent = ({currentUser,hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/">HOME</Link>
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/">CONTACT</Link>
            {
                currentUser?
                <div className="option" onClick={()=>auth.signOut()}>SIGNOUT</div>
                :
                <Link className="option" to="/signin">SIGNIN</Link>
            }
            <CartIcon />
        </div>
        {
            hidden?null:<CartDropdown />
        }       
    </div>
)

const mapStateToProps = ({user:{currentUser},cart:{hidden}}) =>({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(HeaderComponent);