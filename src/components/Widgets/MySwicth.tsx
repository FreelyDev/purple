import { styled} from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 40,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(8px)',
    backgroundColor: '#161616',
    top: 8,
    
    '&.Mui-checked': {
      color: '#fff',
      backgroundColor: '#fff',
      zIndex : 1,
      transform: 'translateX(calc(100% + 8px))',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('/assets/icons/icon_times.svg')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#CD547D',
        
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#ffffff00',
    width: 22,
    height: 22,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('/assets/icons/icon_times.svg')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    color : '#F400F5',
    backgroundColor: '#232323',
    borderRadius: 30,
    // border : '1px #F400F5 solid',
  },
}));

interface PropsType {
  setChecked : any
}
const MySwicth = ({setChecked} : PropsType) => {
  return (
    <>
      <MaterialUISwitch onChange={e => setChecked(!e.target.checked)} />
    </>
  );
};

export default MySwicth;
