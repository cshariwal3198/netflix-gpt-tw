import { memo } from "react";

export const ShimmerUI = memo(() => {

    const data = []
    for (let i = 0; i <= 20; i++) {
        data.push(i)
    }

    return (
        <div className="w-full h-full  flex flex-wrap gap-5">
            {
                data.map((i) => (
                    <div key={i} className="w-80 h-60 bg-neutral-300 border rounded-2xl">

                    </div>
                ))
            }
        </div>
    )
});
