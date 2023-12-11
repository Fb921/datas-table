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

var css_248z = ".employees-list_container h1{font-size:42px;font-weight:900;text-align:center}.employees-list_container thead *{font-weight:500}.employees-list_container .flex_container{display:flex;justify-content:space-between}table{margin:30px auto;max-width:1100px;width:100%}td,th{border-bottom:1px solid #70707060;font-size:14px;padding:8px 15px}tbody tr:nth-child(odd){background-color:#d4d4d470}.employees-list_container .searchBar{box-sizing:border-box;height:35px;padding:3px 10px}.employees-list_container .current-page_container{cursor:pointer;display:inline-block;min-width:40px;text-align:center}.employees-list_container .current-page_container:hover{background:#00000010}.employees-list_container .pagination_container button{background:none;border:none;cursor:pointer;padding:10px}.employees-list_container .pagination_container button:hover{background:none;background:#d4d4d450;border:none;cursor:pointer}.employees-list_container .text-center{text-align:center}.employees-list_container .search_container button{border:none;cursor:pointer;height:35px}.employees-list_container .search_container button:hover{background:#d4d4d4}.employees-list_container .select-entries_container select{margin:0 10px}.employees-list_container .tri_container{cursor:pointer;display:inline-block;vertical-align:middle}.employees-list_container .tri_container>div{height:10px;position:relative;width:8px}.employees-list_container .tri_container>div i{height:10px;left:0;position:absolute;top:-4px}.ellipsis_e{display:inline-block}[data-display=false]{display:none!important}";
styleInject(css_248z);

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

// let defaultNbToShow = 25;

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
  const [totalEntries, setTotalEntries] = React.useState(props.datas.length);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nbEntriesToShow, setNbEntriesToShow] = React.useState(2);
  const [totalPage, setTotalPage] = React.useState(Math.ceil(props.datas.length / 2));
  const [currentDatas, setCurrentDatas] = React.useState(props.datas);
  const [sortingAsc, setSortingAsc] = React.useState(true);
  const [sortingProperty, setSortingProperty] = React.useState(true);
  function createTBody(datas) {
    datas = datas.slice(nbEntriesToShow * (currentPage - 1), nbEntriesToShow * currentPage);
    let result = datas.map((e, i) => {
      e = new Object(e);
      let row = props.head.map((h, y) => {
        return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
    });
    return result;
  }
  const [tableBody, setTableBody] = React.useState(createTBody(props.datas));
  function sort_by(property) {
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
  }
  let head = props.head.map((e, i) => {
    return /*#__PURE__*/React__default["default"].createElement("th", {
      key: "head_" + i
    }, e.value, " ", /*#__PURE__*/React__default["default"].createElement("div", {
      class: "tri_container",
      onClick: () => {
        sort_by(e.key);
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("i", {
      class: "fa fa-caret-up"
    })), /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("i", {
      class: "fa fa-caret-down"
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
          return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
      });
      setTableBody(result);
    }
  }
  function handlePaginationNext() {
    if (currentPage < Math.ceil(currentDatas.length / nbEntriesToShow)) {
      setCurrentPage(currentPage + 1);
      let datas = currentDatas.slice(nbEntriesToShow * currentPage, nbEntriesToShow * (currentPage + 1));
      let result = datas.map((e, i) => {
        e = new Object(e);
        let row = props.head.map((h, y) => {
          return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
      });
      setTableBody(result);
    }
  }
  function handlePaginationPrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      let datas = currentDatas.slice(nbEntriesToShow * (currentPage - 2), nbEntriesToShow * (currentPage - 1));
      let result = datas.map((e, i) => {
        e = new Object(e);
        let row = props.head.map((h, y) => {
          return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
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
    // let nbPage = Math.ceil(currentDatas.length/nbEntriesToShow);
    setTotalPage(Math.ceil(currentDatas.length / newNb));
    let datas = currentDatas.slice(newNb * (cPage - 1), newNb * cPage);
    let result = datas.map((e, i) => {
      e = new Object(e);
      let row = props.head.map((h, y) => {
        return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
      });
      return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
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
          return /*#__PURE__*/React__default["default"].createElement("td", null, e[h.key]);
        });
        return /*#__PURE__*/React__default["default"].createElement("tr", null, row);
      });
      setTableBody(result);
    }
  }
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("div", {
    class: "flex_container"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    class: "select-entries_container"
  }, "Show", /*#__PURE__*/React__default["default"].createElement("select", {
    onChange: e => {
      handleNbEntryChange(e.target.value);
    }
  }, /*#__PURE__*/React__default["default"].createElement("option", null, "2"), /*#__PURE__*/React__default["default"].createElement("option", null, "10"), /*#__PURE__*/React__default["default"].createElement("option", null, "25"), /*#__PURE__*/React__default["default"].createElement("option", null, "50"), /*#__PURE__*/React__default["default"].createElement("option", null, "100")), "entries"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "search_container"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "text",
    className: "searchBar",
    ref: searchInput
  }), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: handleSearch
  }, "Chercher"))), /*#__PURE__*/React__default["default"].createElement("table", null, /*#__PURE__*/React__default["default"].createElement("thead", null, /*#__PURE__*/React__default["default"].createElement("tr", null, head)), /*#__PURE__*/React__default["default"].createElement("tbody", null, tableBody)), /*#__PURE__*/React__default["default"].createElement("div", {
    class: "flex_container"
  }, /*#__PURE__*/React__default["default"].createElement("div", null, "Showing ", nbEntriesToShow * (currentPage - 1) + 1, " to ", nbEntriesToShow > totalEntries ? totalEntries : nbEntriesToShow * currentPage, " of ", totalEntries, " entries"), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "pagination_container"
  }, /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: handlePaginationPrev
  }, "Prev"), /*#__PURE__*/React__default["default"].createElement("span", {
    className: "current-page_container",
    onClick: () => {
      handlePagination(totalPage <= 5 ? 1 : currentPage > totalPage - 4 ? totalPage - 4 : currentPage);
    }
  }, totalPage <= 5 ? 1 : currentPage > totalPage - 4 ? totalPage - 4 : currentPage), /*#__PURE__*/React__default["default"].createElement("span", {
    "data-display": totalPage >= currentPage + 1 || totalPage >= 2 && totalPage <= 5 || currentPage > totalPage - 4 && totalPage >= 5,
    className: "current-page_container",
    onClick: () => handlePagination(totalPage <= 5 ? 2 : currentPage > totalPage - 4 ? totalPage - 3 : currentPage + 1)
  }, totalPage <= 5 ? 2 : currentPage > totalPage - 4 ? totalPage - 3 : currentPage + 1), /*#__PURE__*/React__default["default"].createElement("span", {
    "data-display": totalPage >= currentPage + 2 || totalPage >= 3 && totalPage <= 5 || currentPage > totalPage - 4 && totalPage >= 5,
    className: "current-page_container",
    onClick: () => handlePagination(totalPage <= 5 ? 3 : currentPage > totalPage - 4 ? totalPage - 2 : currentPage + 2)
  }, totalPage <= 5 ? 3 : currentPage > totalPage - 4 ? totalPage - 2 : currentPage + 2), /*#__PURE__*/React__default["default"].createElement("span", {
    "data-display": totalPage >= currentPage + 3 || totalPage >= 4 && totalPage <= 5 || currentPage > totalPage - 4 && totalPage >= 5,
    className: "current-page_container",
    onClick: () => handlePagination(totalPage <= 5 ? 4 : currentPage > totalPage - 4 ? totalPage - 1 : currentPage + 3)
  }, totalPage <= 5 ? 4 : currentPage > totalPage - 4 ? totalPage - 1 : currentPage + 3), /*#__PURE__*/React__default["default"].createElement("span", {
    "data-display": totalPage >= currentPage + 4 || totalPage == 5 || currentPage > totalPage - 4 && totalPage >= 5,
    className: "current-page_container",
    onClick: () => handlePagination(totalPage <= 5 ? 5 : currentPage > totalPage - 4 ? totalPage : currentPage + 4)
  }, totalPage <= 5 ? 5 : currentPage > totalPage - 4 ? totalPage : currentPage + 4), /*#__PURE__*/React__default["default"].createElement("span", {
    "data-display": totalPage >= currentPage + 5 || currentPage + 5 <= 5,
    className: "ellipsis_e"
  }, "..."), /*#__PURE__*/React__default["default"].createElement("button", {
    onClick: handlePaginationNext
  }, "Next"))), /*#__PURE__*/React__default["default"].createElement("div", {
    class: "text-center"
  }, /*#__PURE__*/React__default["default"].createElement("a", {
    href: "/"
  }, "Home")));
}

module.exports = DatasTable;
