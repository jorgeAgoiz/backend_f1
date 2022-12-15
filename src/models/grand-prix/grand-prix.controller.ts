import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { GrandPrixService } from './grand-prix.service';

@ApiTags('Grand Prix')
@UseGuards(ApiKeyAuthGuard)
@Controller('grand-prix')
export class GrandPrixController {
  constructor(private grandPrixService: GrandPrixService) {}

  @ApiOperation({ summary: 'Get all Grand Prixs' })
  @Get()
  getAllGrandPrix() {
    return this.grandPrixService.getAll();
  }

  @ApiOperation({
    summary: 'Get all victories, podiums and pole positions by driver ID',
  })
  @Get('/best-results/:id')
  getBestResultsByDriver(@Param('id') id: string) {
    return this.grandPrixService.getBestResultsByDriverId(parseInt(id));
  }
}
