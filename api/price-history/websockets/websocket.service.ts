import { Injectable } from '@nestjs/common';
import { PriceHistoryGateway  } from './websocket.gateway';

@Injectable()
export class WebSocketService {
    constructor(private gateway: PriceHistoryGateway ) {}

    sendPriceUpdate(priceUpdate: any) {
        this.gateway.sendPriceUpdate(priceUpdate);
    }
    onApplicationShutdown(signal?: string) {
        console.log(`closing gateway ${signal})`);
        this.gateway.closeServer(); // Close the WebSocket server
      }
}
