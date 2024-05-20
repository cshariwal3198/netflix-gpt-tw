import { memo, useCallback } from "react";
import { useDisplaySizeGroup, useGetCreditsDetails, useTranslator } from "../../hooks";
import { ICredit, ICreditDetails } from "./types";
import { CreditWrapper, StyledImage, StyledText, StyledWrapper } from "./credit-styles";

export const ShowCredit = memo(({ id, type }: { type: string, id: string }) => {

    const { isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const { credits, isLoading: isCreditLoading }: ICreditDetails = useGetCreditsDetails(type, id);

    const renderCreditItem = useCallback(({ id, character, name, profile_path }: ICredit) => (
        profile_path ? (
            <CreditWrapper key={id}>
                <StyledImage src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="Not found" />
                <div className="flex flex-col gap-[6px] justify-center">
                    <StyledText>{name}</StyledText>
                    <StyledText>{translate('credits.character')}: {character}</StyledText>
                </div>
            </CreditWrapper>
        ) : null
    ), [translate]);

    const renderCreditInfoWithHeader = useCallback(() => (
        credits?.cast.length ? (
            <>
                <h3 className="font-serif text-[30px] px-2">{translate('credits.credits')}: </h3>
                <StyledWrapper $isSM={isSM}>
                    {
                        credits?.cast?.slice(0, 10).map(renderCreditItem)
                    }
                </StyledWrapper>
            </>
        ) : null
    ), [credits?.cast, isSM, renderCreditItem, translate]);

    return (
        <div className="flex flex-col gap-[12px] font-sans relative w-full p-3">
            {
                isCreditLoading ? null : renderCreditInfoWithHeader()
            }
        </div>
    );
});
