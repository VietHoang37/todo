import Joi from "joi";

const taskSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  priority: Joi.string().required(),
  description: Joi.string().optional().allow(""),
  deadline: Joi.date().optional().raw().allow("").allow(null),
  completed: Joi.bool().optional(),
  tempKey: Joi.string().optional(),
});

const listSchema = Joi.object({
  name: Joi.string().required(),
  uid: Joi.string().uuid().required(),
});

export { taskSchema, listSchema };
