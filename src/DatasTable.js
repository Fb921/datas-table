import React from 'react'
import { useState , useRef } from 'react';
import './DatasTable.css'

let nb_entries = [2,10,25,50,100]

function matchesSearch(rowDatas,searchWord){
    for(let prop in rowDatas){
        if((rowDatas[prop].toLowerCase().indexOf(searchWord.toLowerCase()) > -1)?true:false){
            return true;
        }
    }
    return false;
}

function search(datas,searchWord){
    let result = datas.filter(e=>{return matchesSearch(e,searchWord)});
    return result;
}

// let defaultNbToShow = 25;

function sortObj(obj1,obj2,property,order){
    let o1 = new Object();
    let o2 = new Object();

    Object.assign(o1,obj1);
    Object.assign(o2,obj2);

    if(order){
        return (o1[property] > o2[property])?(1):(-1);
    }else{
        return (o1[property] < o2[property])?(1):(-1);
    }
}

function DatasTable(props){

    const searchInput = useRef();
    const [totalEntries,setTotalEntries] = useState(props.datas.length);

    const [currentPage,setCurrentPage] = useState(1);
    const [nbEntriesToShow,setNbEntriesToShow] = useState(2);
    const [totalPage,setTotalPage] = useState(Math.ceil(props.datas.length/2));
    const [currentDatas,setCurrentDatas] = useState(props.datas);
    const [sortingAsc,setSortingAsc] = useState(true);
    const [sortingProperty,setSortingProperty] = useState(true);

    
    function createTBody(datas){
        datas = datas.slice(nbEntriesToShow*(currentPage - 1),nbEntriesToShow*currentPage);
        let result = datas.map((e,i)=>{
        e = new Object(e);
        let row = props.head.map((h,y)=>{
            return <td>{e[h.key]}</td>
        })
        return (
            <tr>{row}</tr>
            )
        })
        return result;
    }
        
    const [tableBody,setTableBody] = useState(createTBody(props.datas));
    
    function sort_by(property){
        let order = !sortingAsc;
        if(property != sortingProperty){
            order = true;
        }
        let newdatas = currentDatas.sort( (o1,o2) => { return sortObj(o1,o2,property,order); });
        setCurrentDatas(newdatas);
        setTableBody(createTBody(newdatas));
        setSortingAsc(order);
        setSortingProperty(property);
    }

    let head = props.head.map((e,i)=>{
        return <th key={"head_"+i}>{e.value} <div class="tri_container" onClick={()=>{ sort_by(e.key); }}><div><i class="fa fa-caret-up"></i></div><div><i class="fa fa-caret-down"></i></div></div></th>
    })
        
    function handleSearch(){
        let searchResult = search(props.datas,searchInput.current.value);
        let tbody = createTBody(searchResult);
        setTableBody(tbody);
        setCurrentDatas(searchResult);
        setTotalEntries(searchResult.length);
        let nbPage = Math.ceil(searchResult.length/nbEntriesToShow);
        setTotalPage(nbPage);
        if(currentPage > nbPage){
            setCurrentPage(nbPage);
            let datas = searchResult.slice(nbEntriesToShow*(nbPage - 1),nbEntriesToShow*nbPage);
            let result = datas.map((e,i)=>{
                e = new Object(e);
                let row = props.head.map((h,y)=>{
                    return <td >{e[h.key]}</td>
                })
                return (
                    <tr>{row}</tr>
                )
            })
            setTableBody(result);
        }     
    }

    function handlePaginationNext(){
        if(currentPage < Math.ceil(currentDatas.length/nbEntriesToShow)){
            setCurrentPage(currentPage+1);
            let datas = currentDatas.slice(nbEntriesToShow*(currentPage),nbEntriesToShow*(currentPage+1));
            let result = datas.map((e,i)=>{
                e = new Object(e);
                let row = props.head.map((h,y)=>{
                    return <td >{e[h.key]}</td>
                })
                return (
                    <tr>{row}</tr>
                )
            })
            setTableBody(result);
        }
    }

    function handlePaginationPrev(){
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
            let datas = currentDatas.slice(nbEntriesToShow*(currentPage - 2),nbEntriesToShow*( currentPage - 1));
            let result = datas.map((e,i)=>{
                e = new Object(e);
                let row = props.head.map((h,y)=>{
                    return <td >{e[h.key]}</td>
                })
                return (
                    <tr>{row}</tr>
                )
            })
            setTableBody(result);
        }
    }

    function handleNbEntryChange(newNb){
        setNbEntriesToShow(newNb);
        let cPage = currentPage;
        if(currentPage > Math.ceil(currentDatas.length/newNb)){
            setCurrentPage(Math.ceil(currentDatas.length/newNb));
            cPage = Math.ceil(currentDatas.length/newNb);
        }
        // let nbPage = Math.ceil(currentDatas.length/nbEntriesToShow);
        setTotalPage(Math.ceil(currentDatas.length/newNb));

        let datas = currentDatas.slice(newNb*(cPage - 1),newNb*cPage);
        let result = datas.map((e,i)=>{
            e = new Object(e);
            let row = props.head.map((h,y)=>{
                return <td >{e[h.key]}</td>
            })
            return (
                <tr>{row}</tr>
            )
        });
        setTableBody(result);
    }

    function handlePagination(page){
        if(page > 0 && page <= totalPage){
            setCurrentPage(page);
            let datas = currentDatas.slice(nbEntriesToShow*(page - 1),nbEntriesToShow*page);
            let result = datas.map((e,i)=>{
                e = new Object(e);
                let row = props.head.map((h,y)=>{
                    return <td >{e[h.key]}</td>
                })
                return (
                    <tr>{row}</tr>
                )
            })
            setTableBody(result);
        }
    }

    return (
        <div>
            <div class="flex_container">
                <div class="select-entries_container">
                    Show
                    <select onChange={(e)=>{handleNbEntryChange(e.target.value)}}>
                        <option>2</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    entries
                </div>
                <div className="search_container">
                    <input type="text" className="searchBar" ref={searchInput}/><button onClick={handleSearch}>Chercher</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>{head}</tr>
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </table>
            <div class="flex_container">
                <div>Showing {nbEntriesToShow*(currentPage - 1) + 1} to {(nbEntriesToShow> totalEntries)?totalEntries:(nbEntriesToShow*currentPage)} of {totalEntries} entries</div>
                <div className="pagination_container">
                    <button onClick={handlePaginationPrev}>Prev</button>
                    <span className="current-page_container" onClick={()=>{handlePagination((totalPage <= 5)?1:((currentPage > totalPage - 4)?(totalPage - 4):currentPage));}}>
                        {(totalPage <= 5)?1:((currentPage > totalPage - 4)?(totalPage - 4):currentPage)}
                    </span>
                    <span data-display={(totalPage >= currentPage+1) || (totalPage >= 2 && totalPage <= 5) || ((currentPage > totalPage - 4) && totalPage >= 5)} className="current-page_container" onClick={()=>handlePagination((totalPage <= 5)?2:((currentPage > totalPage - 4)?(totalPage - 3):(currentPage + 1)))}>{(totalPage <= 5)?2:((currentPage > totalPage - 4)?(totalPage - 3):(currentPage + 1))}</span>
                    <span data-display={(totalPage >= currentPage+2) || (totalPage >= 3 && totalPage <= 5) || ((currentPage > totalPage - 4) && totalPage >= 5)} className="current-page_container" onClick={()=>handlePagination((totalPage <= 5)?3:((currentPage > totalPage - 4)?(totalPage - 2):(currentPage + 2)))}>{(totalPage <= 5)?3:((currentPage > totalPage - 4)?(totalPage - 2):(currentPage + 2))}</span>
                    <span data-display={(totalPage >= currentPage+3) || (totalPage >= 4 && totalPage <= 5) || ((currentPage > totalPage - 4) && totalPage >= 5)} className="current-page_container" onClick={()=>handlePagination((totalPage <= 5)?4:((currentPage > totalPage - 4)?(totalPage - 1):(currentPage + 3)))}>{(totalPage <= 5)?4:((currentPage > totalPage - 4)?(totalPage - 1):(currentPage + 3))}</span>
                    <span data-display={(totalPage >= currentPage+4) || (totalPage == 5) || ((currentPage > totalPage - 4) && totalPage >= 5)} className="current-page_container" onClick={()=>handlePagination((totalPage <= 5)?5:((currentPage > totalPage - 4)?(totalPage):(currentPage + 4)))}>{(totalPage <= 5)?5:((currentPage > totalPage - 4)?(totalPage):(currentPage + 4))}</span>
                    <span data-display={(totalPage >= currentPage+5) || (currentPage + 5 <= 5)} className="ellipsis_e">...</span>
                    <button onClick={handlePaginationNext}>Next</button>
                </div>
            </div>
            <div class="text-center"><a href="/">Home</a></div>
        </div>
    )
}

export default DatasTable;