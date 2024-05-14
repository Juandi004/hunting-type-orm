// src/creature/dto/update-creature.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatureDto } from './create-creature.dto';

export class UpdateCreatureDto extends PartialType(CreateCreatureDto) {}
