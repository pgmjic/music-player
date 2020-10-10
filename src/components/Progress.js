import React from 'react';

class Progress extends React.Component {

  render(){
    return(
      <div className="myprogress has-text-light" >
        <span>{this.props.elapsed}</span>
        <progress className="progress is-small is-danger " 
           value={this.props.position}
           max="1"></progress>
        <span>{this.props.total}</span>
      </div>
    )
  }

}

export default Progress