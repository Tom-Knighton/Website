import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStickerCache } from "../actions";
import fetchJson from "../lib/fetchJson";
import { StoreState } from "../reducers";
import Sticker from "../types/Sticker";

export default function StickerPicker({
  onCancel,
  onStickerSelected,
}: {
  onCancel: () => void;
  onStickerSelected: (stickerUrl: string) => void;
}) {
  const appStore = useSelector((state: StoreState) => state.app);
  let { stickerCache } = appStore;
  const dispatch = useDispatch();
  let [stickers, setStickers] = useState<Sticker[]>(stickerCache);

  useEffect(() => {
    async function getStickers() {
      let data: Sticker[] = await fetchJson("/api/stickers");
      setStickers(data);
      dispatch(updateStickerCache({ stickers: data }));
    }
    getStickers();
  }, []);

  return (
    <div className="w-full p-1 pl-3 pr-3 pb-1 max-h-35vh overflow-y-auto">
      <h1 className="font-bold text-lg pb-3">Stickers:</h1>
      <div className="flex flex-row flex-wrap gap-12">
        {stickers.map((sticker) => (
          <div
            key={sticker.stickerId}
            className="rounded-md hover:shadow-xl hover:scale-105 cursor-pointer"
            onClick={() => {
              onStickerSelected(sticker.stickerURL);
            }}
          >
            <img src={sticker.stickerURL} className="w-20 h-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
