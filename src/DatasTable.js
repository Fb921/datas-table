import React from 'react'
import { useState , useRef } from 'react';
import './DatasTable.css'
import Pagination from './Pagination.js';

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
    const [totalEntries,setTotalEntries] = useState(props.datas.length || 0);

    const [currentPage,setCurrentPage] = useState(1);
    const [nbEntriesToShow,setNbEntriesToShow] = useState(10);
    const [totalPage,setTotalPage] = useState(Math.ceil((props.datas.length/10) || 0));
    const [currentDatas,setCurrentDatas] = useState(props.datas);
    const [sortingAsc,setSortingAsc] = useState(true);
    const [sortingProperty,setSortingProperty] = useState(true);

    
    function createTBody(datas){
        datas = datas.slice(nbEntriesToShow*(currentPage - 1),nbEntriesToShow*currentPage);
        let result = datas.map((e,i)=>{
            e = new Object(e);
            let row = props.head.map((h,y)=>{
                return <td key={"row_"+y+"_"+i}>{e[h.key]}</td>
            })
            return (<tr key={"row_"+i}>{row}</tr>)
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
        return <th key={"head_"+i}>
                    {e.value} 
                    <div className="tri_container" onClick={()=>{ sort_by(e.key); }}>
                        <div>
                            <i className="fa fa-caret-up"></i>
                        </div>
                        <div>
                            <i className="fa fa-caret-down"></i>
                        </div>
                    </div>
                </th>
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
                    return <td key={"row_"+y+"_"+i}>{e[h.key]}</td>
                })
                return ( <tr key={"row_"+i}>{row}</tr>)
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
        setTotalPage(Math.ceil(currentDatas.length/newNb));

        let datas = currentDatas.slice(newNb*(cPage - 1),newNb*cPage);
        let result = datas.map((e,i)=>{
            e = new Object(e);
            let row = props.head.map((h,y)=>{
                return <td key={"row_"+y+"_"+i}>{e[h.key]}</td>
            })
            return (
                <tr key={"row_"+i}>{row}</tr>
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
                    return <td key={"row_"+y+"_"+i}>{e[h.key]}</td>
                })
                return (
                    <tr key={"row_"+i}>{row}</tr>
                )
            })
            setTableBody(result);
        }
    }

    return (
        <div>
            <div className="flex_container">
                <div className="select-entries_container">
                    Show
                    <select onChange={(e)=>{handleNbEntryChange(e.target.value)}}>
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
            <div className="flex_container">
                <div>Showing {nbEntriesToShow*(currentPage - 1) + 1} to {(nbEntriesToShow> totalEntries)?totalEntries:(nbEntriesToShow*currentPage)} of {totalEntries} entries</div>
                <div className="pagination_container">
                    <Pagination datas={currentDatas} datasToDisplay={nbEntriesToShow} handlePagination={handlePagination} totalPage={totalPage} currentPage={currentPage}/>
                </div>
            </div>
            <div className="text-center"><a href="/">Home</a></div>
        </div>
    )
}

export default DatasTable;