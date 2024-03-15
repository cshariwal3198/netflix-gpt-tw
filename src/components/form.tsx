import { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

const styleString = 'bg-slate-300 p-4 text-xl rounded-xl text-black';

export const AuthenticationForm = memo(({ onSubmit }: { onSubmit: (values: any) => void }) => {

    const [signedInUser, setSignedInUser] = useState(true);

    const { handleSubmit, register, formState: { errors } } = useForm();

    const validateEmail = useCallback((val: string) => (
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(val) ? true :
            'Email is not valid'
    ), []);

    const validatePassword = useCallback((val: string) => (
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val) ? true : 'Password is not valid (Enter atleast 8 characters, 1 letter, 1 number)'
    ), []);

    const onClick = useCallback(() => setSignedInUser(!signedInUser), [signedInUser]);

    const renderFooterContent = useCallback(() => (
        <div className="my-6 mx-2">
            {signedInUser ? 'New to Netflix? ' : 'Already A User? '}
            <button onClick={onClick}>
                {
                    signedInUser ? ' Sign up now.' : ' Sign In'
                }
            </button>
        </div>
    ), [onClick, signedInUser]);

    return (
        <div className="flex flex-col gap-4 h-96 w-1/4 text-white self-center bg-zinc-700 bg-transparent p-10 min-h-[550px] min-w-[450px] rounded-xl">
            <span className="font-semibold text-4xl">
                {
                    signedInUser ? 'Sign In' : 'Sign Up'
                }
            </span>
            <div className="flex flex-col gap-6 my-4">
                {
                    signedInUser ? null :
                        <input className={styleString} type="text" placeholder="Enter User name" {...register('userName', { required: true, min: 8 })} />
                }
                <div className="gap-2 flex flex-col">
                    <input className={styleString} type="text" placeholder="Enter email" {...register('email', { required: true, validate: validateEmail })} />
                    {
                        errors?.email ? <span className="text-sm font-medium text-red-600">{errors.email.message as any}</span> : null
                    }
                </div>
                <div className="gap-2 flex flex-col">
                    <input className={styleString} type="password" placeholder="Enter Password" {...register('password', { required: true, min: 8, validate: validatePassword })} />
                    {
                        errors?.password ? <span className="text-sm font-medium text-red-600">{errors.password.message as any}</span> : null
                    }
                </div>
            </div>
            <button className="bg-red-600 p-4 text-xl rounded-xl font-semibold" onClick={handleSubmit(onSubmit)}>
                {signedInUser ? 'Sign In' : 'Sign Up'}
            </button>
            {renderFooterContent()}
        </div>
    )
});