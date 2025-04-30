import "../index.scss";
import type { Picture } from "../Pictures/furnitures/furnituresPictures.js";
import LikeIcon from "../LikeIcon.js";

export default function LikeImageCard(props: { picture: Picture }) {
  const { picture } = props;

  return (
    <view className="picture-wrapper">
      <image
        style={{ width: "100%", aspectRatio: picture.width / picture.height }}
        src={picture.src}
      />
      <LikeIcon />
    </view>
  );
}
