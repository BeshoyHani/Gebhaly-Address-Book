import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddressesService } from './addresses.service';
import { IAddress } from './interface/address.interface';
import { AddressUtiltyService } from './utilities/addresses.utility.service';

@Controller('addresses')
export class AddressesController {
    constructor(private addressService: AddressesService, private adressUtilityService: AddressUtiltyService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Req() req) {
        const userID = req.user.id;
        return await this.addressService.findAll(userID);
    }

    @Get('sorted')
    @UseGuards(AuthGuard('jwt'))
    async findSortedByName(@Query('by') query: string, @Req() req) {
        const userID = req.user.id;
        if (query.toLowerCase() === 'name')
            return await this.adressUtilityService.findSortedByFirstName(userID);
    }

    @Get('search')
    @UseGuards(AuthGuard('jwt'))
    async findByName(@Query('name') name: string, @Req() req) {
        const userID = req.user.id;
        return await this.adressUtilityService.findByName(name, userID);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findById(@Param('id') id: string, @Req() req) {
        const result = await this.addressService.findById(id);
        const userID = req.user.id;
        if (userID !== result.userID)
            throw new HttpException('You can\'t access this address', HttpStatus.UNAUTHORIZED);
        else
            return result;
    }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() body: IAddress, @Req() req) {
        const userID =  req.user.id;
        return await this.addressService.create(body, userID);
    }

    @Put('update/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: string, @Body() body: IAddress, @Req() req) {
        const userID =  req.user.id;
        return await this.addressService.update(id, userID, body);
    }


    @Post(':id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Param('id') id: string, @Req() req) {
        const userID = req.user.userID;
        const result = await this.addressService.delete(id, userID);
        return result;
    }

    @Post('import/:id')
    @UseGuards(AuthGuard('jwt'))
    async import(@Param('id') id: string, @Req() req) {
        const userID = req.user.userID;
        const result = await this.adressUtilityService.import(id, userID);
        return result;
    }

}
