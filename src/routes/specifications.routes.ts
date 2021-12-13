import { Router } from "express";

import { ensureAuthenticated } from "@middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpeficitation/CreateSpecificationController";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes };
