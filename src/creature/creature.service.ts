import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creature } from './creature.entity';
import { CreateCreatureDto } from './dto/create-creature.dto';

@Injectable()
export class CreatureService {
    constructor(
        @InjectRepository(Creature)
        private readonly creatureRepository: Repository<Creature>,
    ) {}

    async findAll(): Promise<Creature[]> {
        return await this.creatureRepository.find();
    }

    async findOne(id: number): Promise<Creature> {
        return await this.creatureRepository.findOne({ where: { id } });
    }

    async create(createCreatureDto: CreateCreatureDto): Promise<Creature> {
        const creature = new Creature();
        creature.name = createCreatureDto.name;
        creature.description = createCreatureDto.description;
        creature.lastSee = createCreatureDto.lastSee;
        creature.countLastSee = createCreatureDto.countLastSee;
        creature.extinct = createCreatureDto.extinct;
        return await this.creatureRepository.save(creature);
    }

    async update(id: number, updateCreatureDto: CreateCreatureDto): Promise<Creature> {
        // Buscar la criatura por su ID
        const creature = await this.creatureRepository.findOne({ where: { id } });
        if (!creature) {
            throw new Error(`Creature with id ${id} not found`);
        }

        // Actualizar la criatura con los datos proporcionados
        creature.name = updateCreatureDto.name;
        creature.description = updateCreatureDto.description;
        creature.lastSee = updateCreatureDto.lastSee;
        creature.countLastSee = updateCreatureDto.countLastSee;
        creature.extinct = updateCreatureDto.extinct;

        // Guardar los cambios en la base de datos
        try {
            await this.creatureRepository.save(creature);
            return creature;
        } catch (error) {
            throw new Error(`Failed to update creature with id ${id}: ${error.message}`);
        }
    }

    async delete(id: number): Promise<void> {
        await this.creatureRepository.delete(id);
    }
}
