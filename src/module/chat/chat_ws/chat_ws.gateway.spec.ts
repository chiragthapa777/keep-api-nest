import { Test, TestingModule } from '@nestjs/testing';
import { ChatWsGateway } from './chat_ws.gateway';
import { ChatWsService } from './chat_ws.service';

describe('ChatWsGateway', () => {
  let gateway: ChatWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatWsGateway, ChatWsService],
    }).compile();

    gateway = module.get<ChatWsGateway>(ChatWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
