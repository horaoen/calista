import { root } from '@lynx-js/react';
import Gallery from '../Gallery.js';
import { furnituresPictures } from '../Pictures/furnitures/furnituresPictures.js';

function AddNiceScrollBar() {
  return <Gallery pictureData={furnituresPictures} />;
}

root.render(<AddNiceScrollBar />);
