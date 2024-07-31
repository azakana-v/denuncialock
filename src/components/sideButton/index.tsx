import * as Styles from './styles';

interface SideButtonProps{
    icon: any,
    toolTip: string,
    onClick?: () => void
}

function SideBtn({icon, toolTip, onClick}:SideButtonProps){
    return(
        <Styles.ButtonContainer onClick={onClick}>
            <Styles.ButtonIcon src={icon}/>
            <Styles.Tooltip>{toolTip}</Styles.Tooltip>
        </Styles.ButtonContainer>
    )
}

export default SideBtn;