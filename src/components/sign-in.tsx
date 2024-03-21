import { FormProvider, useForm } from "react-hook-form"
import { AuthenticationForm } from "./form";

export default function SignIn() {

    const formMethods = useForm();

    const onSubmit = (values: any) => {
        const { email, password } = values;
        console.log(email, password);
    }

    return (
        <FormProvider {...formMethods}>
            <AuthenticationForm onSubmit={onSubmit} />
        </FormProvider>
    )
}
