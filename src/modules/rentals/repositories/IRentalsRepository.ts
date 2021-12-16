import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return: Date;
}

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository, ICreateRentalDTO };
