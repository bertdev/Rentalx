import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("Should be able to list all available cars", async () => {
    const car1 = await carsRepository.create({
      name: "nameCar",
      description: "description car",
      daily_rate: 100,
      license_plate: "abc234",
      fine_amount: 80,
      brand: "brand",
      category_id: "category",
    });

    const car2 = await carsRepository.create({
      name: "nameCar2",
      description: "description car2",
      daily_rate: 100,
      license_plate: "abc234",
      fine_amount: 80,
      brand: "brand",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "nameCar",
      description: "description car",
      daily_rate: 100,
      license_plate: "abc234",
      fine_amount: 80,
      brand: "brand_car_test",
      category_id: "category",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand_car_test",
    });

    expect(cars).toEqual([car]);
  });
});
