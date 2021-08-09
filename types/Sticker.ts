export default interface Sticker {
    stickerId: number;
    stickerName: string;
    stickerURL: string;
    stickerStaffOnly: boolean;
    stickerAdminOnly: boolean;
    stickerIsDeleted: boolean;
}