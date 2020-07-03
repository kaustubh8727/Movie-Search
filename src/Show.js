import React ,{Component} from 'react';

const im='https://image.tmdb.org/t/p/w500/';
class Show extends Component {

nxtPage1(){
  this.props.nxtpage();
}
prevPage1(){
  this.props.prevpage();
}


  render(){

    let userdata=this.props.userData;
    if(userdata.notFound=== 0)
    {
      return(
      <h2>Entered Movie name is Invalid Please Try Again!!!!</h2>
    );
    }

    else {
      let paging1
      let paging2
      if(userdata.totalpages!=1){
        if(userdata.pages==1){
          paging2=<button className="bt" onClick={this.nxtPage1.bind(this)}>Next Page >></button>;
        }
        else if(userdata.pages==userdata.totalpages){
          paging1=<button className="bt" onClick={this.prevPage1.bind(this)}> Previous Page </button>;
        }
        else{ 
          paging1=<button className="bt" onClick={this.prevPage1.bind(this)}> Previous Page </button>;
          paging2=<button className="bt" onClick={this.nxtPage1.bind(this)}>Next Page >></button>;
        }
      }
      return(
        <div className="showing1">
        {userdata.result.map(ob =>
          <div className="showing">
          <br/>
                <img className="github-profile-info" src={`${im}${ob.poster_path}`} />
          <br />
              <table striped bordered hover variant="dark">
                <tr>
                  <th>Movie Name:</th>
                  <td>{ob.original_title}</td>
                </tr>
                <tr>
                <th>Rating:</th>
                <td>{ob.vote_average}</td>
                </tr>
                <tr>
                <th>Release Date:</th>
                <td>{ob.release_date}</td>
                </tr>
                <tr>
                <th>Overview:</th>
                <td>{ob.overview}</td>
                </tr>
              </table>
              <img className="more" src={`${im}${ob.backdrop_path}`} />
              <p  className="gap">.</p>
              <br/>
        </div>
        )
      }
      {paging1}
      {paging2}
          </div>
      );
    }
    }
}
export default Show;
