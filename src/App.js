import React ,{Component} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Movie from './Movie';
import Head from './Head';
import Auth0Lock from 'auth0-lock';
class App extends Component {

  static defaultProps={
    clientID:[YOUR CLIENT ID],
    domain:[YOUR DOMAIN NAME]
  }

constructor(props){
  super(props);

  this.state = {
    token:'',
    profile:{}
  };
}

   componentWillMount(){
    this.lock=new Auth0Lock(this.props.clientID,this.props.domain);

    this.lock.on('authenticated',(authResult)=>{

      this.lock.getProfile(authResult.accessToken,(error,profile)=>{

        if(error)
        {
          console.log(error);
          return;
        }
        this.setProfile(authResult.accessToken,profile);

      });
  });
  this.getProfile();
  }

  setProfile(accessToken,profile){
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('profile',JSON.stringify(profile));
    this.setState({
      token:localStorage.getItem('accessToken'),
      profile:JSON.parse(localStorage.getItem('profile'))
    });
  }

getProfile(){
  if(localStorage.getItem('accessToken')==null){
    this.setState({
      token:localStorage.getItem('accessToken'),
      profile:JSON.parse(localStorage.getItem('profile'))
    }, ()=>{
      console.log(this.state);
    });
  }
}
  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({
      token:'',
      profile:''
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
  }

  render(){
    let gitty;
    if(this.state.token){
      gitty=<Movie
              profile={this.state.profile}
              />;
    }
    else{
    gitty=<h1 className="click" ><marquee>Click On Login To Search Movies</marquee></h1>;
    }

    return (
      <div className="App">
        <Head
        lock={this.lock}
        token={this.state.token}
        profile={this.state.profile}
        onLogout={this.logout.bind(this)}
        onLogin={this.showLock.bind(this)}
        />
      {gitty}
      <footer className="ft">Copyright &copy; Kaustubh Thapliyal </footer>
      </div>
    );
  }
}

export default App;
