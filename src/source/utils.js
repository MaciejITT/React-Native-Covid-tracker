import React from "react";

export const sortDataByCases = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
 
    return sortedData;
}

export const sortDataByRecovered = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.recovered > b.recovered ? -1 : 1));
 
    return sortedData;
}

export const sortDataByDeaths = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.deaths > b.deaths ? -1 : 1));
 
    return sortedData;
}
export const sortDataBytodayCases = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.todayCases > b.todayCases ? -1 : 1));
 
    return sortedData;
}
export const sortDataBytodayRecovered = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.todayRecovered > b.todayRecovered ? -1 : 1));
 
    return sortedData;
}
export const sortDataBytodayDeaths = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => (a.todayDeaths > b.todayDeaths ? -1 : 1));
 
    return sortedData;
}