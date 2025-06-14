import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
    eventName: string;
    startDate: Date;
    endDate: Date;
    hostedBy: string;
    aboutEvent: string;
    bannerUrl?: string;
    eventType: string;
    location: string;
    website?: string | null;
    hostEmail: string;
    eventPictures?: string;
}

const EventSchema: Schema = new Schema({
    eventName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    hostedBy: { type: String, required: true },
    aboutEvent: { type: String, required: true },
    bannerUrl: { type: String, validate: { validator: (v: string) => v === "" || /^https?:\/\/.+/.test(v), message: "Invalid URL format for bannerUrl.", }, },
    eventType: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, default: null },
    hostEmail: { type: String, required: true, validate: { validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v), message: "Invalid email format.", }, },
    eventPictures: { type: String, validate: { validator: (v: string) => v === "" || /^https?:\/\/drive\.google\.com/.test(v), message: "eventPictures must be a Google Drive link.", },},
}, { 
    timestamps: true 
});

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);