import { Form as veeform, Field as veefield, defineRule, ErrorMessage, configure } from 'vee-validate';

import { required, email, min, min_value as minValue, max, max_value as maxValue, alpha_spaces, confirmed, not_one_of as exceptOf, numeric, alpha_num, alpha } from '@vee-validate/rules';

export default {
    install(app) {
        app.component("veeform", veeform)
        app.component("veefield", veefield)


        defineRule('required', required);
        defineRule('tos', required);
        defineRule('email', email);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('minValue', minValue);
        defineRule('maxValue', maxValue);
        defineRule('alpha_spaces', alpha_spaces);
        defineRule('confirmed', confirmed);
        defineRule('exceptOf', exceptOf);
        defineRule('countryExceptOf', exceptOf);
        defineRule('numeric', numeric);
        defineRule('alpha_num', alpha_num);
        defineRule('alpha', alpha);

        configure({
            generateMessage: (ctx) => {

                const msg = {
                    required: `The field ${ctx.field} is required !!`,

                    email: `The field should be email type !!`,

                    min: `The ${ctx.field}  should not be less than  ${ctx.rule.params[0]}  !!`,

                    max: `The field ${ctx.field} is too long`,

                    minValue: `The field ${ctx.field} is too low`,

                    maxValue: `The field ${ctx.field} is too high🤬`,

                    alpha_spaces: `The field ${ctx.field} may only contain alphabets and spaces `,

                    confirmed: `The field ${ctx.field} should match to password `,

                    countryExceptOf: `The field ${ctx.field} is not available for our region `,

                    exceptOf: `You are not allowed to use this value for the field ${ctx.field} `,

                    numeric: `The field ${ctx.field} may only requires numbers`,

                    alpha_num: `The field ${ctx.field} may only requires numbers and alphabets `,

                    alpha: `The field ${ctx.field} is may only requires alphabets `,

                    tos: `Accepttence of Terms of Service is Required `,

                }
                const message = msg[ctx.rule.name]
                    ? msg[ctx.rule.name]
                    : `The field ${ctx.field} is invalid}`

                return message;
            }
        })

    }
}