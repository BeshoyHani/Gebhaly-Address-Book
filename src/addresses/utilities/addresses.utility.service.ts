import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddressesService } from "../addresses.service";
import { IAddress } from "../interface/address.interface";

export class AddressUtiltyService {
    constructor(@InjectModel('Address') private addressModel: Model<IAddress>, private addressService: AddressesService) { }

    async findByName(name: string, userID: string): Promise<IAddress[]> {
        return await this.addressModel.find({
            $and: [
                { userID: userID },
                {
                    $or: [
                        {first_name: { "$regex": name, "$options": "i" }},
                        {last_name: { "$regex": name, "$options": "i" }},
                    ]
                }
            ]
        });
    }

    async findSortedByFirstName(userID: string): Promise<IAddress[]> {
        return await this.addressModel.find({ userID: userID }, null, {
            sort: { first_name: 1 }
        });
    }

    async import(id: string, currentUserID: string): Promise<IAddress> {
        const _address: IAddress = await this.addressModel.findById(id);
        if (_address) {
            const { userID, first_name, last_name, address, phone} = _address;
            const addressInfo: IAddress = {
                userID: currentUserID,
                first_name,
                last_name,
                address,
                phone
            };

            return await this.addressService.create(addressInfo, currentUserID);

        } else {
            throw new HttpException('Address doesn\'t exists', HttpStatus.NOT_FOUND);
        }
    }
}