import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
    title: string;
    content: string;
    announcementType: string;
    priority: string;
    expiryDate?: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AnnouncementSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true, trim: true },
    announcementType: { type: String, required: true, enum: ['general', 'academic', 'event', 'urgent', 'maintenance'] },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high', 'critical'] },
    expiryDate: { type: Date, default: null, validate: { validator: function (this: IAnnouncement, v: Date) { return !v || v > new Date(); }, message: "Expiry date must be in the future." } },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

AnnouncementSchema.virtual('isExpired').get(function (this: IAnnouncement) {
    return this.expiryDate ? new Date() > this.expiryDate : false;
});

AnnouncementSchema.methods.shouldDisplay = function (this: IAnnouncement) {
    return this.isActive;
};

export default mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);