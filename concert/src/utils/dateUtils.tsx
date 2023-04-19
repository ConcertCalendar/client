export const changePostDateFormat = (date : string | Date) => {
    const postDate = new Date(date);
    const now = new Date();
    const minuteGap = (now.getTime() - postDate.getTime())/1000/60; //분 차이

    if(minuteGap < 60){ //1시간 이내
        return `${minuteGap.toFixed()}분 전`; //소수점 버리고 리턴
    }else if(60<=minuteGap && minuteGap<1440){ //1일 이내
        return `${(minuteGap/60).toFixed()}시간 전`;
    }else if(1440<=minuteGap && minuteGap < 10080){//1주일 이내
        return `${(minuteGap/1440).toFixed()}일 전`;
    }else {
        const year = postDate.getFullYear();
        const month = postDate.getMonth() + 1;
        const day = postDate.getDate();
        return `${year}-${month}-${day}`
    }        
}

export const changeCalendarDateFormat = (date : string ) => {
    const calendarDate = new Date(date);
    const now = new Date();
    const minuteGap = (calendarDate.getTime()- now.getTime())/1000/60; //분 차이
     
    return (minuteGap / 1440).toFixed();

}