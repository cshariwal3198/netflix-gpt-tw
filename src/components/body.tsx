import { useTheme } from "../contexts/theme-context";
import { Navbar } from "./Navbar";
import SignIn from "./sign-in";

export default function Body() {

    const { toggleTheme } = useTheme() as any;

    const onClick = () => (
        toggleTheme()
    );

    return (
        <div className="font-medium flex flex-col">
            <Navbar />
            <SignIn />
            <button onClick={onClick}>Toggle theme</button>
        </div>
    )
}