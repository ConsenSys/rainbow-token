import React from 'react';

/* Components */
import DefaultToken from '../UI/Token/Token';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

/* Material ui components */
import Button from '@material-ui/core/Button';

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginBottom: '.4em',
    fontSize: '1.2em',
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    fontSize: '0.7em',
    marginLeft: '2em',
  }
})

const DefaultBlendSpace = ({
  defaultColor,
  disabled,
  onClick,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your Default Color
    </div>
    <div className={classes.actionRow}>
      <DefaultToken
        color={defaultColor}
        size='40'
        boxShadowSize='1.6'
        borderSize='1.2'
      />
      <Button
        className={classes.btn}
        variant='contained'
        color='primary'
        onClick={onClick}
        disabled={disabled}
      >
        Blend
      </Button>
    </div>
  </div>
)

export default withStyles(styles)(DefaultBlendSpace);