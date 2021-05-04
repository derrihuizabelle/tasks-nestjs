import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const taskFound = await this._taskRepository.findOne(id);
    if (!taskFound) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
    return taskFound;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this._taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this._taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this._taskRepository.getTasks(filterDto);
  }
}
