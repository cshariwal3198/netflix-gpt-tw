import { memo } from "react";
import { useForm } from "react-hook-form";

export const Input = memo(({ inputName, placeHolder, type, validationRules }: { type: string, placeHolder: string, inputName: string, validationRules?: any }) => {

    const { register, formState: { errors } } = useForm();

    return (
        <div className="gap-2 flex flex-col">
            <input className="bg-slate-300 p-4 text-xl rounded-xl text-black" type={type}
                placeholder={placeHolder} {...register(inputName, { ...validationRules })} />
            {
                errors[inputName] ? <span className="text-sm font-medium text-red-600">{errors[inputName]?.message as any}</span> : ''
            }
        </div>
    );
});