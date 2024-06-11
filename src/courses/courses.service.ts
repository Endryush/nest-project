import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'nome teste',
      description: 'Curso de teste',
      tags: ['js', 'ts'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) throw new NotFoundException(`Course com ID ${id} not found`);

    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return;
  }

  update(id: number, updateCourseDTO: any) {
    const selectedCourse = this.findOne(id);

    if (selectedCourse) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    }

    return;
  }

  delete(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }

    return;
  }
}
