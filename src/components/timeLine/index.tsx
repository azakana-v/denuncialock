import * as Styles from './styles'
import timeLineData from '../../data/timeLineData.json'
import TimeLineItem from '../timeLineItem';

function TimeLine(){
    return(
        <Styles.DetailsContainer>
            <Styles.Title>Progresso de denúncia</Styles.Title>
            <Styles.FakeBorder></Styles.FakeBorder>
            {timeLineData.length > 0 && (
                <Styles.TimeLineContainer>
                    {
                        timeLineData.map((data, index) =>(
                            <TimeLineItem data={data} key={index}/>
                        ))
                    }
                </Styles.TimeLineContainer>
            )} 
        </Styles.DetailsContainer>
    )
}

export default TimeLine;