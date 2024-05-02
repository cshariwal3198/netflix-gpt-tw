import styled from "styled-components";
import { memo } from "react";
import { useDisplaySizeGroup, useGetCreditsDetails } from "../hooks";
import { useTheme } from "../contexts/theme-context";

export interface ICredit {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
}

const StyledWrapper = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: ${({ $isSM }) => ($isSM ? 'center' : 'start')};
    align-items: center;
    padding: 0px 20px;
`;

const StyledImage = styled.img`
    height: 150px;
    width: 120px;
    border-radius: 8px;
    opacity: 0.8;
    filter: contrast(90%);
    /* mask-image: linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)); */
`;

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: auto;
    width: 150px;
    height: 250px;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 7px;
`;

const StyledSpan = styled.span<{ $theme: string }>`
    word-break: break-all;
    word-wrap: unset;
    margin-left: 0px;
    color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
`;

export const ShowCredit = memo(({ id, type }: { type: string, id: string }) => {

    const { isMD, isSM } = useDisplaySizeGroup();
    const { theme } = useTheme();

    const { credits, isLoading: isCreditLoading }: { credits: { cast: ICredit[], crew: ICredit[], id: number }, isLoading: boolean } = useGetCreditsDetails(type, id);

    return (
        <div className="flex flex-col gap-[12px] font-sans relative h-fit">
            <h3 className="font-serif text-[30px] px-2">Credits: </h3>
            {
                isCreditLoading ? <></> : (
                    <StyledWrapper $isSM={isSM || isMD}>
                        {
                            credits.cast.slice(0, 10).map(({ id, character, name, profile_path }) => (
                                profile_path ? (
                                    <StyledDiv key={id}>
                                        <StyledImage src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="Not found" />
                                        <StyledSpan $theme={theme}>{name}</StyledSpan>
                                        <StyledSpan $theme={theme}>Character: {character}</StyledSpan>
                                    </StyledDiv>
                                ) : null
                            ))
                        }
                    </StyledWrapper>
                )
            }
        </div>
    );
});
