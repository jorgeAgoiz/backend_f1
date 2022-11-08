import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GridService } from './grid.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuthGuard } from 'src/auth/guard/apikey-auth.guard';
import { GridDto } from './dtos/grid.dto';
import { GridByDto } from './dtos/grid-by.dto';

@ApiTags('Grids')
@UseGuards(ApiKeyAuthGuard)
@Controller('grid')
export class GridController {
  constructor(private gridService: GridService) {}

  @ApiOperation({ summary: 'Get all grids' })
  @ApiOkResponse({ isArray: true, type: GridDto })
  @Get()
  getGrids() {
    return this.gridService.getAll();
  }

  @ApiOperation({ summary: 'Get grids by type' })
  @ApiOkResponse({ isArray: true, type: GridDto })
  @Get('/type-grid/:type')
  getGridsByType(@Param('type') type: string) {
    return this.gridService.getAllGridsByType(type);
  }

  @ApiOperation({ summary: 'Get grids by driver ID' })
  @ApiOkResponse({ isArray: true, type: GridByDto })
  @Get('/driver/:id')
  getGridsByDriver(@Param('id') id: string) {
    return this.gridService.getAllGridsByDriver(parseInt(id));
  }

  @ApiOperation({ summary: 'Get grids by circuit ID' })
  @ApiOkResponse({ isArray: true, type: GridByDto })
  @Get('/circuit/:id')
  getGridsByCircuit(@Param('id') id: string) {
    return this.gridService.getAllGridsByCircuit(parseInt(id));
  }

  @ApiOperation({ summary: 'Get grids by team ID' })
  @ApiOkResponse({ isArray: true, type: GridByDto })
  @Get('/team/:id')
  getGridsByTeam(@Param('id') id: string) {
    return this.gridService.getAllGridsByTeam(parseInt(id));
  }
}
