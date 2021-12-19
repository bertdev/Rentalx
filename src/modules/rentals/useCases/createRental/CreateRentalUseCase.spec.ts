import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

dayjs.extend(utc);

let createRentalUseCase: CreateRentalUseCase;
let rentalRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let dateProvider: DayJsDateProvider;

describe("Create rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepository,
      dateProvider,
      carsRepository
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      name: "test",
      description: "car_test",
      license_plate: "34sfs234",
      daily_rate: 100,
      fine_amount: 90,
      brand: "brand test",
      category_id: "304930",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "20493249",
      expected_return: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to create a new rental if there's another rental open to the same user", async () => {
    await rentalRepository.create({
      car_id: "20203239",
      user_id: "20493249",
      expected_return: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "202042340983",
        user_id: "20493249",
        expected_return: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("Should not be able to create a new rental if car is already rented", async () => {
    await rentalRepository.create({
      car_id: "20203239",
      user_id: "20493249",
      expected_return: dayAdd24hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "204932494343",
        expected_return: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("Should not be able to create a new rental with a invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "20493249",
        expected_return: new Date(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
