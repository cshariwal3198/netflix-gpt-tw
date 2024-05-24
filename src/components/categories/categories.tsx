import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDisplaySizeGroup, useGetAllShows } from "../../hooks";
import { categoryList } from "./utils";
import { IMovie } from "../../types";
import { Card } from "../card";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface ICategoryListContainer {
    categoryList: { id: number, name: string }[], onClick: (showId: number) => void, activeId: number
}

const CategoryWrapper = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '220px auto')};
    height: 100%;
    position: relative;
    overflow: hidden;
`;

const ListContainer = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: ${({ $isSM }) => ($isSM ? 'row' : 'column')};
    gap: ${({ $isSM }) => ($isSM ? '20px' : '10px')};
    flex-wrap: wrap;
    background-color:  ${({ theme: { semanticColors: { categoryListBackgroundColor } } }) => (categoryListBackgroundColor)};
    height: 100%;
    max-height: ${({ $isSM }) => ($isSM ? '170px' : 'auto')};
    padding: ${({ $isSM }) => ($isSM ? '8px 10px' : '20px 20px')};
    box-sizing: border-box;
    row-gap: ${({ $isSM }) => ($isSM ? '8px' : '20px')};
    border-right: ${({ $isSM }) => ($isSM ? 'unset' : '1px solid white')};
    border-bottom: ${({ $isSM }) => ($isSM ? '1px solid white' : 'unset')};
    border-radius: ${({ $isSM }) => ($isSM ? '0px 0px 8px 8px' : '0px 8px 8px 0px')};
`;

const ContainerWrapper = styled.div`
    transition: height 0.3s ease, opacity 0.3s ease;
`;

const ListItem = styled.h6<{ $isActive: boolean, $isSM: boolean }>`
    text-align: center;
    font-size: ${({ $isSM }) => ($isSM ? '19px' : '22px')};
    width: ${({ $isSM }) => ($isSM ? 'fit-content' : '100%')};
    cursor: pointer;
    color: ${({ $isActive, theme: { semanticColors: { linkTextColor } } }) => ($isActive ? linkTextColor : 'white')};
`;

const ContentWrapper = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    padding: ${({ $isSM }) => ($isSM ? '10px' : '20px')};
    justify-content: center;
    gap: ${({ $isSM }) => ($isSM ? '10px' : '30px')};
    overflow: auto;
`;

const CategoryListContainer = memo(({ categoryList, onClick, activeId }: ICategoryListContainer) => {

    const { isSM } = useDisplaySizeGroup();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(!isSM);

    const renderCategoryList = useCallback(() => (
        categoryList.map(({ id, name }) => (
            <ListItem $isActive={id === activeId} $isSM={isSM} key={id} onClick={() => onClick(id)}>
                {name}
            </ListItem>
        ))
    ), [activeId, categoryList, isSM, onClick]);

    const toggleIsCollapsed = useCallback(() => (setIsCollapsed(!isCollapsed)), [isCollapsed]);

    const renderIcons = useMemo(() => (
        isCollapsed ? <IoIosArrowUp size="20px" onClick={toggleIsCollapsed} cursor="pointer" /> : <IoIosArrowDown size="20px" cursor="pointer" onClick={toggleIsCollapsed} />
    ), [isCollapsed, toggleIsCollapsed]);

    return (
        <ContainerWrapper className={`flex flex-col items-${isSM ? 'center' : 'unset'}`}>
            {
                isSM && !isCollapsed ? null : (
                    <ListContainer $isSM={isSM}>
                        {renderCategoryList()}
                    </ListContainer>
                )
            }
            {
                isSM ? renderIcons : null
            }
        </ContainerWrapper>
    );
});

const CategoryContent = memo(({ moviesTorender }: { moviesTorender: IMovie[] }) => {

    const { isSM } = useDisplaySizeGroup();

    return (
        <ContentWrapper $isSM={isSM}>
            {
                moviesTorender.map((item) => (
                    <Card item={item} canViewSimillar={true} isFavourite={false} key={item.id} />
                ))
            }
        </ContentWrapper>
    );
})

const Categories = memo(() => {

    const { isSM } = useDisplaySizeGroup();
    const [renderList, setRenderList] = useState<IMovie[]>([]);
    const [activeId, setActiveId] = useState<number>(28);

    const { allShows } = useGetAllShows();

    useEffect(() => {
        const list = allShows.filter(({ genre_ids }) => (genre_ids.includes(28)));
        setRenderList(list);
    }, [allShows]);

    const onCategoryItemClick = useCallback((showId: number) => {
        const list = allShows.filter(({ genre_ids }) => (genre_ids.includes(showId)));
        setActiveId(showId);
        setRenderList(list);
    }, [allShows]);

    return (
        <CategoryWrapper $isSM={isSM}>
            <CategoryListContainer categoryList={categoryList} onClick={onCategoryItemClick} activeId={activeId} />
            <CategoryContent moviesTorender={renderList} />
        </CategoryWrapper>
    )
});

export default Categories;