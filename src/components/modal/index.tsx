import * as Styles from './styles';
import trash from '../../assets/icons/delete.svg';
import returnIcon from '../../assets/icons/back.svg';
import trashBtn from '../../assets/icons/trash.svg';
import X from '../../assets/icons/x.svg'


function DeleteModal({ isOpen, onClose }: any) {
    if (!isOpen) return null;
    return (
        <Styles.MainContainer>
        <Styles.Overlay onClick={onClose} />
        <Styles.ModalContainer>
            <Styles.CloseButton onClick={onClose} src={X}/>
            <Styles.Title>Você tem certeza que deseja exluir a denúncia?</Styles.Title>
            <Styles.FakeBorder></Styles.FakeBorder>
            <Styles.Icon src={trash}/>
            <p style={{ color: '#5B0390', fontSize: '2rem', marginBottom: '2rem' }}>Esta ação é <strong>irreversível</strong>!</p>
            <Styles.Buttons>
            <Styles.ReturnBtn onClick={onClose}>
                <Styles.ReturnIcon src={returnIcon}/>
                Voltar
            </Styles.ReturnBtn>
            <Styles.DeleteBtn>
                <Styles.ReturnIcon src={trashBtn}/>
                Voltar
            </Styles.DeleteBtn>
          
            </Styles.Buttons>
        </Styles.ModalContainer>
    </Styles.MainContainer>
    );
}

export default DeleteModal;
