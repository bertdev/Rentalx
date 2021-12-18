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
    const rental = await createRentalUseCase.execute({
      car_id: "20203239",
      user_id: "20493249",
      expected_return: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
  });

  it("Should not be able to create a new rental if there's another rental open to the same user", () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "20493249",
        expected_return: dayAdd24hours,
      });

      const rental2 = await createRentalUseCase.execute({
        car_id: "202042340983",
        user_id: "20493249",
        expected_return: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if car is already rented", () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "20493249",
        expected_return: dayAdd24hours,
      });

      const rental2 = await createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "204932494343",
        expected_return: dayAdd24hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with a invalid return time", () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "20203239",
        user_id: "20493249",
        expected_return: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
