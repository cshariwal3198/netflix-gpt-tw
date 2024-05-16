import { useTranslation } from "react-i18next";

export const useTranslator = () => {

    const { t: translate } = useTranslation('app');

    return { translate }
}