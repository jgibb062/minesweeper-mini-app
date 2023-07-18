import React from "react";
import Cell from "./Cell";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

function Board ({ board, onCellClick, onCellRightClick}) {

  return (
    <Box m={8} p={3} style={{overflowX: 'auto'}}>
      <div className="boardGrid">
      <Grid container spacing={0} style={{flexWrap: 'nowrap'}}>
        {board.map((row, x) => (
          <Grid key={x}>
            <Grid container spacing={0}>
            {row.map((cell, y) => (
              <Grid item key={y}>
                <Cell onClick={() => onCellClick(x, y)} onRightClick={(e) => onCellRightClick(e, x, y)} {...cell} />
              </Grid>
            ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      </div>
    </Box>
  );
}

export default Board;