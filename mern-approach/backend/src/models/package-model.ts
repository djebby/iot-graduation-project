import { Schema, model } from "mongoose";

// 1. interface representing a package document in the collection.
interface IPackage {
    rfidTag: string;
    poids: string;
    contreRembou: string;
    nomDest: string;
    rueDest: string;
    postDest: string;
    villeDest: string;
    gouvDest: string;
    paysDest: string;
    servDest: string;
    persContDest: string;
    telDest: string;
    adrDest: string;
    emailDest: string;

    nomExp: string;
    depExp: string;
    rueExp: string;
    villeExp: string;
    postExp: string;
    paysExp: string;
    telExp: string;
    faxExp: string;
    emailSocExp: string;
    persExp: string;
    telPersExp: string;
    faxPersExp: string;
    emailPersExp: string;

    movementHistory: [{date: string, pays: string, lieu: string, type_even: string, autres_info: string}];
};

// 2. Create a Package Schema corresponding to the IPackage interface
const packageSchema = new Schema<IPackage>({
    rfidTag: { type: String, required: true, unique: true },
    poids: { type: String, required: true },
    contreRembou: { type: String,  default: undefined },
    nomDest: { type: String, required: true },
    rueDest: { type: String,  default: undefined },
    postDest: { type: String, required: true },
    villeDest: { type: String,  default: undefined },
    gouvDest: { type: String, required: true },
    paysDest: { type: String,  default: undefined },
    servDest: { type: String,  default: undefined },
    persContDest: { type: String,  default: undefined },
    telDest: { type: String,  default: undefined },
    adrDest: { type: String,  default: undefined },
    emailDest: { type: String,  default: undefined },

    nomExp: { type: String, required: true },
    depExp: { type: String,  default: undefined },
    rueExp: { type: String,  default: undefined },
    villeExp: { type: String,  default: undefined },
    postExp: { type: String, required: true },
    paysExp: { type: String,  default: undefined },
    telExp: { type: String,  default: undefined },
    faxExp: { type: String,  default: undefined },
    emailSocExp: { type: String,  default: undefined },
    persExp: { type: String, required: true },
    telPersExp: { type: String,  default: undefined },
    faxPersExp: { type: String,  default: undefined },
    emailPersExp: { type: String,  default: undefined },

    movementHistory: [{
        date: {type: String, required: true }, 
        pays: { type: String, required: true },
        lieu: { type: String, required: true }, 
        type_even: { type: String,  default: undefined }, 
        autres_info: { type: String,  default: undefined }
    }]
});

// 3. Create & Export of the Model
export default model<IPackage>('package', packageSchema);