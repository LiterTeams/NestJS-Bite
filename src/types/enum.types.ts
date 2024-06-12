type UserRoleEnumT = "user" | "moderator" | "admin";
type OrderStatusEnumT = "new" | "accept" | "reject" | "done";
type NewsStatusEnumT = "draft" | "published" | "archived";

type ImageExtensionEnumT = "png" | "jpg" | "jpeg" | "webp" | "avif";
type VideoExtensionEnumT = "mp4" | "webm" | "avi";
type NoteExtensionEnumT = "doc" | "docx" | "pdf" | "txt" | "word" | "js";
type ExtensionsEnumT = ImageExtensionEnumT | VideoExtensionEnumT | NoteExtensionEnumT;

type UnitEnumT = "B" | "BT" | "KB" | "MB" | "GB" | "TB";

export type {
    UserRoleEnumT,
    OrderStatusEnumT,
    NewsStatusEnumT,
    ImageExtensionEnumT, VideoExtensionEnumT, NoteExtensionEnumT, ExtensionsEnumT,
    UnitEnumT
}