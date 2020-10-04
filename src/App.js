import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch,Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import HeaderComponent from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

class App extends React.Component {

  unsubscribedFromAuth=null;

  componentDidMount(){
    const {setCurrentUser}= this.props;
    this.unsubscribedFromAuth=auth.onAuthStateChanged(async userAuth=>{
      //this.setState({currentUser:user})
      //console.log(user);
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{        
            setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            })
        })
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }
  render(){
    return (
      <div>
        <HeaderComponent />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/signin" render={()=>this.props.currentUser?(<Redirect to='/' />):(<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps=({user})=>({
  currentUser:user.currentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
