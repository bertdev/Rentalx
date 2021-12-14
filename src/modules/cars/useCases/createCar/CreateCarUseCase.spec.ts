import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "nameCar",
      description: "description car",
      daily_rate: 100,
      license_plate: "abc234",
      fine_amount: 80,
      brand: "brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "nameCar1",
        description: "description car",
        daily_rate: 100,
        license_plate: "abc234",
        fine_amount: 80,
        brand: "brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "nameCar2",
        description: "description car",
        daily_rate: 100,
        license_plate: "abc234",
        fine_amount: 80,
        brand: "brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "nameCarAvailable",
      description: "description car",
      daily_rate: 100,
      license_plate: "abcd-234",
      fine_amount: 80,
      brand: "brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
