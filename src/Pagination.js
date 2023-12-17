import React, {useState, useEffect} from 'react';

export default function Pagination({datas, datasToDisplay, currentPage, handlePagination,totalPage}){
    // const [currentPage, setCurrentPage] = useState(1);
    const [paginationContent, setPaginationContent] = useState(null);
    const [savedDatas,setSavedDatas] = useState(datas);
    const [savedDatasToDisplay, setSavedDatasToDisplay] = useState(datasToDisplay);

    useEffect(()=>{
        if(!paginationContent){
            let i = 1;
            let pages = [1,2,3,4,5,6];
            pages = pages.map( i => {
                if(i == 6) return <span key={'ellispis'}>...</span>;
                else if(i <= totalPage) return <span key={'page'+i} className={"page-element "+(i==1?"current":"")} onClick={()=>{handlePageClick(i)}}>{i}</span>;
            })
            setPaginationContent(pages);
        }
        if(datas != savedDatas){
            handlePageClick(currentPage);
            setSavedDatas(datas);
        }
        if(datasToDisplay != savedDatasToDisplay){
            handlePageClick(currentPage);
            setSavedDatasToDisplay(datasToDisplay);
        }
    },[datasToDisplay,currentPage,paginationContent,datas]);

    function handlePageClick(selectedPage){
        let pages = [1,2,3,4,5];
        if(selectedPage < 1) selectedPage = 1;
        if(selectedPage > totalPage) selectedPage = totalPage;
        if(selectedPage < 4){
            if(totalPage > 5) pages.push(null);
        }
        else if((selectedPage >= 4 ) && selectedPage > totalPage - 3){//On ne fait pas défiler
            pages = [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];            
        }else{//On fait défiler la pagination en mettant la page sélectionnée au milieu
            pages = [selectedPage - 2, selectedPage - 1, selectedPage, selectedPage + 1, selectedPage +2, null];
        }

        pages = pages.map( i => { 
            if(i == null) return <span key={"ellipsis"}>...</span>;
            if(i <= totalPage){ return <span key={'page'+i} className={"page-element "+(i==selectedPage?"current":"")} onClick={()=>{handlePageClick(i)}}>{i}</span>;}
        })

        setPaginationContent(pages);
        handlePagination(parseInt(selectedPage));
    }

    return(
        <div className="pagination_container">
            <span onClick={()=>{handlePageClick(parseInt(currentPage) - 1)}}className="prev_btn">Prev</span>
            {paginationContent || ""}
            <span onClick={()=>{handlePageClick(parseInt(currentPage) + 1)}} className="next_btn">Next</span>
        </div>
    )
}