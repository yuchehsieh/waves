import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class CollapseRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: '0'
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
          <FormControlLabel
            key={value._id}
            value={value._id.toString()}
            control={<Radio />}
            label={value.name}
          />
        ))
      : null;

  handleChange = event => {
    this.props.handleFilters(event.target.value);
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div>
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
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
