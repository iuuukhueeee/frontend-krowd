import { faker } from '@faker-js/faker';

import { randomItem } from '@/utils/random';

import { countries } from '../../components/create-project/contry-list';
import { ProjectModel } from '../../types/project';

export const projects: ProjectModel[] = new Array(20)
  .fill(0)
  .map((_, index) => ({
    projectId: index + 1,
    projectName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    areaName: randomItem(...countries),
    fieldName: faker.person.jobArea(),
    image: faker.image.url(),
    createAt: faker.date.past(),
    brand: faker.company.name(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    status: randomItem('Pending', 'Approved', 'Rejected'),
    funded: faker.number.float({ min: 1000, max: 10000, precision: 0.01 }),
  }));
