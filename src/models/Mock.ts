import { Schema, model } from "mongoose";

const MockSchema = new Schema({
    mockString: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    mockNumber: {
        type: Number,
        required: true,
        unique: true,
    },
});

export default model("Mock", MockSchema);
