import { memo, useMemo } from "react";
import { UserProfile } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "../../contexts/theme-context";

const ManageAccount = memo(() => {

    const { theme } = useTheme();

    const baseTheme = useMemo(() => {
        if (theme === 'dark') {
            return dark;
        }
    }, [theme]);

    return (
        <div className="flex w-full justify-center items-center gap-5 p-5 shadow-lg">
            <UserProfile appearance={{ baseTheme: baseTheme }} i18nIsDynamicList={true} />
        </div>
    );
});

export default ManageAccount;