interface TimeLineProps{
    data:{
        title: string,
        date: string
    }
}

function TimeLineItem({data}: TimeLineProps){
    return(
        <div>
            <span>{data.title}</span>
            <span>{data.date}</span>
        </div>
    )
}

export default TimeLineItem