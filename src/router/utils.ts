import { RouterHistory,createWebHashHistory, createWebHistory } from "vue-router";

function getHistoryMode(routerHistory: string): RouterHistory {
  const historyMode: string[] = routerHistory.split(",");
  const leftMode = historyMode[0];
  const rightMode = historyMode[1];

  if (historyMode.length === 1) {
    if (leftMode === "hash") {
      return createWebHashHistory();
    } else if (leftMode === "h5") {
      return createWebHistory();
    }
  }else if(historyMode.length === 2){
    if (leftMode === "hash") {
      return createWebHistory(rightMode);
    } else if (leftMode === "h5" ) {
      return createWebHashHistory(rightMode);
    }
  }
  return createWebHashHistory();
}


export {
  getHistoryMode
}