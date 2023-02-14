import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './schema/addresses.schema';
import { AddressUtiltyService } from './utilities/addresses.utility.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }])],
  providers: [AddressesService, AddressUtiltyService],
  controllers: [AddressesController]
})
export class AddressesModule { }
