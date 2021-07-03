import Section from '../infra/typeorm/entities/Section';

export default interface IPaginatedSectionsDTO {
  data: Section[];
  page: number;
  limit: number;
  totalCount: number;
}
