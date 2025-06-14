import mongoose, { Schema, Document } from "mongoose";

export interface IClub extends Document {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyconvenerPhoto: string;
    clubGroupPhoto: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const ClubSchema = new Schema<IClub>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    convenerName: { type: String, required: true },
    convenerPhoto: { type: String, required: true },
    dyConvenerName: { type: String, required: true },
    dyconvenerPhoto: { type: String, required: true },
    clubGroupPhoto: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.models.Club || mongoose.model<IClub>('Club', ClubSchema);