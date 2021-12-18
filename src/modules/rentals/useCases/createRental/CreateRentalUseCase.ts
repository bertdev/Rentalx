import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return,
  }: IRequest): Promise<Rental> {
    const carIsAlreadyRented = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    if (carIsAlreadyRented) {
      throw new AppError("Car is unavailable!");
    }

    const openRentalsToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (openRentalsToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const minimumHoursToReturn = 24;
    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return);

    if (compare < minimumHoursToReturn) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
