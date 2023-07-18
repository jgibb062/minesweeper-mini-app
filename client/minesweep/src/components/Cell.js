import React from "react";
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';


function Cell ({ mine, status, adjacentMines, flagged, onClick, onRightClick }) {
  const style = {
    width: '30px',
    height: '30px',
    padding: '0',
    margin: '1px',
    border: '1px solid gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'small',
    backgroundColor: status === 'hidden' ? '#c4c4c4' : 'white'
  };
  return (
    <Button style={style} onClick={onClick} onContextMenu={onRightClick}>
      {status === 'hidden' ? (flagged ? <FlagIcon fontSize='small' /> : '') : (mine ? 'M' : adjacentMines > 0 ? adjacentMines : '')}
    </Button>
  );
}

export default Cell