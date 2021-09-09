import React, { useState } from "react";
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { addNotification, removeNotification } from '../Redux/Action';

const Notification = props => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          console.log('hi')
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, (props.delay*1000)/200);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.removeNotification({
        id: props.id
      })
    }, 400)
  };

  React.useEffect(() => {
    if (width === 100) {
      handleCloseNotification()
    }
  }, [width])

  React.useEffect(() => {
    handleStartTimer();
  }, []);
  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${props.type === "SUCCESS" ? "success" :
        props.type === "ERROR" ? "error" :
          props.type === "WARNING" ? "warning" :
            props.type === "INFO" ? "info" : null
        } ${exit ? "exit" : ""}`}
    >
      <div className="close">
        <p>{props.message}</p>
        <IconButton className="close" onClick={()=>props.removeNotification({
          id: props.id
        })}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

const mapStateToProps = state => ({
  publishNotification: state.publishNotification
});

const mapDispatchToProps = dispatch => ({
  addNotification: (payload) => dispatch(addNotification(payload)),
  removeNotification: (payload) => dispatch(removeNotification(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
