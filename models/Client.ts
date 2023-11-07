import {Schema, model, models} from 'mongoose';

const ClientSchema = new Schema ({
    clientName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [40, "Name should be less than 40 characters"]
    },
    CUIT: {
        type: String,
        required: [true, "CUIT is required"],
    },
    address: {
        type: String,
        required: [true, "Adress is required"],
    },
    condicionIVA: {
        type: String,
        required: [true, "Condición frente al IVA is required"]
    }

})

const Client = models.Client || model("Client", ClientSchema);

export default Client;