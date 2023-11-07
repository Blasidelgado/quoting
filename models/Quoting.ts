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
  concepts: QuotingConcept[];
  total: number;
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
  concepts: [quotingConceptSchema],
  total: {
    type: Number,
    required: true,
  },
});

const Quoting = models.Quoting || mongoose.model<Quoting>('Quoting', quotingSchema);

export default Quoting;
