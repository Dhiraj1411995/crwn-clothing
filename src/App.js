import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import HeaderComponent from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.util';

class App extends React.Component {
  constructor(){
    super();

    this.state={
      currentUser:null
    }
  }

  unsubscribedFromAuth=null;

  componentDidMount(){
    this.unsubscribedFromAuth=auth.onAuthStateChanged(async userAuth=>{
      //this.setState({currentUser:user})
      //console.log(user);
      //createUserProfileDocument(user);
      if(userAuth){
        const userRef=await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      else{
        this.setState({currentUser:userAuth});
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }
  render(){
    return (
      <div>
        <HeaderComponent currentUser={this.state.currentUser} />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
