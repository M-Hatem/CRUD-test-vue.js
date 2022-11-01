import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";

import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  min_value as minValue,
  max_value as maxValue,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("min_value", minValue);
    defineRule("max_value", maxValue);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The Field ${ctx.field} is required.`,
          min: `The Field ${ctx.field} is too short.`,
          max: `The Field ${ctx.field} is too long.`,
          alpha_spaces: `The Field ${ctx.field} may only contain alphabetical characters and spaces.`,
          min_value: `The Field ${ctx.field} is too low.`,
          max_value: `The Field ${ctx.field} is too high.`,
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The Field ${ctx.field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
    });
  },
};
