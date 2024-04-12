import { memo } from "react";

export const ShimmerUI = memo(() => {

    const data = []
    for (let i = 0; i <= 20; i++) {
        data.push(i)
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="h-96 w-[90%] bg-neutral-300 rounded-2xl gap-5 self-center p-3 m-10" />
            <div className="w-full h-full flex flex-wrap gap-5 justify-center items-center">
                {
                    data.map((i) => (
                        <div key={i} className="w-80 h-60 bg-neutral-300 border rounded-2xl">
                        </div>
                    ))
                }
            </div>
        </div>
    )
});
