import React, { useState } from 'react';
import './App.css';
import { v4 } from "uuid";
import { connect } from 'react-redux';
import { addNotification } from './Redux/Action';
import Notification from './Notifications/Notification';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App(props) {
  const [inputVal, setInputVal] = useState("");
  const [notType, setNotType] = useState("SUCCESS");
  const [delay,setDelay] = useState("");
  const classes = useStyles();

  const handleNewNotification = () => {
    if(inputVal !== "" && delay !== "")
    props.addNotification({
      id: v4(),
      type: notType,
      message: inputVal,
      delay:delay,
      title: "Successful Request"
    })
    else{
      alert("message and delay cant be null")
    }
  }
  return (
    <div className="App">
      <TextField id="standard-basic" label="Message" value={inputVal} onChange={e => setInputVal(e.target.value)} />
      <TextField   id="standard-basic" label="Delay in sec" value={delay} onChange={e => setDelay(e.target.value)} />
      <div className="select">
        <InputLabel id="demo-simple-select-label">Select Notification Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="ayush"
          id="demo-simple-select"
          value={notType}
          onChange={(e) => setNotType(e.target.value)}
        >
          <MenuItem value={"SUCCESS"}>Success</MenuItem>
          <MenuItem value={"ERROR"}>Error</MenuItem>
          <MenuItem value={"WARNING"}>Warning</MenuItem>
          <MenuItem value={"INFO"}>Info</MenuItem>
        </Select>
      </div>

      <Button variant="contained" color="primary" onClick={handleNewNotification}>
        Add Notification
      </Button>
      <div className={"notification-wrapper"}>
        {props.publishNotification.map((item, index) =>
          <Notification
            key={item.id}
            type={item.type}
            message={item.message}
            id={item.id}
            delay={item.delay}
          />
        )}
      </div>

    </div>
  );
}
const mapStateToProps = state => ({
  publishNotification: state.publishNotification
});
const mapDispatchToProps = dispatch => ({
  addNotification: (payload) => dispatch(addNotification(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(App);