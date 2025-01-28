import { Injectable } from '@nestjs/common';
import { PriceHistoryGateway  } from './websocket.gateway';

@Injectable()
export class WebSocketService {
    constructor(private gateway: PriceHistoryGateway ) {}

    sendPriceUpdate(priceUpdate: any) {
        this.gateway.sendPriceUpdate(priceUpdate);
    }
}
