
import { useState } from 'react';
import Select from "react-select";

interface Props {
  value: string;
  label: string;
}

function StyledOption({ value, label }: Props) {
  const icons = [
    <img src="/assets/icons/icon_zk.svg" alt="" style={{width: 30, height: 30}}/>,
    <img src="/assets/logo.png" alt=""  style={{width: 30, height: 30}}/>,
    <img src="/assets/icons/icon_zk.svg" alt=""  style={{width: 30, height: 30}}/>,
    <img src="/assets/icons/icon_zk.svg" alt=""  style={{width: 30, height: 30}}/>,
    <img src="/assets/icons/icon_zk.svg" alt=""  style={{width: 30, height: 30}}/>,
    <img src="/assets/icons/icon_zk.svg" alt=""  style={{width: 30, height: 30}}/>,
  ]
  return (
    <div style={{ display: "flex", alignItems: "center", background: "transparent" }}>
      <div>
        <div
          style={{
            width: "30px",
            height: "30px",
            fontSize: "1rem",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: '#3059E8',
          }}>
            {icons[value]}
        </div>
      </div>
      <div style={{ fontWeight: 500, width: '100%', paddingLeft: "10px", display: 'flex', justifyContent: 'space-between', color :'#fff' }}>{label}</div>
    </div>
  );
}

const customStyles = {
  control: base => ({
    ...base,
    fontSize: '0.8vw',
    fontWeight: '500 !important',
    borderRadius: '50px',
    border: '1px solid #001D13 !important',
    boxShadow: 'none',
    background: '#001D13',
    minWidth: '10vw',
    '@media screen and (min-width: 1980px) ': {
      fontSize: 18,
    },
    '&:focus': {
      border: '0 !important',
    },
    '@media screen and (max-width: 640px) and (orientation: portrait)': {
      fontSize: 14,
      width : '100%'
    },
  }),

  menu: (provided, state) => ({
    ...provided,
    border: '1px solid #ffffff13',
    color: '#000',
    padding: 0,
    background: '#111',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #aaa',
    padding: 3,
    cursor: 'pointer',
    fontSize: '0.8vw',
    '@media screen and (min-width: 1980px) ': {
      fontSize: 18,
    },
    color: state.isSelected ? '#555' : '#777 !important',
    background: state.isSelected ? '#222' : '#00000000 !important',
    '@media screen and (max-width: 768px) and (orientation: portrait)': {
      fontSize: 14,
    },
    ':hover': {
      background: '#333 !important',
      color: '#93989A !important',
    },
    ':active': {
      color: '#fff !important',
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const MySelector = ({setVlaue} : {setVlaue:any}) => {
  const options = [
    { value: "0", label: "zkSync Era" },
    { value: "1", label: "DPPE" },
  ];

  const [option, setOption] = useState(options[0]);

  const onChange = (e) => {
    setOption(e)
    setVlaue(e.label)
  }

  return (
    <Select
      value={option}
      defaultValue={option}
      formatOptionLabel={StyledOption}
      options={options}
      instanceId='chainSelect'
      className={`select-gray`}
      onChange={(e) => onChange(e)}
      isSearchable={false}
      isClearable={false}
      styles={customStyles}
      
    />
  );
}

export default MySelector;
