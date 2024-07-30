import * as Styles from './styles';

interface TimeLineProps {
  data: {
    title: string;
    date: string;
  };
  odd: boolean;
}

function TimeLineItem({ data, odd }: TimeLineProps) {
  return (
    <Styles.TimeLineItem odd={odd}>
        <div style={{ display: 'flex', flexDirection: 'column' , color: '#5B0390'}}>
      <span style={{ fontSize: '1.2rem' }}>{data.title}</span>
      <span>{data.date}</span>
      </div>
      <Styles.Circle odd={odd}/>
    </Styles.TimeLineItem>
  );
}

export default TimeLineItem;
