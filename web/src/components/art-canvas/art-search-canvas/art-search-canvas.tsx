"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ArtSearchBar from "../art-search-bar/art-search-bar";
import ArtCanvas from "../art-canvas/art-canvas";
import { SearchParams } from "../art-search-bar/art-search-bar";

interface ArtSearchCanvasProps {
  images?: string[];
}

const ArtSearchCanvas = ({ images = [] }: ArtSearchCanvasProps) => {
  const [filteredImages, setFilteredImages] = useState(images);

  const handleSearch = (searchParams: SearchParams) => {
    let filtered = [...images];

    // Filter by search query
    if (searchParams.query) {
      const query = searchParams.query.toLowerCase();
      filtered = filtered.filter(image => 
        image.toLowerCase().includes(query)
      );
    }

    // Filter by style
    if (searchParams.style) {
      filtered = filtered.filter(image =>
        image.toLowerCase().includes(searchParams.style!.toLowerCase())
      );
    }

    // Filter by medium
    if (searchParams.medium) {
      filtered = filtered.filter(image =>
        image.toLowerCase().includes(searchParams.medium!.toLowerCase())
      );
    }

    // Sort images
    if (searchParams.sortBy === 'date') {
      filtered.sort((a, b) => b.localeCompare(a)); // Assuming filename contains date
    } else if (searchParams.sortBy === 'title') {
      filtered.sort((a, b) => a.localeCompare(b));
    }
    // 'relevance' sorting is maintained by default order

    setFilteredImages(filtered);
  };

  return (
    <Box>
      <ArtSearchBar onSearchChange={handleSearch} />
    </Box>
  );
};

export default ArtSearchCanvas;
