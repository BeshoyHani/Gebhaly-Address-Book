import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressesService } from './addresses.service';
import { IAddress } from './interface/address.interface';
import { AddressUtiltyService } from './utilities/addresses.utility.service';

@UseGuards(AuthGuard('jwt'))
@Controller('addresses')
export class AddressesController {
    constructor(private addressService: AddressesService, private adressUtilityService: AddressUtiltyService) { }

    @Get()
    async findAll(@Req() req) {
        const userID = req.user.id;
        return await this.addressService.findAll(userID);
    }

    @Get('sorted')
    async findSortedByName(@Query('by') query: string, @Req() req) {
        const userID = req.user.id;
        if (query.toLowerCase() === 'name')
            return await this.adressUtilityService.findSortedByFirstName(userID);
    }

    @Get('search')
    async findByName(@Query('name') name: string, @Req() req) {
        const userID = req.user.id;
        return await this.adressUtilityService.findByName(name, userID);
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Req() req) {
        const result = await this.addressService.findById(id);
        const userID = req.user.id;
        if (userID !== result.userID)
            throw new HttpException('You can\'t access this address', HttpStatus.UNAUTHORIZED);
        else
            return result;
    }

    @Post('create')
    async create(@Body() body: IAddress, @Req() req) {
        const userID =  req.user.id;
        return await this.addressService.create(body, userID);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() body: IAddress, @Req() req) {
        const userID =  req.user.id;
        return await this.addressService.update(id, userID, body);
    }


    @Post(':id')
    async delete(@Param('id') id: string, @Req() req) {
        const userID = req.user.id;
        const result = await this.addressService.delete(id, userID);
        return result;
    }

    @Post('import/:id')
    async import(@Param('id') id: string, @Req() req) {
        const userID = req.user.id;
        const result = await this.adressUtilityService.import(id, userID);
        return result;
    }

}
