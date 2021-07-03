import Section from '../infra/typeorm/entities/Section';

export default interface ITotalSectionDTO {
  result: Section[];
  total: number;
}
