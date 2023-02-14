import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IAddress } from './interface/address.interface';

@Injectable()
export class AddressesService {
    constructor(@InjectModel('Address') private addressModel: Model<IAddress>) { }

    async create(address: IAddress, userID: string): Promise<IAddress> {
        const newAddress = new this.addressModel({
            ...address,
            userID
        });
        await newAddress.save();
        return newAddress;
    }

    async update(id: string, userID: string, address: IAddress): Promise<IAddress> {
        const oldAddress = await this.findById(id);
        if (oldAddress) {
            if (userID !== await oldAddress.userID)
                throw new HttpException('You don\'t have this address in your book', HttpStatus.UNAUTHORIZED);

            const result = await this.addressModel.findOneAndUpdate({ _id: id, userID }, address, { new: true });
            return result;
        } else {
            throw new HttpException('Address doesn\'t exists', HttpStatus.NOT_FOUND);
        }
    }


    async delete(id: string, userID: string): Promise<IAddress> {
        const address = await this.findById(id);
        if (address && userID === address.userID) {
            const result = await this.addressModel.findOneAndDelete({ _id: id });
            return result;

        } else if (address === undefined) {
            throw new HttpException('Address doesn\'t exists', HttpStatus.NOT_FOUND);

        } else {
            throw new HttpException('You don\'t have this address in your book', HttpStatus.UNAUTHORIZED);
        }
    }

    async findById(id: string): Promise<IAddress> {
        const isValidObjID = mongoose.isValidObjectId(id);
        if (!isValidObjID)
            throw new HttpException('Invalid address ID', HttpStatus.BAD_REQUEST);
        else
            return await this.addressModel.findById(id);
    }

    async findByName(name: string, userID: string): Promise<IAddress[]> {
        return await this.addressModel.find({
            $and: [
                { userID: userID },
                {
                    $or: [{
                        first_name: { "$regex": name, "$options": "i" },
                        last_name: { "$regex": name, "$options": "i" },
                    }]
                }
            ]
        });
    }

    async findAll(userID: string): Promise<IAddress[]> {
        return await this.addressModel.find({ userID: userID });
    }

    async import(id: string, currentUserID: string): Promise<IAddress> {
        const address: IAddress = await this.addressModel.findById(id);
        if (address) {
            const { userID, ...importedAddress } = address;
            const addressInfo: IAddress = {
                userID: currentUserID,
                ...importedAddress
            };
            return await this.create(addressInfo, currentUserID);

        } else {
            throw new HttpException('Address doesn\'t exists', HttpStatus.NOT_FOUND);
        }
    }
}
