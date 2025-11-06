import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {    TherapistService } from './therapists.service';
import { TherapistController } from './therapists.controller';
import { Therapist } from './entities/therapist.entity';
import { Language } from 'src/modules/language/entities/language.entity';
import { Branch } from 'src/modules/branches/entities/branch.entity';
import { Specialization } from 'src/modules/specialization/entities/specialization.entity';
import { Department } from 'src/modules/Department/entities/department.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Therapist, Language,Branch,Specialization,Department])],
  controllers: [TherapistController],
  providers: [TherapistService],
  exports: [TherapistService],
})
export class TherapistsModule {}
