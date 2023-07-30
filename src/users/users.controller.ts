import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('getUserByID')
    getUserByID(@Body() data) {
        console.log('getUserByID')
        console.log(data)
        return this.usersService.getUserByID(data.userID);
    }
    @Get('get-users')
    getUsers() {
        console.log('getting users')
        return this.usersService.getAllClients();
    }
    @Get('getClientsList')
    getAllClients() {
      return this.usersService.getAllClients();
    }


    @Post('get-requested-service-providers')
    getServiceProviders(@Body() data) {
        console.log('get Service Providers')
        console.log(data)
        return this.usersService.getServiceProviders(data);
    }
}
