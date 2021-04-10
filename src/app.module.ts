import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks/task.repository';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
