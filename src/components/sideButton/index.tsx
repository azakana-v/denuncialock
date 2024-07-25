import * as Styles from './styles';

function SideBtn({icon, toolTip}:{icon: any, toolTip: string}){
    return(
        <Styles.ButtonContainer>
            <Styles.ButtonIcon src={icon}/>
            <Styles.Tooltip>{toolTip}</Styles.Tooltip>
        </Styles.ButtonContainer>
    )
}

export default SideBtn;