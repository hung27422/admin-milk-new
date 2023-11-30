import Joi from "joi";
function useValidate() {
  const productSchema = Joi.object({
    categoryId: Joi.number().required(),
    description: Joi.string().required(),
    images: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    sku: Joi.string().required(),
  });
  const productSchemaUpdate = Joi.object({
    categoryId: Joi.number(),
    description: Joi.string(),
    images: Joi.string(),
    name: Joi.string(),
    price: Joi.number(),
    sku: Joi.string(),
  });
  return { productSchema, productSchemaUpdate };
}

export default useValidate;
