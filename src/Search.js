import React ,{Component} from 'react';

class Search extends Component {
SubmitForm(event){
  event.preventDefault();
  let value=this.refs.title.value;
  this.props.searchProfile(value);
  this.refs.title.value='';
}

  render(){
    return(
      <div className="search-box">
        <form onSubmit={this.SubmitForm.bind(this)}>
        <label><input className="search-box" type="search" ref="title" placeholder="Enter Movie Name" /></label>
        </form>
      </div>
    );
  }
}
export default Search;
