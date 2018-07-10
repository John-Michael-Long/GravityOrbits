import React from 'react';

class SaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSaveSubmit(this.state.username, this.state.password);
  }

  render() {
    return (
      <form className="save-form" onSubmit={this.handleSubmit}>
        <label>
          Enter username:
          <input 
            name="username" 
            value={this.state.username} 
            onChange={this.handleInputChange} />
        </label>
        <label>
          Enter password:
          <input 
            name="password" 
            value={this.state.password} 
            onChange={this.handleInputChange} />
        </label>
        <button>submit</button>
      </form>
    );
  }
}

export default SaveForm;