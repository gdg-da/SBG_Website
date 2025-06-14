import mongoose, { Schema, Document } from "mongoose";

export interface ICommittee extends Document {
    id: number;
    name: string;
    email: string;
    convenerName: string;
    convenerPhoto: string;
    dyConvenerName: string;
    dyConvenerPhoto: string;
    committeeGroupPhoto: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommitteeSchema = new Schema<ICommittee>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    convenerName: { type: String, required: true },
    convenerPhoto: { type: String, required: true },
    dyConvenerName: { type: String, required: true },
    dyConvenerPhoto: { type: String, required: true },
    committeeGroupPhoto: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.models.Committee || mongoose.model<ICommittee>('Committee', CommitteeSchema);