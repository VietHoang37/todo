import Joi from "joi";

const taskSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  priority: Joi.string().required(),
  description: Joi.string().optional().allow(""),
  deadline: Joi.date().optional().raw().allow("").allow(null),
  completed: Joi.bool().optional(),
});

const listSchema = Joi.object({
  name: Joi.string().required(),
  tasks: Joi.array().min(1).required(),
  uid: Joi.string().uuid().required(),
});

export { taskSchema, listSchema };
