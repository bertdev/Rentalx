import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpeficitation/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationsController.handle
);

export { specificationsRoutes };
