import mongoose, { Schema, Document, models } from "mongoose";

export interface IServiceOffer extends Document {
userId: string;
title: string;
description: string;
category: string;
timeRequired: number;
}

const ServiceOfferSchema: Schema = new Schema(
{
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    timeRequired: { type: Number, default: 1 },
},
{ timestamps: true }
);

export default models.ServiceOffer || mongoose.model<IServiceOffer>("ServiceOffer", ServiceOfferSchema);
