import styled from "styled-components";
import { memo } from "react";
import { useDisplaySizeGroup, useGetCreditsDetails } from "../hooks";

export interface ICredit {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
}

const StyledWrapper = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '1fr 1fr')};
    gap: 10px;
    padding: 10px 20px;
    justify-items: center;
`;

const StyledImage = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    opacity: 0.8;
    filter: contrast(90%);
    mask-image: linear-gradient(rgba(0, 0, 0, 527),rgba(0, 0, 0, 5));
    border: 1px solid black;
    margin-left: 10px;
`;

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    height: 70px;
    font-size: 14px;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid;
    border-radius: 7px;
    max-width: 500px;
`;

const StyledText = styled.h6`
    word-break: break-all;
    font-size: 15px;
    word-wrap: unset;
    margin-left: 0px;
    text-align: center;
`;

export const ShowCredit = memo(({ id, type }: { type: string, id: string }) => {

    const { isSM } = useDisplaySizeGroup();

    const { credits, isLoading: isCreditLoading }: { credits: { cast: ICredit[], crew: ICredit[], id: number }, isLoading: boolean } = useGetCreditsDetails(type, id);

    return (
        <div className="flex flex-col gap-[12px] font-sans relative w-full p-3">
            <h3 className="font-serif text-[30px] px-2">Credits: </h3>
            {
                isCreditLoading ? (<></>) : (
                    <StyledWrapper $isSM={isSM}>
                        {
                            credits.cast.slice(0, 10).map(({ id, character, name, profile_path }) => (
                                profile_path ? (
                                    <StyledDiv key={id}>
                                        <StyledImage src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="Not found" />
                                        <div className="flex flex-col gap-[6px] justify-center">
                                            <StyledText>{name}</StyledText>
                                            <StyledText>Character: {character}</StyledText>
                                        </div>
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
