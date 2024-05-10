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
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 0px 10px;
    padding: 10px 20px;
    overflow-y: hidden;
`;

const StyledImage = styled.img`
    height: 150px;
    width: 120px;
    border-radius: 8px;
    opacity: 0.8;
    filter: contrast(90%);
    /* mask-image: linear-gradient(rgba(0, 0, 0, 527),rgba(0, 0, 0, 5)); */
`;

const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: auto;
    min-width: 135px;
    max-width: 145px;
    height: 240px;
    font-size: 14px;
    justify-content: center;
    justify-items: center;
    align-items: center;
    border-radius: 7px;
    overflow: hidden;
`;

const StyledText = styled.h6`
    word-break: break-all;
    font-size: 15px;
    word-wrap: unset;
    margin-left: 0px;
    text-align: center;
`;

export const ShowCredit = memo(({ id, type }: { type: string, id: string }) => {

    const { isMD, isSM } = useDisplaySizeGroup();

    const { credits, isLoading: isCreditLoading }: { credits: { cast: ICredit[], crew: ICredit[], id: number }, isLoading: boolean } = useGetCreditsDetails(type, id);

    return (
        <div className="flex flex-col gap-[12px] font-sans relative w-full p-3">
            <h3 className="font-serif text-[30px] px-2">Credits: </h3>
            {
                isCreditLoading ? (<></>) : (
                    <StyledWrapper $isSM={isSM || isMD}>
                        {
                            credits.cast.slice(0, 10).map(({ id, character, name, profile_path }) => (
                                profile_path ? (
                                    <StyledDiv key={id}>
                                        <StyledImage src={`https://image.tmdb.org/t/p/w500/${profile_path}`} alt="Not found" />
                                        <StyledText>{name}</StyledText>
                                        <StyledText>Character: {character}</StyledText>
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
