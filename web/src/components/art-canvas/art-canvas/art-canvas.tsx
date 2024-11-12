"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import ArtCanvasRibbon from "../art-canvas-ribbon/art-canvas-ribbon";

interface ArtCanvasProps {
  images?: string[];
  spacing?: number;
  columns?: number;
  maxItems?: number;
}
const ArtCanvas = ({
  images = [],
  spacing = 2,
  columns: defaultColumns = 3,
  maxItems: defaultMaxItems = images.length
}: ArtCanvasProps) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [maxItems, setMaxItems] = useState(defaultMaxItems);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ArtCanvasRibbon 
        onColumnsChange={setColumns}
        onMaxItemsChange={setMaxItems}
        defaultColumns={defaultColumns}
        defaultMaxItems={defaultMaxItems}
      />      
      <Grid container spacing={spacing}>
        {images.slice(0, maxItems).map((image, index) => (
          <Grid size={12/columns} key={index}>
            <Paper
              sx={{
                height: 200,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default ArtCanvas;
