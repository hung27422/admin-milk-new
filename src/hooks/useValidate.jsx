import Joi from "joi";
function useValidate() {
  const productSchema = Joi.object({
    categoryId: Joi.number().required().messages({
      "any.required": "Vui lòng không để trống category",
    }),
    description: Joi.string().required().messages({
      "any.required": 'Vui lòng không để trống "description"',
    }),
    images: Joi.string().required().messages({
      "any.required": 'Vui lòng không để trống "images"',
    }),
    name: Joi.string().required().messages({
      "any.required": 'Vui lòng không để trống "name"',
    }),
    price: Joi.number().required().messages({
      "any.required": 'Vui lòng không để trống "price"',
      "number.base": 'Vui lòng nhập giá trị số cho "price"',
    }),
    sku: Joi.string().required().messages({
      "any.required": 'Vui lòng không để trống "name"',
    }),
  });
  const productSchemaUpdate = Joi.object({
    categoryId: Joi.number().optional(),
    description: Joi.string(),
    images: Joi.string(),
    name: Joi.string(),
    price: Joi.number().messages({
      "number.base": 'Vui lòng nhập giá trị số cho "price"',
    }),
    sku: Joi.string(),
  }).options({ allowUnknown: true });
  const userSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string().length(10),
    imageURL: Joi.string().uri(),
  }).options({ allowUnknown: true });

  return { productSchema, productSchemaUpdate, userSchema };
}

export default useValidate;
