import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiFormControlLabel-label': {
      color: '#ddd',
      fontSize : 14,
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: 'transparent',
    border: `1px solid #727272`,
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
  },
  checkedIcon: {
    backgroundColor: '#CD547D',
    border: `1px solid #CD547D`,
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: "url('/assets/icons/icon_check.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '1px 3px',
      content: '""',
    },
  },
}));

const CheckBox = ({
  wrapperClassName,
  className,
  value,
  onChange,
  label,
}) => {
  const classes = useStyles();
  const [ isChecked, setChecked ] = useState<boolean>(value);
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  useEffect(() => {
    if (value){
      setChecked(value);
      onChange(value);
    }
  }, [onChange, value])

  return (
    <FormControlLabel
      className={clsx(classes.root, wrapperClassName)}
      control={(
        <Checkbox
          className={clsx(classes.root, className)}
          disableRipple
          color="default"
          checkedIcon={(
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          )}
          icon={<span className={classes.icon} />}
          checked={isChecked}
          onChange={handleChangeCheck}
        />
      )}
      label={label}
    />
  );
};

CheckBox.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

CheckBox.defaultProps = {
  wrapperClassName: '',
  className: '',
  value: false,
  onChange: () => {},
  label: '',
};

export default CheckBox;
