import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapseCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      checked: []
    };
  }

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleAngel = () => (
    <FontAwesomeIcon
      icon={this.state.open ? faAngleUp : faAngleDown}
      className="icon"
    />
  );

  renderList = () =>
    this.props.list
      ? this.props.list.map(value => (
          <ListItem>
            <ListItemText primary="Hey there" />
            <div>checkbox here</div>
          </ListItem>
        ))
      : null;

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            style={{
              padding: '10px 23px 10px 0'
            }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngel()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
