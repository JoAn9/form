import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';



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
    const newUsersArray = [...usersArray, this.state.user];
    this.setState({ usersArray: newUsersArray });
  };

  render() {
    const { classes } = this.props;
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
        <Grid container>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Form;
