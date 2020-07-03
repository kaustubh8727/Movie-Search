import React ,{Component} from 'react';
import Show from './Show';
import Search from './Search';

var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
  apiKey: [API KEY],
  authDomain: [AUTH DOMAIN],
  databaseURL: [DATABASE URL],
  projectId: [PROJECT ID],
  storageBucket: [STORAGE BUCKET],
  messagingSenderId: [MESSAGING SENDER ID],
  appId: [API ID],
  measurementId: [MEASURMENT ID]
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const api='https://api.themoviedb.org/3/search/movie?api_key=[API KEY]';
class Movie extends Component {
constructor(props){
  super(props);

  this.state = {
    title:'',
    result:[],
    notFound:'',
    pages:1,
    totalpages:1
 };
}

getProfile(title){
  let finalURL=`${api}&query=${title}&page=${this.state.pages}`;
  let user=this.props.profile.name;
  fetch(finalURL)
  .then((res)=>res.json())
  .then((data)=>{
    this.setState({
      title:title,
      notFound:data.total_results,
      result:data.results,
      totalpages:data.total_pages
    });
    firebase.database().ref('Moviedb/' + user.uid).set({
    username:this.props.profile.name,
    movieSearch:title
});
  })

  .catch((error) => console.log("THERE IS AN ERROR IN FETCHING DATA"));
}

nextPage(){
  if(this.state.pages < this.state.totalpages) {
    this.setState({
      pages: this.state.pages +=1
    }, () => this.getProfile(this.state.title))
  }
  else{
    alert("only this much content only");
  }
}

previousPage(){
  if(this.state.pages !== 1) {
    this.setState({
      pages: this.state.pages -=1
    }, () => this.getProfile(this.state.title))
  }
  else{
    alert("This is the first page");
  }
}

  render(){

    return(
      <div>
        <section id="card">
          <Search  searchProfile={this.getProfile.bind(this)}/>
          <Show
          userData={this.state}
          nxtpage={this.nextPage.bind(this)}
          prevpage={this.previousPage.bind(this)}/>
        </section>
      </div>
    );
  }
}
export default Movie;
