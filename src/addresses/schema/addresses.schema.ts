import * as mongoose from 'mongoose';
import { IAddress } from './../interface/address.interface';

export const AddressSchema = new mongoose.Schema({
    userID:String,
    first_name: String,
    last_name: String,
    address: String,
    phone: String,

});