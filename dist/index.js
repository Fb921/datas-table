'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".employees-list_container h1{font-size:42px;font-weight:900;text-align:center}.employees-list_container thead *{font-weight:500}.employees-list_container .flex_container{display:flex;justify-content:space-between}table{margin:30px auto;max-width:1100px;width:100%}td,th{border-bottom:1px solid #70707060;font-size:14px;padding:8px 15px}tbody tr:nth-child(odd){background-color:#d4d4d470}.employees-list_container .searchBar{box-sizing:border-box;height:35px;padding:3px 10px}.employees-list_container .current-page_container{cursor:pointer;display:inline-block;min-width:40px;text-align:center}.employees-list_container .current-page_container:hover{background:#00000010}.employees-list_container .pagination_container button{background:none;border:none;cursor:pointer;padding:10px}.employees-list_container .pagination_container button:hover{background:none;background:#d4d4d450;border:none;cursor:pointer}.employees-list_container .text-center{text-align:center}.employees-list_container .search_container button{border:none;cursor:pointer;height:35px}.employees-list_container .search_container button:hover{background:#d4d4d4}.employees-list_container .select-entries_container select{margin:0 10px}.employees-list_container .tri_container{cursor:pointer;display:inline-block;vertical-align:middle}.employees-list_container .tri_container>div{height:10px;position:relative;width:8px}.employees-list_container .tri_container>div i{height:10px;left:0;position:absolute;top:-4px}.ellipsis_e,.page-element{display:inline-block}.page-element{cursor:pointer;padding:5px 10px}.current{background:#bababa}.next_btn,.prev_btn{cursor:pointer;padding:5px 10px}[data-display=false]{display:none!important}.tri_container{margin-left:5px}.tri_container.ascending div:first-child,.tri_container.descending div:nth-child(2){color:#f10f4f}";
styleInject(css_248z);

function Pagination({
  datas,
  datasToDisplay,
  currentPage,
  handlePagination,
  totalPage,
  tableId
}) {
  // const [currentPage, setCurrentPage] = useState(1);
  const [paginationContent, setPaginationContent] = React.useState(null);
  const [savedDatas, setSavedDatas] = React.useState(datas);
  const [savedDatasToDisplay, setSavedDatasToDisplay] = React.useState(datasToDisplay);
  React.useEffect(() => {
    if (!paginationContent) {
      let pages = [1, 2, 3, 4, 5];
      if (totalPage > 5) pages.push(6);
      pages = pages.map(i => {
        if (i == 6) return /*#__PURE__*/React__default["default"].createElement("span", {
          key: 'ellispis'
        }, "...");else if (i <= totalPage) return /*#__PURE__*/React__default["default"].createElement("span", {
          key: 'page' + i,
          className: "page-element " + (i == 1 ? "current" : ""),
          onClick: () => {
            handlePageClick(i);
          },
          "aria-controls": tableId,
          tabindex: "0"
        }, i);
      });
      setPaginationContent(pages);
    }
    if (datas != savedDatas) {
      handlePageClick(currentPage);
      setSavedDatas(datas);
    }
    if (datasToDisplay != savedDatasToDisplay) {
      handlePageClick(currentPage);
      setSavedDatasToDisplay(datasToDisplay);
    }
  }, [datasToDisplay, currentPage, paginationContent, datas]);
  function handlePageClick(selectedPage) {
    let pages = [1, 2, 3, 4, 5];
    if (selectedPage < 1) selectedPage = 1;
    if (selectedPage > totalPage) {
      selectedPage = totalPage;
    }
    if (selectedPage < 4 || totalPage < 6) {
      if (totalPage > 5) pages.push(null);
    } else if (selectedPage > totalPage - 3) {
      //On ne fait pas défiler
      pages = [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    } else {
      //On fait défiler la pagination en mettant la page sélectionnée au milieu
      pages = [selectedPage - 2, selectedPage - 1, selectedPage, selectedPage + 1, selectedPage + 2, null];
    }
    pages = pages.map(i => {
      if (i == null) return /*#__PURE__*/React__default["default"].createElement("span", {
        key: "ellipsis"
      }, "...");
      if (i <= totalPage) {
        return /*#__PURE__*/React__default["default"].createElement("span", {
          key: 'page' + i,
          className: "page-element " + (i == selectedPage ? "current" : ""),
          onClick: () => {
            handlePageClick(i);
          },
          "aria-controls": tableId,
          tabindex: "0"
        }, i);
      }
    });
    setPaginationContent(pages);
    handlePagination(parseInt(selectedPage));
  }
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "pagination_container"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    id: "employee-table_previous",
    onClick: () => {
      handlePageClick(parseInt(currentPage) - 1);
    },
    className: "prev_btn",
    "aria-controls": tableId,
    tabindex: "-1"
  }, "Prev"), paginationContent || "", /*#__PURE__*/React__default["default"].createElement("span", {
    id: "employee-table_next",
    onClick: () => {
      handlePageClick(parseInt(currentPage) + 1);
    },
    className: "next_btn",
    "aria-controls": tableId,
    tabindex: "0"
  }, "Next"));
}

function matchesSearch(rowDatas, searchWord) {
  for (let prop in rowDatas) {
    if (rowDatas[prop].toLowerCase().indexOf(searchWord.toLowerCase()) > -1 ? true : false) {
      return true;
    }
  }
  return false;
}
function search(datas, searchWord) {
  let result = datas.filter(e => {
    return matchesSearch(e, searchWord);
  });
  return result;
}
function sortObj(obj1, obj2, property, order) {
  let o1 = new Object();
  let o2 = new Object();
  Object.assign(o1, obj1);
  Object.assign(o2, obj2);
  if (order) {
    return o1[property] > o2[property] ? 1 : -1;
  } else {
    return o1[property] < o2[property] ? 1 : -1;
  }
}
function DatasTable(props) {
  const searchInput = React.useRef();
  const [totalEntries, setTotalEntries] = React.useState(props.datas ? props.datas.length : 0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nbEntriesToShow, setNbEntriesToShow] = React.useState(10);
  const [totalPage, setTotalPage] = React.useState(Math.ceil(props.datas ? props.datas.length / 10 : 0));
  const [currentDatas, setCurrentDatas] = React.useState(props.datas || []);
  const [sortingAsc, setSortingAsc] = React.useState(true);
  const [sortingProperty, setSortingProperty] = React.useState(true);
  let currS = {};
  props.head.map(e => {
    currS[e.value] = "none";
  });
  const [currentSorting, setCurrentSorting] = React.useState(currS);
  function createTBody(datas) {
    datas = datas.slice(nbEntriesToShow * (currentPage - 1), nbEntriesToShow * currentPage);
    let result = datas.map((e, i) => {
      e = new Object(e);
      let row = props.head.map((h, y) => {
        return /*#__PURE__*/React__default["default"].createElement("td", {
          key: "row_" + y + "_" + i
        }, e[h.key]);
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", {
        key: "row_" + i
      }, row);
    });
    return result;
  }
  const [tableBody, setTableBody] = React.useState(createTBody(props.datas));
  function sort_by(property, val) {
    let order = !sortingAsc;
    if (property != sortingProperty) {
      order = true;
    }
    let newdatas = currentDatas.sort((o1, o2) => {
      return sortObj(o1, o2, property, order);
    });
    setCurrentDatas(newdatas);
    setTableBody(createTBody(newdatas));
    setSortingAsc(order);
    setSortingProperty(property);
    let newCurr = currS;
    newCurr[val] = order ? "descending" : "ascending";
    setCurrentSorting(newCurr);
  }
  let head = props.head.map((e, i) => {
    return /*#__PURE__*/React__default["default"].createElement("th", {
      key: "head_" + i,
      "aria-controls": props.tableId,
      "aria-label": e.value + " : activate to sort column " + (sortingAsc ? "ascending" : "descending"),
      tabindex: "0"
    }, e.value, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "tri_container " + currentSorting[e.value],
      onClick: () => {
        sort_by(e.key, e.value);
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("i", {
      className: "fa fa-caret-up"
    })), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("i", {
      className: "fa fa-caret-down"
    }))));
  });
  function handleSearch() {
    let searchResult = search(props.datas, searchInput.current.value);
    let tbody = createTBody(searchResult);
    setTableBody(tbody);
    setCurrentDatas(searchResult);
    setTotalEntries(searchResult.length);
    let nbPage = Math.ceil(searchResult.length / nbEntriesToShow);
    setTotalPage(nbPage);
    if (currentPage > nbPage) {
      setCurrentPage(nbPage);
      let datas = searchResult.slice(nbEntriesToShow * (nbPage - 1), nbEntriesToShow * nbPage);
      let result = datas.map((e, i) => {
        e = new Object(e);
        let row = props.head.map((h, y) => {
          return /*#__PURE__*/React__default["default"].createElement("td", {
            key: "row_" + y + "_" + i
          }, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          key: "row_" + i
        }, row);
      });
      setTableBody(result);
    }
  }
  function handleNbEntryChange(newNb) {
    setNbEntriesToShow(newNb);
    let cPage = currentPage;
    if (currentPage > Math.ceil(currentDatas.length / newNb)) {
      setCurrentPage(Math.ceil(currentDatas.length / newNb));
      cPage = Math.ceil(currentDatas.length / newNb);
    }
    setTotalPage(Math.ceil(currentDatas.length / newNb));
    let datas = currentDatas.slice(newNb * (cPage - 1), newNb * cPage);
    let result = datas.map((e, i) => {
      e = new Object(e);
      let row = props.head.map((h, y) => {
        return /*#__PURE__*/React__default["default"].createElement("td", {
          key: "row_" + y + "_" + i
        }, e[h.key]);
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", {
        key: "row_" + i
      }, row);
    });
    setTableBody(result);
  }
  function handlePagination(page) {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
      let datas = currentDatas.slice(nbEntriesToShow * (page - 1), nbEntriesToShow * page);
      let result = datas.map((e, i) => {
        e = new Object(e);
        let row = props.head.map((h, y) => {
          return /*#__PURE__*/React__default["default"].createElement("td", {
            key: "row_" + y + "_" + i
          }, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", {
          key: "row_" + i
        }, row);
      });
      setTableBody(result);
    }
  }
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "flex_container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "select-entries_container"
  }, "Show", /*#__PURE__*/React__default["default"].createElement("select", {
    onChange: e => {
      handleNbEntryChange(e.target.value);
    },
    "aria-controls": props.tableId
  }, /*#__PURE__*/React__default["default"].createElement("option", null, "10"), /*#__PURE__*/React__default["default"].createElement("option", null, "25"), /*#__PURE__*/React__default["default"].createElement("option", null, "50"), /*#__PURE__*/React__default["default"].createElement("option", null, "100")), "entries"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search_container"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "text",
    className: "searchBar",
    ref: searchInput,
    "aria-controls": props.tableId
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: handleSearch
  }, "Chercher"))), /*#__PURE__*/React__default["default"].createElement("table", {
    id: props.tableId,
    "aria-describedby": props.tableId + '_infos',
    role: "grid"
  }, /*#__PURE__*/React__default["default"].createElement("thead", null, /*#__PURE__*/React__default["default"].createElement("tr", {
    role: "row"
  }, head)), /*#__PURE__*/React__default["default"].createElement("tbody", null, tableBody)), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "flex_container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    id: props.tableId + '_infos',
    "aria-live": "polite"
  }, "Showing ", nbEntriesToShow * (currentPage - 1) + 1, " to ", nbEntriesToShow > totalEntries ? totalEntries : nbEntriesToShow * currentPage, " of ", totalEntries, " entries"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "pagination_container"
  }, /*#__PURE__*/React__default["default"].createElement(Pagination, {
    datas: currentDatas,
    datasToDisplay: nbEntriesToShow,
    handlePagination: handlePagination,
    totalPage: totalPage,
    currentPage: currentPage,
    tableId: props.tableId
  }))), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/"
  }, "Home")));
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

module.exports = DatasTable;
