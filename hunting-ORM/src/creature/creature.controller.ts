// creatures.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { CreatureService } from './creature.service';
import { Creature } from './creature.entity';

@ApiTags('Creatures')
@Controller('creatures')
export class CreaturesController {
    constructor(private readonly creatureService: CreatureService) {}

    @Get()
    @ApiOperation({ summary: 'Get all creatures' })
    @ApiResponse({ status: 200, description: 'Return all creatures.', type: Creature, isArray: true })
    async findAll(): Promise<Creature[]> {
        return this.creatureService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a creature by ID' })
    @ApiParam({ name: 'id', description: 'Creature ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'Return the creature.', type: Creature })
    async findOne(@Param('id') id: number): Promise<Creature> {
        return this.creatureService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a creature' })
    @ApiBody({ type: CreateCreatureDto })
    @ApiResponse({ status: 201, description: 'The creature has been successfully created.', type: Creature })
    async create(@Body() createCreatureDto: CreateCreatureDto): Promise<Creature> {
        return this.creatureService.create(createCreatureDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a creature by ID' })
    @ApiParam({ name: 'id', description: 'Creature ID', type: 'number' })
    @ApiBody({ type: CreateCreatureDto })
    @ApiResponse({ status: 200, description: 'The creature has been successfully updated.', type: Creature })
    async update(@Param('id') id: number, @Body() updateCreatureDto: CreateCreatureDto): Promise<Creature> {
        return this.creatureService.update(id, updateCreatureDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a creature by ID' })
    @ApiParam({ name: 'id', description: 'Creature ID', type: 'number' })
    @ApiResponse({ status: 200, description: 'The creature has been successfully deleted.' })
    async delete(@Param('id') id: number): Promise<void> {
        return this.creatureService.delete(id);
    }
}
