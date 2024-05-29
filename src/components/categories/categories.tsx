import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDisplaySizeGroup, useGetAllShows } from "../../hooks";
import { ICategoryListContainer, categoryList } from "./utils";
import { IMovie } from "../../types";
import { Card } from "../card";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CategoryWrapper, ContainerWrapper, ContentWrapper, ListContainer, ListItem } from "./styles";

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