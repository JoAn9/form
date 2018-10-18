import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { ErrorHandler } from './errorHandler';
import confirm from './confirm';


const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

const listStyle = {
  width: '100%',
  maxWidth: 300,
};

class Form extends React.Component {
  state = {
    user: {
      email: '',
      nickname: '',
      ipAddress: '',
    },
    errorMsg: '',
    isErrorEmail: true,
    isErrorIp: true,
    errorEmailMsg: '',
    errorIpMsg: '',
    usersArray: [],
  };

  handleChange = name => event => {
    const {user} = this.state;
    const newUser = {
      ...user,
      [name]: event.target.value,
    }
    this.setState({
      user: newUser,
    });
  };
  
  handleChangeEmail = event => {
    const {user} = this.state;
    const newUser = {
      ...user,
      email: event.target.value,
    }
    this.setState({
      user: newUser,
    });
    const validEmail = emailRegex.test(event.target.value);
    if (validEmail) {
      this.setState({
        isErrorEmail: false,
        errorEmailMsg: '',
      });
    } else {
      this.setState({
        isErrorEmail: true,
        errorEmailMsg: 'Invalid email address',
      });      
    }
  };

  handleChangeIp = event => {
    const {user} = this.state;
    const newUser = {
      ...user,
      ipAddress: event.target.value,
    }
    this.setState({
      user: newUser,
    });
    const validIp = ipRegex.test(event.target.value);
    if (validIp) {
      this.setState({
        isErrorIp: false,
        errorIpMsg: '',
        
      });
    } else {
      this.setState({
        isErrorIp: true,
        errorIpMsg: 'Invalid IP address',        
      });      
    }
  };

  submitUser = event => {
    event.preventDefault();
    const { usersArray } = this.state;
    if (!usersArray.some(item => item.email === this.state.user.email)) {
      const newUsersArray = [...usersArray, this.state.user];
      this.setState({ 
        usersArray: newUsersArray,
      });
    } else {
      ErrorHandler.handle('repetition');
    };
  };

  handleDelete = val => {
    const newArray = this.state.usersArray.filter(item => item.email !== val);
    this.setState({ usersArray: newArray });
  }

  deleteAllUsers = () => {
    confirm('Are you sure you want to delete all users???').then(
      () => this.setState({ usersArray: [] }),
      () => { },
    );
  }

  render() {
    const { usersArray } = this.state;
    const isInvalid = this.state.isErrorEmail || this.state.isErrorIp;
    return (
      <React.Fragment>
        <Grid container direction="row" spacing={24}>
          <Grid item xs={12} sm={6} style={{ marginTop: 20 }}>
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
                <Typography color="error">
                  {this.state.errorEmailMsg}
                </Typography>
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
                <Typography color="error">
                  {this.state.errorIpMsg}
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: 30}}>
                <Button 
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isInvalid}
                >
                  Add User
                </Button>       
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: 50 }}>
            {usersArray.length > 0 &&
              <Grid item style={listStyle}>
                <Typography variant="title">List of Users</Typography>
                <List>
                  {usersArray.map(item => {
                    return (
                      <ListItem key={item.email}>
                        <ListItemText primary={item.nickname} secondary={item.email} />
                        <IconButton onClick={() => this.handleDelete(item.email)}>
                          x
                        </IconButton>
                      </ListItem>  
                    );
                  })}
                </List>
                <Button
                  variant="outlined"
                  onClick={this.deleteAllUsers}
                >
                  Delete all Users
                </Button>  
              </Grid>
            }
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Form;
