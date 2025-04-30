import { useEffect, useMainThreadRef, useRef } from '@lynx-js/react';
import type { MainThread, NodesRef, ScrollEvent } from '@lynx-js/types';
import LikeImageCard from './Components/LikeImageCard.jsx';
import './index.scss';
import {
  NiceScrollbar,
  type NiceScrollbarRef,
} from './AddNiceScrollbar/NiceScrollbar.js';
import {
  NiceScrollbarMTS,
  adjustScrollbarMTS,
} from './AddNiceScrollbar/NiceScrollbarMTS.js';
import type { Picture } from './Pictures/furnitures/furnituresPictures.jsx';
import { calculateEstimatedSize } from './utils.jsx';

export const Gallery = (props: { pictureData: Picture[] }) => {
  const { pictureData } = props;
  const galleryRef = useRef<NodesRef>(null);
  const scrollbarMTSRef = useMainThreadRef<MainThread.Element>(null);

  const scrollbarRef = useRef<NiceScrollbarRef>(null);
  const onScrollMTS = (event: ScrollEvent) => {
    'main thread';
    adjustScrollbarMTS(
      event.detail.scrollTop,
      event.detail.scrollHeight,
      scrollbarMTSRef,
    );
  };

  const onScroll = (event: ScrollEvent) => {
    scrollbarRef.current?.adjustScrollbar(
      event.detail.scrollTop,
      event.detail.scrollHeight,
    );
  };

  useEffect(() => {
    galleryRef.current
      ?.invoke({
        method: 'autoScroll',
        params: {
          rate: '60',
          start: true,
        },
      })
      .exec();
  }, []);

  return (
    <view className="gallery-wrapper">
      <NiceScrollbarMTS main-thread:ref={scrollbarMTSRef} />
      <list
        ref={galleryRef}
        className="list"
        list-type="waterfall"
        column-count={2}
        scroll-orientation="vertical"
        custom-list-name="list-container"
        main-thread:bindscroll={onScrollMTS}
      >
        {pictureData.map((picture: Picture, index: number) => (
          <list-item
            estimated-main-axis-size-px={calculateEstimatedSize(
              picture.width,
              picture.height,
            )}
            item-key={`${index}`}
            key={`${picture}}}`}
          >
            <LikeImageCard picture={picture} />
          </list-item>
        ))}
      </list>
    </view>
  );
};

export default Gallery;
