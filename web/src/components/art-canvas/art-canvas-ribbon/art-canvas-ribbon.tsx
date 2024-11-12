"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

interface ArtCanvasRibbonProps {
  onColumnsChange: (columns: number) => void;
  onMaxItemsChange: (items: number) => void;
  defaultColumns?: number;
  defaultMaxItems?: number;
}

const ArtCanvasRibbon = ({
  onColumnsChange,
  onMaxItemsChange,
  defaultColumns = 3,
  defaultMaxItems = 9
}: ArtCanvasRibbonProps) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [maxItems, setMaxItems] = useState(defaultMaxItems);

  const handleColumnsChange = (newColumns: number) => {
    setColumns(newColumns);
    onColumnsChange(newColumns);
  };

  const handleMaxItemsChange = (newMaxItems: number) => {
    setMaxItems(newMaxItems);
    onMaxItemsChange(newMaxItems);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={6}>
          <Typography variant="subtitle1" gutterBottom>
            Columns
          </Typography>
          <ButtonGroup size="small">
            {[1, 2, 3, 4].map((num) => (
              <Button
                key={num}
                variant={columns === num ? "contained" : "outlined"}
                onClick={() => handleColumnsChange(num)}
                startIcon={num === 1 ? <ViewStreamIcon /> : <ViewColumnIcon />}
              >
                {num}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid size={6}>
          <Typography variant="subtitle1" gutterBottom>
            Images
          </Typography>
          <ButtonGroup size="small">
            {[3, 6, 9, 12].map((num) => (
              <Button
                key={num}
                variant={maxItems === num ? "contained" : "outlined"}
                onClick={() => handleMaxItemsChange(num)}
              >
                {num}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtCanvasRibbon;
