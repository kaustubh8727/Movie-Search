import React ,{Component} from 'react';
import Show from './Show';
import Search from './Search';

var firebase = require('firebase');
var uuid = require('uuid');

var firebaseConfig = {
  apiKey: "AIzaSyDQvywMm1wUJfGFRzze6iJNF2Yyf2gJ20o",
  authDomain: "moviedb-45fcd.firebaseapp.com",
  databaseURL: "https://moviedb-45fcd.firebaseio.com",
  projectId: "moviedb-45fcd",
  storageBucket: "moviedb-45fcd.appspot.com",
  messagingSenderId: "434839258961",
  appId: "1:434839258961:web:4ab92398723b67cde37570",
  measurementId: "G-VTT76W06DQ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const api='https://api.themoviedb.org/3/search/movie?api_key=b4c8c199530dda137040f4e809e547b9';
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
