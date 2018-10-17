import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

class Form extends React.Component {
  state = {
    email: '',
    nickname: '',
    ipAddress: '',
    errorMsg: '',
    isErrorEmail: true,
    isErrorIp: true,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeEmail = event => {
    this.setState({
      email: event.target.value,
    });
    const validEmail = emailRegex.test(event.target.value);
    if (validEmail) {
      this.setState({isErrorEmail: false});
    } else {
      this.setState({isErrorEmail: true});      
    }
  };

  handleChangeIp = event => {
    this.setState({
      ipAddress: event.target.value,
    });
    const validIp = ipRegex.test(event.target.value);
    if (validIp) {
      this.setState({isErrorIp: false});
    } else {
      this.setState({isErrorIp: true});      
    }
  };

  submitUser = event => {
    event.preventDefault();
    console.log('submitting');    
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container direction="column">
        <form noValidate autoComplete="off" onSubmit={this.submitUser}>
          <Grid item>
            <TextField
              id="email"
              label="Your email"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              id="nickname"
              label="Your nick name"
              value={this.state.nickname}
              onChange={this.handleChange('nickname')}
              margin="normal"
            />
          </Grid>
          <Grid item>        
            <TextField
              id="ip"
              label="Your IP Address"
              value={this.state.ipAddress}
              onChange={this.handleChangeIp}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Button 
              variant="contained"
              type="submit"
              color="primary"
              disabled={this.state.isErrorEmail && this.state.isErrorIp}
            >
              Create User
            </Button>       
          </Grid>
        </form>
      </Grid>
    );
  }
}

export default Form;
