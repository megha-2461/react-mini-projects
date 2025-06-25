import {useState, useEffect} from "react";


function useCurrencyInfo(currency) {
    const [data, setData]=useState("")
    useEffect(()=>{
        let url=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
fetch(url)
.then((response)=>(response.json()))
.then((res)=>(setData(res[currency])))
console.log(data)
    }, [currency]) // [currency] is the dependency array, so whenever currency changes, this useEffect will run again
console.log(data)
return data;
}

export default useCurrencyInfo;