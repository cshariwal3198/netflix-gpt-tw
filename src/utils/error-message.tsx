import { memo, useCallback } from "react";

export const ErrorMessage = memo(({ errorInfo, fieldName }: { errorInfo: { type: string, message: string, ref: string }, fieldName: string }) => {

    const { message, type } = errorInfo;

    const renderErrorMessage = useCallback(() => {
        if (type === 'required') {
            return `${fieldName} is required`
        }
        if (type === 'validate') {
            return message;
        }
    }, [message, fieldName, type]);

    return (
        <span className="text-sm font-medium text-red-600">
            {
                renderErrorMessage()
            }
        </span>
    );
})