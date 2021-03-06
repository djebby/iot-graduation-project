import { model, Schema } from "mongoose";

// interface represent admin document
interface IAdmin  {
    name: string;
    post_office: string;
    password: string;
}

// Create an Admin Schema corresponding to the IAdmin interface
const adminSchema = new Schema<IAdmin>({
    name: { type: String, required: true, unique: true, minlength: 5 },
    post_office: { type: String, required: true },
    password: { type: String, required: true }
});

// Create & Export of the Model
export default model<IAdmin>("admins", adminSchema);