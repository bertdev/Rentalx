import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationInRepositoryMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "nameCar",
      description: "description car",
      daily_rate: 100,
      license_plate: "abc234",
      fine_amount: 80,
      brand: "brand",
      category_id: "category",
    });

    const specification = await specificationsRepository.create({
      name: "test",
      description: "description test",
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications).toHaveLength(1);
  });

  it("Should not be able to add a new specification to a nonexistend car", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["1234234"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
