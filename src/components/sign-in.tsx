import { FormProvider, useForm } from "react-hook-form"
import { AuthenticationForm } from "./form";

export default function SignIn() {

    const formMethods = useForm();

    const onSubmit = (values: any) => { console.log(values); }

    return (
        <FormProvider {...formMethods}>
            <AuthenticationForm onSubmit={onSubmit} />
        </FormProvider>
    )
}
