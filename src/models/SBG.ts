import mongoose, { Schema, Document } from "mongoose";

export interface ISBGMember {
    position: string;
    representatives: {
        name: string;
        email: string;
    };
}

export interface ISBG extends Document {
    id: number;
    description: string;
    members: ISBGMember[];
    createdAt: Date;
    updatedAt: Date;
}

const SBGMemberSchema = new Schema({
    position: { type: String, required: true },
    representatives: {
        name: { type: String, required: true },
        email: { type: String, required: true }
    }
});

const SBGSchema = new Schema<ISBG>({
    id: { type: Number, required: true, unique: true, default: 1 },
    description: { type: String, required: true },
    members: [SBGMemberSchema]
}, {
    timestamps: true
});

export default mongoose.models.SBG || mongoose.model<ISBG>('SBG', SBGSchema);