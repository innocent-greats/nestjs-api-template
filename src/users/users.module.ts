import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/common/auth.module';
import { UsersController } from './users.controller';
import { Order } from 'src/order-app/entities/order.entity';
import  { OfferItem, OfferItemImage } from 'src/order-app/entities/offer-item.entity';
import Message, { OTP } from './entities/message.entity';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { OrderController } from 'src/order-app/order.controller';
import { OrderService } from 'src/order-app/order.service';


@Module({
  imports: [
    forwardRef(() => AuthModule),

    TypeOrmModule.forFeature([User, Order, OfferItem, OfferItemImage, Message, OTP ]),
  ],
  providers: [UsersService, ChatService, ChatGateway, OrderService],
  exports: [UsersService, TypeOrmModule, OrderService],
  controllers: [UsersController, OrderController],
})
export class UsersModule {}
