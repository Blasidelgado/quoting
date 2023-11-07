import mongoose, { Schema, Document, models } from 'mongoose';

interface QuotingConcept extends Document {
  product: mongoose.Types.ObjectId;
  quantity: number;
  subtotal: number;
}

export interface Quoting extends Document {
  number: string;
  date: Date;
  client: mongoose.Types.ObjectId;
  PriceList: mongoose.Types.ObjectId;
  concepts: QuotingConcept[];
  total: number;
  isCompleted: boolean;
}

const quotingConceptSchema: Schema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const quotingSchema: Schema = new Schema({
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  priceList: {
    type: Schema.Types.ObjectId,
    ref: 'PriceList',
    required: true,
  },
  concepts: [quotingConceptSchema],
  total: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
});

const Quoting = models.Quoting || mongoose.model<Quoting>('Quoting', quotingSchema);

export default Quoting;
