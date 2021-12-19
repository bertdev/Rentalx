import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository, ICreateRentalDTO } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    user_id,
    car_id,
    expected_return,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return,
    });

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openRental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
    return openRental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openRental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
    return openRental;
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };
