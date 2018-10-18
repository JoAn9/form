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


const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

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
    usersArray: [{email: 'asia@gmail.com', nickname: 'joan', ipAddress: '118-121-15-15'}],
  };

  handleChange = name => event => {
    const {user} = this.state;
    const newUser = {
      ...user,
      [name]: event.target.value,
    }
    this.setState({
      user: newUser,
    }, () => console.log(this.state.user.nickname));
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
      this.setState({isErrorEmail: false});
    } else {
      this.setState({isErrorEmail: true});      
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
      this.setState({isErrorIp: false});
    } else {
      this.setState({isErrorIp: true});      
    }
  };

  submitUser = event => {
    event.preventDefault();
    console.log('submitting');
    const { usersArray } = this.state;
    if (!usersArray.some(item => item.email === this.state.user.email)) {
      const newUsersArray = [...usersArray, this.state.user];
      this.setState({ usersArray: newUsersArray });
    } else {
      ErrorHandler.handle('repetition');
    };
  };

  handleDelete = val => {
    const newArray = this.state.usersArray.filter(item => item.email !== val);
    this.setState({ usersArray: newArray });
  }

  render() {
    const { classes } = this.props;
    const { usersArray } = this.state;
    const isInvalid = false;
    // const isInvalid = this.state.isErrorEmail || this.state.isErrorIp;
    console.log(this.state.usersArray);
    return (
      <React.Fragment>
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
                disabled={isInvalid}
              >
                Add User
              </Button>       
            </Grid>
          </form>
        </Grid>
        <Grid container direction="row">
          {usersArray.length > 0 &&
            <Grid item>
              <Typography variant="title">List of Users</Typography>
              <List>
                {usersArray.map(item => {
                  return (
                    <ListItem key={item.email}>
                      <ListItemText primary={item.nickname} secondary={item.email} />
                      <IconButton onClick={() => this.handleDelete(item.email)}>
                        X
                      </IconButton>
                    </ListItem>  
                  );
                })}
              </List>
              <Button 
                variant="contained"
                color="primary"
              >
                Delete all Users
              </Button>  
            </Grid>
          }
        </Grid>
      </React.Fragment>
    );
  }
}

export default Form;
