import { memo } from "react";
import { useParams } from "react-router-dom";

const ViewSimillar = memo(() => {

    const { id } = useParams();

    return (
        <>{id}</>
    )
});

export default ViewSimillar;
