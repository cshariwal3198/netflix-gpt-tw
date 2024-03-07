import { useTheme } from "../contexts/theme-context";
import { Navbar } from "./Navbar";

export default function Body() {

    const { toggleTheme } = useTheme() as any;

    const onClick = () => (
        toggleTheme()
    );

    return (
        <div className="font-medium">
            body component
            <button onClick={onClick}>Toggle theme</button>
            <Navbar />
        </div>
    )
}