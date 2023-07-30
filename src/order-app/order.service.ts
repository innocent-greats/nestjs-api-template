import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { TextDecoder } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OfferItemDTO } from './dto/offer-item.dto';
import { OfferItem, OfferItemImage } from './entities/offer-item.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';


const utf8Decoder = new TextDecoder();

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OfferItem)
    private readonly offerItemRepository: Repository<OfferItem>,
    @InjectRepository(OfferItemImage)
    private readonly offerItemImageRepository: Repository<OfferItemImage>,
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) { }



  // 
  async getAllAccountOrdersByStatus(request: any) {
    console.log('getOrdersByAccountIDAndServiceInRequestStatus Request')
    console.log(request)
    // serviceInRequest: request.serviceInRequest, orderStatus: request.orderStatus,
    const orders = await this.OrderRepository.find(
      { where: { customer: request.servingAccountID, orderID: request.servingStatus, updatedStatus: 'false' } })

    console.log('orders')
    console.log(orders)
    return { status: 200, data: { orders }, err: null }
  }

  // getCommodityByTradeStatus
  async getAccountOrders(request: any) {
    console.log(`Get ${request.servingStatus}Account Order Lists Request`)
    console.log(request)

    const orders = await this.OrderRepository.find(
      { where: { vendor: request.servingAccountID, updatedStatus: 'false' } })
    console.log(request.servingStatus, 'Order Lists Request')
    console.log(orders)
    return { status: 200, data: { orders }, err: null }
  }
  async getAccountOfferItems(vendorID: string) {
    const offerItems = await this.offerItemRepository.find(
      { where: { vendorID: vendorID } })
    return {
      status: 201,
      data: JSON.stringify(offerItems),
      error: null,
      errorMessage: null,
      successMessage: 'success'
    }
  }
  async onAddNewItem(offerItemDTO: OfferItemDTO) {
    try {
      console.log('create User AccountDTO')
      console.log(offerItemDTO)
      try {
        const vendor = await this.usersService.getUserByID(offerItemDTO.vendorID);
        const newOffer = {
          itemName: offerItemDTO.itemName,
          itemCategory: offerItemDTO.itemCategory,
          vendorID: offerItemDTO.vendorID,
          offeringStatus: offerItemDTO.offeringStatus,
          quantity: offerItemDTO.quantity,
          minimumPrice: offerItemDTO.minimumPrice,
          vendor: vendor,
        }

        const newOfferSchema = this.offerItemRepository.create(newOffer);
        const offerItem = await this.offerItemRepository.save(newOfferSchema);
        return {
          status: 201,
          data: JSON.stringify(offerItem),
          error: null,
          errorMessage: null,
          successMessage: 'new item added'
        }
      } catch (error) {
        return {
          status: 500,
          data: '',
          error: true,
          errorMessage: 'item could not be added, try again.',
          successMessage: null

        }
      }
    } catch (error) {

      console.log('error exists', error)
      return {
        status: 500,
        data: '',
        error: true,
        errorMessage: 'item could not be added, try again.',
        successMessage: null,
      }
    }
  }
}


