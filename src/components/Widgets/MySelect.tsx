import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface InputPropsType {
  className?: any;
  value: string;
  onChange?: any;
  options:any[]
  icon?:boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#00000000',
    minWidth : 120,
    '&:hover': {
      
    },
    
    '&:hover fieldset': {
      borderColor: '#00000000 !important',
    },
    '& fieldset': {
      borderColor: '#00000000 !important',
    },
    '& .Mui-focused': {
      borderColor: '#00000000 !important',
    },
    '& .MuiSelect-select': {
      color : '#fff !important',
      minHeight: '20px !important',
      padding : '5px 0px !important',
      display : 'flex',
      alignItems: 'center',
      fontSize : 14,
      '& img': {
        width : 24,
        height : 24,
        marginRight : 5,
      },
    },
    '& .MuiSvgIcon-root': {
      color : '#fff !important',

    },
    '& .MuiMenu-list': {
      background: '#282d5d !important',
    }
  },
  select: {
    borderRadius : '10px !important',
    backgroundColor: "#1e1719 !important",
    marginTop : 5,
    "& ul": {
        
    },
    "& li": {
      transition : 'all 0.3s ease',
      textAlign : 'center !important',
      color : '#fff',
      display : 'flex',
      alignItems: 'center',
      fontSize : 14,
      padding : '5px 10px',
      '&:hover': {
        backgroundColor: "#49566c",
      },
      '& img': {
        width : 24,
        height : 24,
        marginRight : 5,
      },
    },
  },
  
}));

const MySelect = ({className, value, onChange, options, icon}:InputPropsType) => {
  const classes = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };
  return (
    <Select
      value={value}
      defaultValue = {value}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Without label' }}
      className = {clsx(classes.root, className)}
      MenuProps={{ classes: { paper: classes.select } }}
    >

      {options.map((d, k)=>(
        <MenuItem value={d?.value} key = {k}>
          {icon && 
            <>
              {d?.value === 'eth' && <img src="/assets/icons/icon_eth.svg" alt="" />}
              {d?.value === 'usdt' && <img src="/assets/icons/icon_usdt.svg" alt="" />}
              {d?.value === 'alien' && <img src="/assets/icons/icon_alien.svg" alt="" />}
              {d?.value === 'dppe' && <img src="/assets/logo.png" alt="" />}
            </>
          }
          
          {d?.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default MySelect;
