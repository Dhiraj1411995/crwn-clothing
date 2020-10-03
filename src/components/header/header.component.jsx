import React from 'react';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {Link} from 'react-router-dom';
import './header.styles.scss';
import {auth} from '../../firebase/firebase.util';
import {connect} from 'react-redux';
/* connect is a higher order component that lets us modify our component to have access 
things related to redux*/

const HeaderComponent = ({currentUser}) => (
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
        </div>
    </div>
)

const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HeaderComponent);