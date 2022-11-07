import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GridService } from './grid.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';

@ApiTags('Grids')
@UseGuards(ApiKeyAuthGuard)
@Controller('grid')
export class GridController {
  constructor(private gridService: GridService) {}

  @Get()
  getGrids() {
    return this.gridService.getAll();
  }

  @Get('/type-grid/:type')
  getGridsByType(@Param('type') type: string) {
    return this.gridService.getAllGridsByType(type);
  }

  @Get('/driver/:id')
  getGridsByDriver(@Param('id') id: string) {
    return this.gridService.getAllGridsByDriver(parseInt(id));
  }

  @Get('/circuit/:id')
  getGridsByCircuit(@Param('id') id: string) {
    return this.gridService.getAllGridsByCircuit(parseInt(id));
  }

  @Get('/team/:id')
  getGridsByTeam(@Param('id') id: string) {
    return this.gridService.getAllGridsByTeam(parseInt(id));
  }
}
